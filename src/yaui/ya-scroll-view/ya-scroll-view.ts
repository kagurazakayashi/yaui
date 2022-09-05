/**
 * 滾動區域，配合 ya-view 使用
 */
export default class YaScrollView extends HTMLElement {
    static control = "ya-scroll-view";

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaScrollView.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        this.className = YaScrollView.control + " " + this.className;
        // this.addEventListener("scroll", () => {});
    }
}
