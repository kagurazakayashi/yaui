/**
 * 滑塊開關
 */
export default class YaSwitch extends HTMLElement {
  static control = "ya-switch";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaSwitch.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaSwitch} 本控制元件物件
   */
  static f(obj: any): YaSwitch {
    return obj as YaSwitch;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className = YaSwitch.control + " " + this.className;
    const label: HTMLLabelElement = document.createElement("label");
    label.className = YaSwitch.control + "-label";
    // <input type="checkbox" checked>
    const input: HTMLInputElement = document.createElement("input");
    input.className = YaSwitch.control + "-input";
    input.type = "checkbox";
    input.checked = this.hasAttribute("value")
      ? this.getAttribute("value") == "0"
        ? false
        : true
      : false;
    this.setAttribute("value", input.checked ? "1" : "0");
    input.readOnly = true;
    label.appendChild(input);
    const span: HTMLSpanElement = document.createElement("span");
    span.className = YaSwitch.control + "-span";
    const i: HTMLElement = document.createElement("i");
    i.className = YaSwitch.control + "-i";
    span.appendChild(i);
    label.appendChild(span);
    const width: number = this.getAttribute("size")
      ? parseInt(this.getAttribute("size") ?? "40")
      : 40;
    const height: number = width / 2;
    label.style.width = width + "px";
    label.style.height = height + "px";
    span.style.borderRadius = height + "px";
    this.insertBefore(label, this.firstChild);
    this.addEventListener("click", () => {
      input.checked = !input.checked;
      this.setAttribute("value", input.checked ? "1" : "0");
    });
  }
}
