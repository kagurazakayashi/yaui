/**
 * 文本输入框
 */
export default class YaTextBox extends HTMLElement {
    static control = "ya-text-box";
    modes: string[] = [];
    errBoxs: HTMLDivElement[] = [];

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaTextBox.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        this.className = YaTextBox.control + " ya-share-box " + this.className;
        const input: HTMLInputElement = document.createElement("input");
        if (this.className.indexOf("ya-text-box-password") >= 0) {
            input.type = "password";
        }
        const placeholderText: string = this.getAttribute("placeholder") ?? "";
        if (placeholderText.length > 0) {
            const placeholder: HTMLSpanElement = document.createElement("span");
            placeholder.className = YaTextBox.control + "-placeholder";
            placeholder.innerText = placeholderText;
            this.appendChild(placeholder);
            input.addEventListener("focus", () => {
                placeholder.style.transition = "all 0.3s";
                this.style.transition = "all 0.3s";
                setTimeout(() => {
                    placeholder.style.color = "#2E86C1";
                    this.style.borderColor = "#2E86C1";
                    placeholder.style.fontSize = "12px";
                    placeholder.style.top = "-20px";
                    placeholder.style.left = "5px";
                    const text: string = placeholder.innerText;
                    if (text.charAt(text.length - 1) != ":") {
                        placeholder.innerText = text + ":";
                    }
                }, 100);
                setTimeout(() => {
                    placeholder.style.transition = "";
                    this.style.transition = "";
                }, 500);
            });
            input.addEventListener("blur", () => {
                if (input.value.length > 0) {
                    return;
                }
                placeholder.style.transition = "all 0.3s";
                this.style.transition = "all 0.3s";
                setTimeout(() => {
                    if (
                        this.style.borderColor != "rgb(255, 0, 0)" &&
                        this.style.borderColor != "#F00"
                    ) {
                        this.style.borderColor = "gray";
                    }
                    placeholder.style.color = "gray";
                    placeholder.style.fontSize = "medium";
                    placeholder.style.top = "5px";
                    placeholder.style.left = "5px";
                    let text: string = placeholder.innerText;
                    for (let i = 0; i < text.length; i++) {
                        if (text.charAt(text.length - 1) == ":") {
                            text = text.substring(0, text.length - 1);
                        } else {
                            placeholder.innerText = text;
                        }
                    }
                }, 100);
                setTimeout(() => {
                    placeholder.style.transition = "";
                    this.style.transition = "";
                }, 500);
            });
            input.addEventListener("input", () => {
                const val: string = input.value;
                let brk: number = 0;
                for (let i = 0; i < this.modes.length; i++) {
                    const errBox: HTMLDivElement = this.errBoxs[i];
                    if (brk > 0) {
                        errBox.style.display = "none";
                        continue;
                    }
                    const mode: string = this.modes[i];
                    const reg = new RegExp(mode);
                    if (reg.test(val)) {
                        errBox.style.display = "none";
                    } else {
                        errBox.style.display = "block";
                        this.setAttribute("ya-err", errBox.innerText);
                        brk++;
                    }
                }
                if (brk > 0) {
                    this.style.borderColor = "#F00";
                } else {
                    this.style.borderColor = "gray";
                    this.removeAttribute("ya-err");
                }
            });
        }
        const errBoxEs: HTMLCollectionOf<Element> =
            this.getElementsByClassName("ya-text-box-rule");
        for (const key in errBoxEs) {
            if (Object.prototype.hasOwnProperty.call(errBoxEs, key)) {
                const errBox: HTMLDivElement = errBoxEs[key] as HTMLDivElement;
                let mode: string = errBox.getAttribute("ya-mode") ?? "";
                if (mode.length == 0) {
                    mode = "\\S";
                    errBox.setAttribute("ya-mode", mode);
                }
                this.modes.push(mode);
                this.errBoxs.push(errBox);
            }
        }
        this.appendChild(input);
    }

    /**
     * 檢查表單是否可以提交
     * @param {HTMLElement} form 包括 ya-text-box 的父元素
     * @return {string} 錯誤資訊列表
     */
    static chkRules(form: HTMLElement): string[] {
        const textboxes: HTMLCollectionOf<Element> =
            form.getElementsByTagName("ya-text-box");
        const errors: string[] = [];
        for (const key in textboxes) {
            if (Object.prototype.hasOwnProperty.call(textboxes, key)) {
                const textbox: HTMLElement = textboxes[key] as HTMLElement;
                const err: string = textbox.getAttribute("ya-err") ?? "";
                errors.push(err);
            }
        }
        return errors;
    }
}
