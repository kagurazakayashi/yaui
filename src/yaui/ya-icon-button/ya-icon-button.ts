export default class YaIconButton extends HTMLElement {
    constructor() {
        super();
        const control = "ya-icon-button";
        require("material-icons");
        require(`./${control}.css`);
        this.className = control;
        const sizePx: string = this.getAttribute("size") ?? "50" + "px";
        const size: number = parseInt(sizePx);
        this.style.width = sizePx;
        this.style.height = sizePx;
        this.style.borderRadius = (size / 2).toString() + "px";
        const icon: HTMLSpanElement = document.createElement("span");
        icon.className = "mico material-icons-outlined";
        icon.style.fontSize = (size - 20).toString() + "px";
        icon.style.lineHeight = icon.style.fontSize;
        icon.innerText = this.innerText;
        this.appendChild(icon);
    }
}
