/**
 * 圖示按鈕
 */
import YaLoadingSpinner from "../ya-loading-spinner/ya-loading-spinner";
export default class YaButton extends HTMLElement {
  static control = "ya-button";
  oldColor: string;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaButton.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaButton} 本控制元件物件
   */
  static f(obj: any): YaButton {
    return obj as YaButton;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className =
      YaButton.control + " ya-share-box ya-share-ripple " + this.className;
    const bg: HTMLSpanElement = document.createElement("span");
    bg.className = "ya-share-box-bg";
    this.oldColor = this.style.color;
    this.setEnable(this.isEnable());
    this.insertBefore(bg, this.firstChild);
  }

  /**
   * 啟用或禁用按鈕
   * @param {boolean} enable 啟用或禁用
   * @param {boolean} loading 是否显示或隐藏等待动画
   */
  setEnable(enable: boolean, loading = false) {
    this.style.pointerEvents = enable ? "auto" : "none";
    if (loading) {
      if (enable) {
        const loadingIcons: HTMLCollectionOf<Element> =
          this.getElementsByClassName(YaLoadingSpinner.control);
        for (const key in loadingIcons) {
          if (Object.prototype.hasOwnProperty.call(loadingIcons, key)) {
            const loadingIcon: Element = loadingIcons[key];
            loadingIcon.remove();
          }
        }
      } else {
        const loadingIcon: HTMLDivElement = YaLoadingSpinner.gen();
        this.appendChild(loadingIcon);
      }
    }
    // else {
    //     this.style.opacity = enable ? "1" : "0.5";
    // }
    this.style.color = enable ? this.oldColor : "#CCC";
    this.style.cursor = enable ? "pointer" : "not-allowed";
    const disabled = "disabled";
    if (enable) {
      this.removeAttribute(disabled);
    } else {
      this.setAttribute(disabled, disabled);
    }
  }

  /**
   * 是否啟用
   * @returns 是否啟用
   */
  isEnable(): boolean {
    return this.getAttribute("disabled") == null;
  }
}
