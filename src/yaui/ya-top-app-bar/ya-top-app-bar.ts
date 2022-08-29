// import material from 'material-icons'
export default class YaTopAppBar extends HTMLElement {
    constructor() {
        super();
        const control = "ya-top-app-bar";
        require(`./${control}.css`);
        this.className = control;
    }
}
