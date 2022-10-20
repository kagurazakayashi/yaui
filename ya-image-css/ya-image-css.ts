/**
 * 將 CSS 轉換為 Image
 */
export default class YaImageCSS extends HTMLElement {
  static control = "ya-image-css";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaImageCSS.control}.css`);
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className = YaImageCSS.control + " " + this.className;
    if (this.getAttribute("src") ?? "".length > 0) {
      return;
    }
    const style = window.getComputedStyle(this);
    let src = "";
    const srcPath: RegExpMatchArray | null =
      style.background.match(/url\((.*)\)/);
    if (srcPath != null && srcPath[1]) {
      src = srcPath[1].replace(/"/g, "").replace(/'/g, "");
    }
    const image = new Image();
    image.src = src;
    console.log(this);
    image.onload = () => {
      const scale: number = image.width / image.height;
      if (
        style.width.length == 0 ||
        style.width == "auto" ||
        parseInt(style.width) == 0
      ) {
        this.style.width = this.offsetHeight * scale + "px";
        this.style.backgroundSize = "auto 100%";
      }
      if (
        style.height.length == 0 ||
        style.height == "auto" ||
        parseInt(style.height) == 0
      ) {
        this.style.height = this.offsetWidth / scale + "px";
        this.style.backgroundSize = "100% auto";
      }
    };
  }

  resizeImage(url: string, scaleW: number, scaleH: number) {
    const image = new Image();
    image.src = url;
    let tempW = 0;
    let tempH = 0;
    image.onload = function () {
      if (image.width / image.height >= scaleW / scaleH) {
        if (image.width > scaleW) {
          tempW = scaleW;
          tempH = (image.height * scaleW) / image.width;
        } else {
          tempW = image.width;
          tempH = image.height;
        }
      } else {
        if (image.height > scaleH) {
          tempH = scaleH;
          tempW = (image.width * scaleH) / image.height;
        } else {
          tempW = image.width;
          tempH = image.height;
        }
      }
      return [tempW, tempH];
    };
  }
}
