// import material from 'material-icons'
export default class YaTopAppBar extends HTMLElement {
    static control = "ya-top-app-bar";
    constructor() {
        super();
        require(`./${YaTopAppBar.control}.css`);
        this.className =
            YaTopAppBar.control + " ya-share-box " + this.className;
        const iconBtns: HTMLCollectionOf<Element> =
            this.getElementsByTagName("ya-icon-button");
        for (const key in iconBtns) {
            if (Object.prototype.hasOwnProperty.call(iconBtns, key)) {
                const iconBtn: Element = iconBtns[key];
                iconBtn.className += "ya-share-ripple";
            }
        }
        // ya-icon-button
    }
}
