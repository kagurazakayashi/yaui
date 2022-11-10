/**
 * 圖示按鈕
 */
export default class YaIconButton extends HTMLElement {
  static control = "ya-icon-button";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaIconButton.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaIconButton} 本控制元件物件
   */
  static f(obj: any): YaIconButton {
    return obj as YaIconButton;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    if (this.className.indexOf(YaIconButton.control) < 0) {
      this.className = YaIconButton.control + " " + this.className;
    }
    const sizePx: string = (this.getAttribute("size") ?? "50") + "px";
    const size: number = parseInt(sizePx);
    this.style.width = sizePx;
    this.style.height = sizePx;
    this.style.borderRadius = (size / 2).toString() + "px";
    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "mico material-icons-outlined";
    icon.style.width = sizePx;
    icon.style.height = sizePx;
    icon.style.fontSize = (size - 20).toString() + "px";
    icon.style.lineHeight = icon.style.fontSize;
    icon.innerText = this.innerText;
    this.innerHTML = "";
    this.appendChild(icon);
  }
}
