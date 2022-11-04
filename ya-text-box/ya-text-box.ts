/**
 * 文本输入框
 */
import YaMenu, { YaMenuDelegate } from "../ya-menu/ya-menu";
export default class YaTextBox extends HTMLElement implements YaMenuDelegate {
  static control = "ya-text-box";
  modes: string[] = [];
  errBoxs: HTMLDivElement[] = [];
  input: HTMLInputElement;
  menus: YaMenu[] = [];
  placeholder: HTMLSpanElement = document.createElement("span");
  placeholderLock = false;
  isSystemDialog = false;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaTextBox.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaTextBox} 本控制元件物件
   */
  static f(obj: any): YaTextBox {
    return obj as YaTextBox;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className = YaTextBox.control + " ya-share-box " + this.className;
    this.input = document.createElement("input");
    this.input.readOnly = this.getAttribute("readonly") != null;
    const type: string = this.getAttribute("type") ?? "";
    if (type.length > 0) {
      this.input.type = type;
    }
    this.initPlaceholderText();
    this.initRules();
    this.initMenu();
    this.appendChild(this.input);
    this.isSystemDialog =
      type.indexOf("date") >= 0 || type.indexOf("time") >= 0;
    if (this.isSystemDialog) {
      const now: Date = new Date();
      this.input.value = YaTextBox.inputDateTime(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      );
    }
    this.placeholderLock = this.isSystemDialog;
    if (this.placeholderLock) {
      this.placeholderMode(true, this.placeholder);
    }
  }

  /**
   * 建立一個 date/time 型別 input 能夠識別的時間
   * @param {number} year 年
   * @param {number} month 月
   * @param {number} day 日
   * @param {number} hour 時
   * @param {number} minute 分
   * @param {number} second 秒
   * @return {string} 能夠識別的時間
   */
  static inputDateTime(
    year = -1,
    month = -1,
    day = -1,
    hour = -1,
    minute = -1,
    second = -1
  ): string {
    // "yyyy-MM-ddThh:mm"
    let str = "";
    if (year > -1) {
      str += year.toString().padStart(4, "0");
    }
    if (month > -1) {
      str += "-" + month.toString().padStart(2, "0");
    }
    if (day > -1) {
      str += "-" + day.toString().padStart(2, "0");
    }
    if (hour > -1) {
      str += "T" + hour.toString().padStart(2, "0");
    }
    if (minute > -1) {
      str += ":" + minute.toString().padStart(2, "0");
    }
    if (second > -1) {
      str += ":" + second.toString().padStart(2, "0");
    }
    return str;
  }

  /**
   * 初始化下拉選單（如果有）
   */
  initMenu() {
    let id: string = this.getAttribute("id") ?? "";
    if (id.length == 0) {
      id = [
        YaTextBox.control,
        Date.parse(new Date().toString()).toString(),
        Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
        Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
      ].join("-");
      this.setAttribute("id", id);
    }
    const menus = this.getElementsByTagName("ya-menu");
    for (let i = 0; i < menus.length; i++) {
      const menu: YaMenu = menus[i] as YaMenu;
      menu.delegate = this;
      const menuId: string = id + "-" + i.toString;
      const items = menu.getElementsByTagName("ya-menu-item");
      for (let j = 0; j < items.length; j++) {
        const item: HTMLElement = items[j] as HTMLElement;
        item.setAttribute("id", menuId + "-" + j.toString());
      }
      this.menus.push(menu);
    }
    for (const menu of this.menus) {
      menu.style.top = this.style.height;
    }
    this.addEventListener("click", () => {
      const yatextboxes = document.getElementsByTagName(YaTextBox.control);
      for (const key in yatextboxes) {
        if (Object.prototype.hasOwnProperty.call(yatextboxes, key)) {
          const textbox: HTMLElement = yatextboxes[key] as HTMLElement;
          textbox.style.zIndex = "";
        }
      }
      this.style.zIndex = "101";
      for (const menu of this.menus) {
        const fixedHeight: number = this.input.readOnly
          ? -1
          : this.clientHeight;
        menu.style.top = fixedHeight + "px";
        menu.style.left = "-1px";
        menu.style.border = "1px solid #DCDCDC";
        menu.compensate = [0, 0, 0, 0 - fixedHeight];
        YaMenu.open(menu);
      }
    });
  }

  /**
   * YaMenuDelegate: 當選單項被點選時回撥
   * @param {YaMenu} menu 所觸發的選單
   * @param {HTMLElement} item 所觸發的選單項
   * @param {index} index 觸發的第幾個選單項
   */
  yaClickMenuItem(menu: YaMenu, item: HTMLElement) {
    for (const nmenu of this.menus) {
      if (menu.id == nmenu.id) {
        this.input.value = item.innerText;
        this.setAttribute("value", item.getAttribute("value") ?? "");
        setTimeout(() => {
          YaMenu.close(menu);
          this.placeholderMode(item.innerText.length > 0);
        }, 100);
        break;
      }
    }
  }

  /**
   * 初始化規則
   */
  initRules() {
    const errBoxEs: HTMLCollectionOf<Element> =
      this.getElementsByClassName("ya-text-box-rule");
    for (const key in errBoxEs) {
      if (Object.prototype.hasOwnProperty.call(errBoxEs, key)) {
        const errBox: HTMLDivElement = errBoxEs[key] as HTMLDivElement;
        let mode: string = errBox.getAttribute("ya-mode") ?? "";
        if (mode.length == 0) {
          mode = "\\S";
          errBox.setAttribute("ya-mode", mode);
        }
        this.modes.push(mode);
        this.errBoxs.push(errBox);
      }
    }
  }

  /**
   * 标题是否移动到文本框上方
   * @param {boolean} isON 標題是否移動到文字框上方
   * @param {HTMLSpanElement} placeholder 標題
   */
  placeholderMode(isON: boolean, placeholder: HTMLSpanElement | null = null) {
    placeholder ??= this.getElementsByClassName(
      YaTextBox.control + "-placeholder"
    )[0] as HTMLSpanElement;
    if (isON) {
      placeholder.style.color = "#2E86C1";
      placeholder.style.fontSize = "12px";
      placeholder.style.top = "-20px";
      placeholder.style.left = "5px";
    } else {
      if (this.placeholderLock) {
        return;
      }
      placeholder.style.color = "gray";
      placeholder.style.fontSize = "medium";
      placeholder.style.top = "5px";
      placeholder.style.left = "5px";
    }
  }

  focus() {
    this.placeholder.style.transition = "all 0.3s";
    this.style.transition = "all 0.3s";
    setTimeout(() => {
      this.style.borderColor = "#2E86C1";
      this.placeholderMode(true, this.placeholder);
      const text: string = this.placeholder.innerText;
      if (text.charAt(text.length - 1) != ":") {
        this.placeholder.innerText = text + ":";
      }
    }, 100);
    setTimeout(() => {
      this.placeholder.style.transition = "";
      this.style.transition = "";
    }, 500);
  }

  blur() {
    this.input.style.zIndex = "0";
    if (this.input.value.length > 0) {
      return;
    }
    this.placeholder.style.transition = "all 0.3s";
    this.style.transition = "all 0.3s";
    if (
      this.style.borderColor != "rgb(255, 0, 0)" &&
      this.style.borderColor != "#F00"
    ) {
      this.style.borderColor = "gray";
    }
    this.placeholderMode(false, this.placeholder);
    // const text: string = this.placeholder.innerText;
    // if (text.charAt(text.length - 1) == ":") {
    //   this.placeholder.innerText = text.substring(0, text.length - 1);
    // } else {
    //   this.placeholder.innerText = text;
    // }
    setTimeout(() => {
      this.placeholder.style.transition = "";
      this.style.transition = "";
    }, 500);
  }

  /**
   * 初始化提示文字
   */
  initPlaceholderText() {
    const placeholderText: string = this.getAttribute("placeholder") ?? "";
    if (placeholderText.length > 0) {
      this.placeholder.className = YaTextBox.control + "-placeholder";
      this.placeholder.innerText = placeholderText;
      this.appendChild(this.placeholder);
      this.input.addEventListener("focus", () => {
        this.focus();
      });
      this.input.addEventListener("blur", () => {
        this.blur();
      });
      this.input.addEventListener("input", () => {
        this.chkRule();
      });
    }
  }

  /**
   * 檢查規則
   * @return {string[]} 錯誤資訊列表
   */
  chkRule(): string[] {
    const val: string = this.input.value;
    let brk = 0;
    const errors: string[] = [];
    for (let i = 0; i < this.modes.length; i++) {
      const errBox: HTMLDivElement = this.errBoxs[i];
      if (brk > 0) {
        errBox.style.display = "none";
        continue;
      }
      const mode: string = this.modes[i];
      const reg = new RegExp(mode);
      if (reg.test(val)) {
        errBox.style.display = "none";
      } else {
        errBox.style.display = "block";
        errors.push(errBox.innerText);
        this.setAttribute("ya-err", errBox.innerText);
        brk++;
      }
    }
    if (brk > 0) {
      this.style.borderColor = "#F00";
    } else {
      this.style.borderColor = "gray";
      this.removeAttribute("ya-err");
    }
    return errors;
  }

  /**
   * 外部批次檢查規則
   * @param {HTMLElement} form 包括 ya-text-box 的父元素
   * @return {string[]} 錯誤資訊列表
   */
  static chkRules(form: HTMLElement): string[] {
    const textboxes: HTMLCollectionOf<Element> =
      form.getElementsByTagName("ya-text-box");
    const errors: string[] = [];
    for (const key in textboxes) {
      if (Object.prototype.hasOwnProperty.call(textboxes, key)) {
        const textbox: YaTextBox = textboxes[key] as YaTextBox;
        textbox.chkRule();
        const err: string = textbox.getAttribute("ya-err") ?? "";
        if (err.length > 0) {
          errors.push(err);
        }
      }
    }
    return errors;
  }
}
