/**
 * 圖示按鈕
 */
export default class YaButton extends HTMLElement {
    static control = "ya-button";

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaButton.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        this.className = YaButton.control + " ya-share-box ya-share-ripple " + this.className;
        const bg: HTMLSpanElement = document.createElement("span");
        bg.className = "ya-share-box-bg";
        this.insertBefore(bg, this.firstChild);
    }
}
