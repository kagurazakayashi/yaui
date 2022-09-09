/**
 * 文本输入框
 */
export default class YaTextBox extends HTMLElement {
    static control = "ya-text-box";

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaTextBox.control}.css`);
    }

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
                    placeholder.style.top = "-15px";
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
                    placeholder.style.color = "gray";
                    this.style.borderColor = "gray";
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
        }
        this.appendChild(input);
    }
}
