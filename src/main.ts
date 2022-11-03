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
import YaPlanarGraph from "./libYAUI/ya-planar-graph/ya-planar-graph";
import YaTable from "./libYAUI/ya-table/ya-table";
import YaCircleProgressBar from "./libYAUI/ya-circle-progress-bar/ya-circle-progress-bar";

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
    YAUI.load(YaPlanarGraph);
    YAUI.load(YaTable);
    YAUI.load(YaCircleProgressBar);
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


    const ypgView = document.getElementById("ypg") as YaPlanarGraph;
    const ypgB = document.getElementById("ypgB") as HTMLButtonElement;
    const ypgC = document.getElementById("ypgC") as HTMLButtonElement;
    const ypgD = document.getElementById("ypgD") as HTMLButtonElement;
    ypgB.onclick = () => {
      console.log(ypgView.pointName);
      console.log(ypgView.pointPositionList);
    };
    ypgC.onclick = () => {
      ypgView.Clear();
    };
    ypgD.onclick = () => {
      ypgView.Dispose();
    };
    const _dataStr =
      "[{\"chartMonitorID\":1,\"height\":350,\"monitorID\":4,\"pointX\":435,\"pointXPercent\":0.87,\"pointY\":41,\"pointYPercent\":0.11714285714285715,\"projectID\":1,\"width\":500},{\"chartMonitorID\":3,\"height\":350,\"monitorID\":6,\"pointX\":36,\"pointXPercent\":0.072,\"pointY\":148,\"pointYPercent\":0.4228571428571429,\"projectID\":1,\"width\":500},{\"chartMonitorID\":2,\"height\":350,\"monitorID\":5,\"pointX\":443,\"pointXPercent\":0.886,\"pointY\":286,\"pointYPercent\":0.8171428571428572,\"projectID\":1,\"width\":500}]";
    const _dataMap = JSON.parse(_dataStr);
    ypgView.show(_dataMap);
    ypgView.setBackGround("http://127.0.0.1:9999/ae28700f47355cd4f71b.jpg");

    const yTable = document.getElementById("yaTable") as YaTable;
    yTable.init(
      ["T1", "T2", "T3"],
      [
        ["11", "12", "13"],
        ["21", "22", "23"],
        ["31", "32", "33"],
      ],
      ["<", "1", "2", "3", ">"],
      "1",
      (pageNumber) => {
        yTable.SetPageNumber(["<", "1", "2", ">"], (pN) => {
          yTable.Update(
            ["b" + pN, "t2", "t3"],
            [
              ["a1", "a2", "a3"],
              ["b1", "b2", "b3"],
              ["c1", "c2", "c3"],
            ],
            pN
          );
        });
        yTable.Update(
          ["a" + pageNumber, "t2", "t3"],
          [
            ["a1", "a2", "a3"],
            ["b1", "b2", "b3"],
            ["c1", "c2", "c3"],
          ],
          pageNumber
        );
      }
    );
    const yTU = document.getElementById("yTU") as HTMLButtonElement;
    yTU.onclick = () => {
      yTable.Dispose();
    };
    const ycpbView = document.getElementById("ycpb") as YaCircleProgressBar;
    ycpbView.init(
      80,
      100,
      ["yellow", "green", "red", "black"],
      "#858788",
      "#fff",
      true
    );
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
