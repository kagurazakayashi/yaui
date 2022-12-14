/**
 * 自定義對話方塊
 */
export default class YaDialogLogin extends HTMLElement {
  static readonly control = "ya-dialog-login";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaDialogLogin.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaDialogLogin} 本控制元件物件
   */
  static f(obj: any): YaDialogLogin {
    return obj as YaDialogLogin;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    if (this.className.indexOf(YaDialogLogin.control) < 0) {
      this.className = YaDialogLogin.control + " " + this.className;
    }
    // ya-dialog-login-add-side
    // const sidebars: HTMLCollectionOf<Element> = this.getElementsByClassName(
    //   YaDialogLogin.control + "-sidebar"
    // );
    const contents: HTMLCollectionOf<Element> = this.getElementsByClassName(
      YaDialogLogin.control + "-content"
    );
    for (const key in contents) {
      if (Object.prototype.hasOwnProperty.call(contents, key)) {
        const content: HTMLElement = contents[key] as HTMLElement;
        content.className += " ya-share-box";
        const bg: HTMLSpanElement = document.createElement("span");
        bg.className = "ya-share-box-bg";
        content.insertBefore(bg, content.firstChild);
      }
    }
  }
}
