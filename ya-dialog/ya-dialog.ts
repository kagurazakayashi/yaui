/**
 * 對話方塊（函式型）
 */
export default class Dialog {
    static control = "ya-dialog";
    dialog: HTMLDivElement;

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${Dialog.control}.css`);
    }

    /**
     * 建構函式
     */
    constructor() {
        this.dialog = document.createElement("div");
        this.dialog.className = Dialog.control + " ya-share-box";
    }

    /**
     * 顯示此對話方塊
     */
    show() {
        document.body.appendChild(this.dialog);
    }

    /**
     * 關閉並銷燬對話方塊
     */
    close() {
        this.dialog.remove();
    }

}
