// 先載入 YAUI 主類
import YAUI from "./libYAUI/yaui";
// 再載入所有需要用到的控制元件類
import YaTopAppBar from "./libYAUI/ya-top-app-bar/ya-top-app-bar";
import YaIconButton from "./libYAUI/ya-icon-button/ya-icon-button";
import YaMenu from "./libYAUI/ya-menu/ya-menu";
import YaView from "./libYAUI/ya-view/ya-view";
import YaScrollView from "./libYAUI/ya-scroll-view/ya-scroll-view";
import YaDialogLogin from "./libYAUI/ya-dialog-login/ya-dialog-login";
import YaTextBox from "./libYAUI/ya-text-box/ya-text-box";
import YaButton from "./libYAUI/ya-button/ya-button";
import YaSwitch from "./libYAUI/ya-switch/ya-switch";
import YaSnackbar from "./libYAUI/ya-snackbar/ya-snackbar";
import YaDialog from "./libYAUI/ya-dialog/ya-dialog";

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
        YAUI.load(YaDialogLogin);
        YAUI.load(YaTextBox);
        YAUI.load(YaButton);
        YAUI.load(YaSwitch);
        YAUI.loadF(YaSnackbar);
        YAUI.loadF(YaDialog);
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
        // YaSnackbar
        const submit = document.getElementById("submit");
        submit.addEventListener("click", () => {
            YaSnackbar.show("请继续操作。", "提交成功", "info#gray");
        });
        // YaDialog
        const showdialog = document.getElementById("showdialog");
        showdialog.addEventListener("click", () => {
            const btnTest = document.createElement("button");
            btnTest.id = "bt";
            btnTest.className = "btc";
            btnTest.style.color = "red";
            btnTest.innerText = "clear contain";

            YaDialog.show(
                {
                    clickbackgroudClose: true,
                    title: { value: "aaa" },
                    contain: {
                        value: "bbb<br/>bbb<br/>bbb<br/>bbb<br/>bbb<br/>",
                        style: {
                            textAlign: "center",
                            maxHeight: "500px",
                        },
                    },
                    ok: {
                        // show: false,
                        value: "yes",
                        click: function () {
                            console.log("ok!");
                        },
                        // isClose: true, //默认值false
                    },
                    cancel: {
                        // show: false,
                        value: "no!",
                        click: function () {
                            console.log("cancel!");
                        },
                        style: {
                            fontSize: "12pt",
                        },
                        // isClose: false, //默认值true
                    },
                    addBtn: true,
                    foot: {
                        items: [
                            {
                                element: btnTest,
                                click: () => {
                                    document.getElementById(
                                        "ya-dialog-toast-contain"
                                    ).innerHTML = "";
                                },
                                // isClose: true,
                            },
                            {
                                tagName: "button",
                                id: "btnTest",
                                class: "btnC",
                                value: "add Button Test",
                                click: () => {
                                    document.getElementById(
                                        "ya-dialog-toast-contain"
                                    ).innerHTML += "aa<br/>";
                                },
                                style: {
                                    minWidth: "150px",
                                    fontSize: "12pt",
                                },
                            },
                        ],
                        style: {
                            borderRadius: "25px",
                        },
                    },
                    style: {
                        padding: "0px",
                        // backgroundColor: "yellow",
                        maxHeight: "50%",
                        // width: "200px",
                        // height: "150px",
                    },
                },
                false
            );
        });
    }
}

// window.onload = () => {
//   new Main();
// };
