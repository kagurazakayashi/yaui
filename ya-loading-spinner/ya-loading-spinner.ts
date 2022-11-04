/**
 * 載入圓圈
 */
export default class YaLoadingSpinner {
  static control = "ya-loading-spinner";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaLoadingSpinner.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaLoadingSpinner} 本控制元件物件
   */
  static f(obj: any): YaLoadingSpinner {
    return obj as YaLoadingSpinner;
  }

  /**
   * 生成一個載入圓圈
   * @param {number} styleID 样式 ID
   * @param {number} styleID 样式 ID
   * @return {HTMLDivElement} 載入圓圈 diV
   */
  static gen(
    styleID = 1,
    size = 20,
    borderSize = 5,
    backgroundColor = "#CCC",
    foregroundColor = "#1daae2"
  ): HTMLDivElement {
    const fullSize: number = size + borderSize * 2;
    const leftTop = `calc(50% - ${fullSize / 2}px)`;
    const sizePx = `${size}px`;
    const fullSizePx = `${fullSize}px`;
    const loadingIcon: HTMLDivElement = document.createElement("div");
    loadingIcon.className = `${YaLoadingSpinner.control} ${YaLoadingSpinner.control}-${styleID}`;
    loadingIcon.style.width = fullSizePx;
    loadingIcon.style.height = fullSizePx;
    loadingIcon.style.left = leftTop;
    loadingIcon.style.top = leftTop;
    const borderSizePx: string = borderSize + "px";

    const loadingIcon1: HTMLDivElement = document.createElement("div");
    loadingIcon1.className = `${YaLoadingSpinner.control}-${styleID}-fb ${YaLoadingSpinner.control}-${styleID}-b`;
    loadingIcon1.style.width = sizePx;
    loadingIcon1.style.height = sizePx;
    loadingIcon1.style.borderWidth = borderSizePx;
    loadingIcon1.style.borderColor = backgroundColor;
    loadingIcon1.style.borderLeftColor = backgroundColor;
    loadingIcon1.style.borderRightColor = backgroundColor;
    loadingIcon1.style.borderBottomColor = foregroundColor;
    loadingIcon.appendChild(loadingIcon1);

    const loadingIcon2: HTMLDivElement = document.createElement("div");
    loadingIcon2.className = `${YaLoadingSpinner.control}-${styleID}-fb ${YaLoadingSpinner.control}-${styleID}-f`;
    loadingIcon2.style.width = sizePx;
    loadingIcon2.style.height = sizePx;
    loadingIcon2.style.borderWidth = borderSizePx;
    loadingIcon2.style.borderBottomColor = backgroundColor;
    loadingIcon.appendChild(loadingIcon2);

    return loadingIcon;
  }
}
