/**
 * 空白块状面板
 */
export default class YaView extends HTMLElement {
  static readonly control = "ya-view";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaView.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaView} 本控制元件物件
   */
  static f(obj: any): YaView {
    return obj as YaView;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    if (this.className.indexOf(YaView.control) < 0) {
      this.className = YaView.control + " ya-share-box " + this.className;
    }
    const bgName = "ya-share-box-bg";
    const bgs: HTMLCollectionOf<Element> = this.getElementsByClassName(bgName);
    if (bgs.length == 0) {
      const bg = document.createElement("div");
      bg.className = bgName;
      this.insertBefore(bg, this.firstChild);
    }
    if (this.className.indexOf("ya-view-article") >= 0) {
      setTimeout(() => {
        this.resizeAppBar();
      }, 100);
      window.addEventListener("resize", () => {
        this.resizeAppBar();
      });
    }
  }

  /**
   * 影響 AppBar 的高度
   */
  resizeAppBar() {
    if (this.className.indexOf("ya-view-article") >= 0) {
      const appBars: HTMLCollectionOf<Element> =
        document.body.getElementsByTagName("ya-top-app-bar");
      if (appBars.length == 0) {
        return;
      }
      const widthDiv: HTMLDivElement = document.createElement("div");
      this.appendChild(widthDiv);
      const width: string = widthDiv.offsetWidth + 20 + "px";
      widthDiv.remove();
      for (const key in appBars) {
        if (Object.prototype.hasOwnProperty.call(appBars, key)) {
          const appBar: HTMLElement = appBars[key] as HTMLElement;
          appBar.style.width = width;
        }
      }
    }
  }
}
