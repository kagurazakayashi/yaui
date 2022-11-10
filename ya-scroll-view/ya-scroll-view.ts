/**
 * 滾動區域，配合 ya-view 使用
 */
export default class YaScrollView extends HTMLElement {
  static control = "ya-scroll-view";
  scrollOldTop = 0;
  scrollOldMode = false; // F↑ T↓
  scrollModeI = 0;
  appBars: HTMLElement[] = [];

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaScrollView.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaScrollView} 本控制元件物件
   */
  static f(obj: any): YaScrollView {
    return obj as YaScrollView;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    if (this.className.indexOf(YaScrollView.control) < 0) {
      this.className = YaScrollView.control + " " + this.className;
    }
    /*
        if (this.className.indexOf("ya-auto-hide-app-bar") >= 0) {
            const appBarEs: HTMLCollectionOf<Element> =
                document.body.getElementsByTagName("ya-top-app-bar");
            for (const key in appBarEs) {
                if (Object.prototype.hasOwnProperty.call(appBarEs, key)) {
                    const appBar: HTMLElement = appBarEs[key] as HTMLElement;
                    appBar.style.transition = "all 0.5s";
                    this.appBars.push(appBar);
                }
            }
            this.addEventListener("scroll", () => {
                const top: number = this.scrollTop;
                if (this.scrollOldTop > top) {
                    console.log("↑", top);
                    if (!this.scrollOldMode) {
                        this.scrollModeI++;
                        if (this.scrollModeI > 10) {
                            this.appBarShow(true);
                        }
                    } else {
                        this.scrollModeI = 0;
                    }
                    this.scrollOldMode = false;
                } else if (this.scrollOldTop < top) {
                    console.log("↓", top);
                    if (this.scrollOldMode) {
                        this.scrollModeI++;
                        if (this.scrollModeI > 10) {
                            this.appBarShow(false);
                        }
                    } else {
                        this.scrollModeI = 0;
                    }
                    this.scrollOldMode = true;
                }
                if (top >= 70) {
                }
                this.scrollOldTop = top;
            });
        }
        */
  }

  /*
    appBarShow(isShow: boolean) {
        if (isShow) {
            for (const appBar of this.appBars) {
                appBar.className = appBar.className.replace(
                    "top-app-bar-hide",
                    "top-app-bar-show"
                );
                if (appBar.className.indexOf("top-app-bar-show") < 0) {
                    appBar.className += "top-app-bar-show";
                }
            }
        } else {
            for (const appBar of this.appBars) {
                appBar.className = appBar.className.replace(
                    "top-app-bar-show",
                    "top-app-bar-hide"
                );
                if (appBar.className.indexOf("top-app-bar-hide") < 0) {
                    appBar.className += "top-app-bar-hide";
                }
            }
        }
    }
    */
}
