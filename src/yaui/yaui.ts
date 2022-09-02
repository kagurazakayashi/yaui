export default class YaShare {
    static init() {
        window.yaLoaded = [];
        require(`./yaui.css`);
    }
    static load(
        constructor: CustomElementConstructor,
        options?: ElementDefinitionOptions
    ) {
        const control: any = constructor;
        window.customElements.define(control.control, constructor, options);
    }
}
