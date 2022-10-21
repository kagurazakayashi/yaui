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
import YaImageCSS from "./libYAUI/ya-image-css/ya-image-css";

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
    YAUI.load(YaImageCSS);
    YAUI.loadF(YaSnackbar);
    YAUI.loadF(YaDialog);
    // 點選圖示按鈕，開啟一個選單
    const btnMainMenu: YaIconButton = document.getElementById(
      "btnMainMenu"
    ) as YaIconButton;
    btnMainMenu.addEventListener("click", () => {
      YaMenu.open(document.getElementById("mainMenu") as YaMenu);
    });
    const btnAccountMenu: YaIconButton = document.getElementById(
      "btnAccountMenu"
    ) as YaIconButton;
    btnAccountMenu.addEventListener("click", () => {
      const accountMenu: YaMenu = document.getElementById(
        "accountMenu"
      ) as YaMenu;
      const appBar: HTMLElement = document.body.getElementsByTagName(
        "ya-top-app-bar"
      )[0] as HTMLElement;
      accountMenu.style.right =
        document.body.clientWidth - appBar.clientWidth + "px";
      YaMenu.open(accountMenu);
    });
    // YaSnackbar
    const submit: YaButton = document.getElementById("submit") as YaButton;
    submit.addEventListener("click", () => {
      if (this.chkLoginInfo()) {
        // NyaNetwork.post(this.apiHost, {
        // }, (data: XMLHttpRequest | null, status: number) => {
        // });
      } else {
        setTimeout(() => {
          submit.setEnable(true, true);
        }, 1000);
      }
    });
    // YaDialog
    const showdialog: YaButton = document.getElementById(
      "showdialog"
    ) as YaButton;
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
                  (
                    document.getElementById(
                      "ya-dialog-toast-contain"
                    ) as HTMLElement
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
                  (
                    document.getElementById(
                      "ya-dialog-toast-contain"
                    ) as HTMLElement
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

  chkLoginInfo(): boolean {
    const loginTB: HTMLTableElement = document.getElementById(
      "loginTB"
    ) as HTMLTableElement;
    const errs: string[] = YaTextBox.chkRules(loginTB);
    if (errs.length > 0) {
      YaSnackbar.show(errs.join("\n"), "输入不正确", "cancel");
      return false;
    }
    return true;
  }
}

// window.onload = () => {
//   new Main();
// };
