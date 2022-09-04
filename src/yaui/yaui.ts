/**
 * 初始化類
 * 在網頁載入時，應先將本類載入，其他類才可用。
 */
export default class YaShare {
    /**
     * 初始化全域性變數和樣式
     */
    static init() {
        window.yaLoaded = [];
        require(`./yaui.css`);
        require("material-icons");
    }

    /**
     * 控制元件載入
     * 使用本函式載入需要用到的控制元件程式碼，快捷並且可以防止重複匯入一些檔案。
     * 示例：
     *     import YaTopAppBar from './yaui/ya-top-app-bar/ya-top-app-bar';
     *     YAUI.init();
     *     YAUI.load(YaTopAppBar);
     * @param {CustomElementConstructor} constructor 控制元件的匯入類
     * @param {ElementDefinitionOptions} options 其他可選選項
     */
    static load(
        constructor: CustomElementConstructor,
        options?: ElementDefinitionOptions
    ) {
        const control: any = constructor;
        const controlName: string = control.control;
        window.customElements.define(control.control, constructor, options);
        let isLoaded = false;
        for (const loaded of window.yaLoaded) {
            if (loaded == controlName) {
                isLoaded = true;
                break;
            }
        }
        if (!isLoaded) {
            control.loadFile();
        }
    }
}
