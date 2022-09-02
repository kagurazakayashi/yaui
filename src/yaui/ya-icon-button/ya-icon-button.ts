export default class YaIconButton extends HTMLElement {
    static control = "ya-icon-button";
    constructor() {
        super();
        require("material-icons");
        require(`./${YaIconButton.control}.css`);
        this.className = YaIconButton.control + " " + this.className;
        const sizePx: string = (this.getAttribute("size") ?? "50") + "px";
        const size: number = parseInt(sizePx);
        this.style.width = sizePx;
        this.style.height = sizePx;
        this.style.borderRadius = (size / 2).toString() + "px";
        const icon: HTMLSpanElement = document.createElement("span");
        icon.className = "mico material-icons-outlined";
        icon.style.width = sizePx;
        icon.style.height = sizePx;
        icon.style.fontSize = (size - 20).toString() + "px";
        icon.style.lineHeight = icon.style.fontSize;
        icon.innerText = this.innerText;
        this.innerHTML = '';
        this.appendChild(icon);
    }
}
