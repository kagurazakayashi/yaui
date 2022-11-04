/**
 * 對話方塊（函式型）
 */
export default class YaDialog {
  static control = "ya-dialog";
  // dialog: HTMLDivElement;
  // bodyOverFlow: string = "auto";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaDialog.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaDialog} 本控制元件物件
   */
  static f(obj: any): YaDialog {
    return obj as YaDialog;
  }

  // /**
  //  * 建構函式
  //  */
  // constructor() {
  // }

  /**
   * 顯示此對話方塊
   */
  static show(
    option: YaDialogOption,
    btnEqualWidth = true,
    btnEqualHeight = true
  ) {
    const bodyOverFlow: string = document.body.style.overflow;
    const dialog: HTMLDivElement = document.createElement("div");
    dialog.className = YaDialog.control + " ya-share-box";

    const toast: HTMLDivElement = document.createElement("div");
    toast.className = YaDialog.control + "-toast";
    toast.id = YaDialog.control + "-toast";
    toast.innerHTML = `<div id="${YaDialog.control}-toast-title" class="title"></div><div id="${YaDialog.control}-toast-contain" class="contain"></div><div id="ya-dialog-toast-foot" class="toastfoot"><button id="${YaDialog.control}-toast-ok"></button><button id="${YaDialog.control}-toast-cancel"></button></div>`;
    const flexGrow1 = "<div style='flex-grow: 1'></div>";
    dialog.innerHTML = flexGrow1;
    dialog.appendChild(toast);
    dialog.innerHTML += flexGrow1;

    const btnList: YaDialogButtonListOption[] = [];
    // let isShow = true;

    // let btnOption = {} as YaDialogButtonListOption;

    const tTitle = dialog.getElementsByClassName("title")[0] as HTMLDivElement;
    if (tTitle != null && option.title != null) {
      tTitle.innerHTML = option.title.value;
      if (option.title.style != null) {
        YaDialog._setStyle("tTitle", tTitle, option.title.style);
      }
    }

    const contain = dialog.getElementsByClassName(
      "contain"
    )[0] as HTMLDivElement;
    if (contain != null && option.contain != null) {
      contain.innerHTML = option.contain.value;
      if (option.title && option.title.style != null) {
        YaDialog._setStyle(
          "contain",
          contain,
          option.contain.style as YaDialogStyle
        );
      }
    }

    const foot = dialog.getElementsByClassName(
      "toastfoot"
    )[0] as HTMLDivElement;
    if (foot != null) {
      const btns: HTMLCollectionOf<HTMLButtonElement> =
        foot.getElementsByTagName("button");
      if (!(option.addBtn != null && option.addBtn)) foot.innerHTML = "";
      if (option.foot != null) {
        if (option.foot.style != null)
          YaDialog._setStyle("foot", foot, option.foot.style);
        if (option.foot.items != null) {
          if (Array.isArray(option.foot.items)) {
            option.foot.items.forEach((item) => {
              const btnOption = {} as YaDialogButtonListOption;
              if (item.element != null) {
                btnOption.id = item.element.id;
                foot.appendChild(item.element);
              } else {
                if (item.tagName != null) {
                  const footEle = document.createElement(item.tagName);
                  if (item.id != null) {
                    footEle.id = item.id;
                  }
                  if (footEle.id == "") {
                    footEle.id = "toastFoot" + btnList.length;
                  }
                  btnOption.id = item.id as string;
                  if (item.class != null) footEle.className = item.class;
                  if (item.value != null) footEle.innerText = item.value;
                  if (item.style != null)
                    YaDialog._setStyle("footEle", footEle, item.style);

                  foot.appendChild(footEle);
                }
              }
              if (item.click != null) {
                btnOption.click = () => {
                  item.click();
                  if (item.isClose != null && item.isClose) {
                    YaDialog.close(bodyOverFlow);
                  }
                };
              }
              btnList.push(btnOption);
            });
          } else {
            foot.innerHTML = option.foot.items;
          }
        }
      }

      let btnok: HTMLButtonElement | null = null;
      for (const key in btns) {
        if (Object.prototype.hasOwnProperty.call(btns, key)) {
          const btnsE: HTMLButtonElement = btns[key];
          if (btnsE.id == YaDialog.control + "-toast-ok") {
            btnok = btnsE;
          }
        }
      }
      if (btnok) {
        let isShow = true;
        const btnOption = {
          id: YaDialog.control + "-toast-ok",
        } as YaDialogButtonListOption;
        if (option.ok.value != null) btnok.innerText = option.ok.value;
        if (option.ok.click != null)
          btnOption.click = () => {
            option.ok.click();
            if (option.ok.isClose != null && option.ok.isClose)
              YaDialog.close(bodyOverFlow);
          };
        if (option.ok.show != null && !option.ok.show) {
          btnok.style.display = "none";
          isShow = false;
          foot.removeChild(btnok);
        }
        if (isShow) btnList.push(btnOption);
      }

      let btnC: HTMLButtonElement | null = null;
      for (const key in btns) {
        if (Object.prototype.hasOwnProperty.call(btns, key)) {
          const btnsE: HTMLButtonElement = btns[key];
          if (btnsE.id == YaDialog.control + "-toast-cancel") {
            btnC = btnsE;
          }
        }
      }
      if (btnC && option.cancel != null) {
        let isShow = true;
        const btnOption = {
          id: YaDialog.control + "-toast-cancel",
        } as YaDialogButtonListOption;
        if (option.cancel.value != null) btnC.innerText = option.cancel.value;
        if (option.cancel.click != null)
          btnOption.click = () => {
            if (option.cancel) {
              option.cancel.click();
              if (
                option.cancel.isClose == null ||
                (option.cancel.isClose != null && option.cancel.isClose)
              ) {
                YaDialog.close(bodyOverFlow);
              }
            }
          };
        if (option.cancel.show != null && !option.cancel.show) {
          btnC.style.display = "none";
          isShow = false;
          foot.removeChild(btnC);
        }
        if (isShow) btnList.push(btnOption);
      }

      if (option.style != null) {
        const toast = dialog.getElementsByClassName(
          YaDialog.control + "-toast"
        )[0] as HTMLDivElement;
        YaDialog._setStyle(
          `document.getElementById("${YaDialog.control}-toast")`,
          toast,
          option.style
        );
      }
      if (!btnEqualWidth) foot.style.justifyContent = "flex-end";
    }

    document.body.appendChild(dialog);
    document.body.style.overflow = "hidden";
    // const btnTest = document.createElement("button");
    // HTMLElement;

    if (option.clickbackgroudClose != null && option.clickbackgroudClose) {
      dialog.addEventListener("click", () => {
        YaDialog.close(bodyOverFlow);
      });
    }

    let footBtnMaxWidth = 0.0;
    let footBtnAllWidth = 0.0;
    let footBtnMaxHeight = 0.0;
    btnList.forEach((item) => {
      const btn = document.getElementById(item.id);
      if (btn == null) {
        return;
      }
      if (item.click != null)
        btn.addEventListener("click", (e) => {
          if (item.click != null) {
            item.click();
            e.stopPropagation();
          }
        });
      if (!btnEqualWidth) {
        btn.style.width = "auto";
      }
      footBtnAllWidth += btn.offsetWidth;
      if (btn.offsetWidth > footBtnMaxWidth) {
        footBtnMaxWidth = btn.offsetWidth;
      }
      if (btn.offsetHeight > footBtnMaxHeight) {
        footBtnMaxHeight = btn.offsetHeight;
      }
    });

    const tFoot: HTMLDivElement = document.getElementById(
      YaDialog.control + "-toast-foot"
    ) as HTMLDivElement;

    if (footBtnAllWidth + 16 < tFoot.offsetWidth) {
      tFoot.style.borderTop = "none";
    }
    if (btnEqualWidth) {
      btnList.forEach((item) => {
        const btn = document.getElementById(item.id);
        if (btn == null) {
          return;
        }
        btn.style.width = footBtnMaxWidth + "px";
      });
    }

    const tMain = document.getElementById(
      YaDialog.control + "-toast"
    ) as HTMLDivElement;
    if (btnEqualHeight) tFoot.style.height = footBtnMaxHeight + "px";
    tMain.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /**
   * 關閉並銷燬對話方塊
   */
  static close(bodyOverFlow: string) {
    const dialog = document.getElementsByClassName(YaDialog.control);
    if (!dialog) return;
    for (const key in dialog) {
      if (Object.prototype.hasOwnProperty.call(dialog, key)) {
        const element = dialog[key];
        if (!element) continue;
        element.remove();
      }
    }
    document.body.style.overflow = bodyOverFlow;
  }

  static _setStyle(id: string, el: HTMLElement, vs: YaDialogStyle) {
    if (vs.maxWidth != null) el.style.maxWidth = vs.maxWidth;
    if (vs.maxHeight != null) el.style.maxHeight = vs.maxHeight;
    if (vs.minWidth != null) el.style.minWidth = vs.minWidth;
    if (vs.minHeight != null) el.style.minHeight = vs.minHeight;
    if (vs.width != null) el.style.width = vs.width;
    if (vs.height != null) el.style.height = vs.height;
    if (vs.lineHeight != null) el.style.lineHeight = vs.lineHeight;
    if (vs.background != null) el.style.background = vs.background;
    if (vs.backgroundColor != null)
      el.style.backgroundColor = vs.backgroundColor;
    if (vs.backgroundImage != null)
      el.style.backgroundImage = vs.backgroundImage;
    if (vs.border != null) el.style.border = vs.border;
    if (vs.boxShadow != null) el.style.boxShadow = vs.boxShadow;
    if (vs.borderRadius != null) el.style.borderRadius = vs.borderRadius;
    if (vs.color != null) el.style.color = vs.color;
    if (vs.fontSize != null) el.style.fontSize = vs.fontSize;
    if (vs.textAlign != null) el.style.textAlign = vs.textAlign;
    if (vs.textShadow != null) el.style.textShadow = vs.textShadow;
    if (vs.margin != null) el.style.margin = vs.margin;
    if (vs.padding != null) el.style.padding = vs.padding;
  }
}

interface YaDialogOption {
  clickbackgroudClose?: boolean; //默认值:false;点击背景是否关闭
  title?: {
    value: string; //内容
    style?: YaDialogStyle; //标题样式
  }; //标题部分
  contain?: {
    value: string; //内容
    style?: YaDialogStyle; //内容部分样式
  }; //内容部分
  foot?: {
    items: YaDialogFootItems[] | string;
    style?: YaDialogStyle; //按钮部分样式
  }; //按钮部分
  ok: {
    show?: boolean; //默认值:true;是否显示
    isClose?: boolean; //默认值:false;点击控件后是否关闭对话框
    click: () => void; //控件的点击方法
    value: string; //内容
    style?: YaDialogStyle; //确认按钮样式
  }; //确认按钮
  cancel?: {
    show?: boolean; //默认值:true;是否显示
    isClose?: boolean; //默认值:true;点击控件后是否关闭对话框
    click: () => void; //控件的点击方法
    value: string; //内容
    style?: YaDialogStyle; //确认按钮样式
  }; //取消按钮
  addBtn?: boolean; //默认值:false;是否在原按钮后添加foot.items中的内容
  style?: YaDialogStyle; //对话框样式
}

interface YaDialogFootItems {
  element?: HTMLElement; //控件，有此项时忽略`tagName`,`id`,`class`,`value`,`style`
  tagName?: string; //需要创建的控件
  id?: string; //控件的ID
  class?: string; //控件的class
  value?: string; //控件的内容
  click: () => void; //控件的点击方法
  style?: YaDialogStyle; //样式
  isClose?: boolean; //默认值:false;点击控件后是否关闭对话框
}
interface YaDialogStyle {
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  width?: string;
  height?: string;
  lineHeight?: string;
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  border?: string;
  boxShadow?: string;
  borderRadius?: string;
  color?: string;
  fontSize?: string;
  textAlign?: string;
  textShadow?: string;
  margin?: string;
  padding?: string;
}

interface YaDialogButtonListOption {
  id: string;
  // innerText?: string;
  click?: () => void;
}
