// 先載入 YAUI 主類
import YAUI from "./yaui/yaui";
// 再載入所有需要用到的控制元件類
import YaTopAppBar from "./yaui/ya-top-app-bar/ya-top-app-bar";
import YaIconButton from "./yaui/ya-icon-button/ya-icon-button";
import YaMenu from "./yaui/ya-menu/ya-menu";
import YaView from "./yaui/ya-view/ya-view";
import YaScrollView from "./yaui/ya-scroll-view/ya-scroll-view";
import YaDialog from "./yaui/ya-dialog/ya-dialog";
import YaTextBox from "./yaui/ya-text-box/ya-text-box";

/**
 * 網頁載入完成後要執行的程式碼
 */
export default class Main {
    constructor() {
        // 先載入 YAUI 主類
        YAUI.init();
        // 再載入所有需要用到的控制元件類
        YAUI.load(YaTopAppBar);
        YAUI.load(YaIconButton);
        YAUI.load(YaMenu);
        YAUI.load(YaView);
        YAUI.load(YaScrollView);
        YAUI.load(YaDialog);
        YAUI.load(YaTextBox);
        // 點選圖示按鈕，開啟一個選單
        const btnMainMenu = document.getElementById("btnMainMenu");
        btnMainMenu.addEventListener("click", () => {
            YaMenu.open(document.getElementById("mainMenu"));
        });
        const btnAccountMenu = document.getElementById("btnAccountMenu");
        btnAccountMenu.addEventListener("click", () => {
            const accountMenu: HTMLElement =
                document.getElementById("accountMenu");
            const appBar: HTMLElement = document.body.getElementsByTagName(
                "ya-top-app-bar"
            )[0] as HTMLElement;
            accountMenu.style.right =
                document.body.clientWidth - appBar.clientWidth + "px";
            YaMenu.open(accountMenu);
        });
    }
}

// window.onload = () => {
//   new Main();
// };
