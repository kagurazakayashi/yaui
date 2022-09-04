/**
 * 頂部標題欄
 */
export default class YaTopAppBar extends HTMLElement {
    static control = "ya-top-app-bar";
    
    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaTopAppBar.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        this.className =
            YaTopAppBar.control + " ya-share-box " + this.className;
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
}
