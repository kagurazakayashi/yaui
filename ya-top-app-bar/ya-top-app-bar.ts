/**
 * 頂部標題欄
 */
export default class YaTopAppBar extends HTMLElement {
  static control = "ya-top-app-bar";
  // scrollOldTop: number = 0;
  // scrollOldMode: boolean = false; // F↑ T↓
  // scrollModeI: number = 0;
  touchOldTop = 0;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaTopAppBar.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaTopAppBar} 本控制元件物件
   */
  static f(obj: any): YaTopAppBar {
    return obj as YaTopAppBar;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    const bg: HTMLSpanElement = document.createElement("span");
    bg.className = "ya-share-box-bg";
    this.insertBefore(bg, this.firstChild);
    if (this.className.indexOf(YaTopAppBar.control + "-auto-hide") >= 0) {
      this.style.transition = "top 0.5s";
      this.addMoveEventListener();
    }
    if (this.className.indexOf(YaTopAppBar.control) < 0) {
      this.className = YaTopAppBar.control + " ya-share-box " + this.className;
    }
    const iconBtns: HTMLCollectionOf<Element> =
      this.getElementsByTagName("ya-icon-button");
    for (const key in iconBtns) {
      if (Object.prototype.hasOwnProperty.call(iconBtns, key)) {
        const iconBtn: Element = iconBtns[key];
        iconBtn.className += "ya-share-ripple";
      }
    }
    // ya-icon-button
  }

  /**
   * 添加鼠标滚轮和触摸屏事件
   */
  addMoveEventListener() {
    // 監聽滑鼠滾輪
    // document.addEventListener("mousewheel", (e: WheelEvent) => {
    // }
    document.addEventListener("mousewheel", (e: Event) => {
      const ev: WheelEvent = e as WheelEvent;
      const top: number = ev.deltaY;
      if (top < 0) {
        // console.log("↑", top);
        // if (!this.scrollOldMode) {
        //     this.scrollModeI++;
        //     if (this.scrollModeI > 0) {
        this.appBarShow(true);
        //     }
        // } else {
        //     this.scrollModeI = 0;
        // }
        // this.scrollOldMode = false;
      } else if (top > 0) {
        // console.log("↓", top);
        // if (this.scrollOldMode) {
        //     this.scrollModeI++;
        //     if (this.scrollModeI > 0) {
        this.appBarShow(false);
        //     }
        // } else {
        //     this.scrollModeI = 0;
        // }
        // this.scrollOldMode = true;
      }
    });
    // 監聽觸控式螢幕滑動
    document.addEventListener("touchmove", (ev: TouchEvent) => {
      const top: number = ev.touches[0].screenY;
      const move: number = this.touchOldTop - top;
      if (move > 0) {
        // console.log("↑", top);
        this.appBarShow(false);
      } else if (move < 0) {
        // console.log("↓", top);
        this.appBarShow(true);
      }
      this.touchOldTop = top;
    });
    // 監聽鍵盤按鍵
    document.addEventListener("keydown", (ev: KeyboardEvent) => {
      // console.log("keydown", ev.key);
      if (ev.key.indexOf("Up") >= 0) {
        this.appBarShow(true);
      } else if (ev.key.indexOf("Down") >= 0) {
        this.appBarShow(false);
      }
    });
  }

  /**
   * 彈入或彈出 App Bar
   * @param {boolean} isShow T彈入 F彈出
   */
  appBarShow(isShow: boolean) {
    let i = 0;
    const modes: string[] = ["show", "hide"];
    for (; i < modes.length; i++) {
      modes[i] = YaTopAppBar.control + "-" + modes[i];
    }
    const classNameList: string[] = this.className.split(" ");
    for (i = 0; i < classNameList.length; i++) {
      for (const mode of modes) {
        if (mode == classNameList[i]) {
          classNameList.splice(i);
        }
      }
    }
    if (isShow) {
      classNameList.push(modes[0]);
    } else {
      classNameList.push(modes[1]);
    }
    this.className = classNameList.join(" ");
  }
}
