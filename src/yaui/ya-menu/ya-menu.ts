export default class YaMenu extends HTMLElement {
    static control = "ya-menu";
    constructor() {
        super();
        require(`./${YaMenu.control}.css`);
        const toSize: string | null = this.getAttribute("toSize");
        if (toSize && toSize.length > 0) {
            return;
        }
        this.className = YaMenu.control + " ya-share-box " + this.className;
        const items: HTMLCollectionOf<Element> =
            this.getElementsByTagName("ya-menu-item");
        let itemsE: HTMLElement[] = [];
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const item: HTMLElement = items[key] as HTMLElement;
                item.className = "ya-menu-item ya-share-ripple";
                itemsE.push(item);
            }
        }
        if (itemsE.length == 0) {
            return;
        }
        // const itemMargin: number = parseInt(itemsE[0].style.marginRight);
        setTimeout(() => {
            const thisSize: string[] = [
                this.clientWidth.toString(),
                this.clientHeight.toString(),
            ];
            for (const item of itemsE) {
                item.style.width = thisSize[0] + "px";
            }
            this.setAttribute("toSize", thisSize.join(","));
            this.style.display = "none";
            this.style.opacity = "1";
        }, 100);
    }

    static open(menu: HTMLElement) {
        const toSize: string = menu.getAttribute("toSize");
        if (!toSize || toSize.length == 0) {
            return;
        }
        const fullscr: HTMLDivElement = document.createElement("div");
        fullscr.className = "ya-fullscr";
        fullscr.onclick = () => {
            YaMenu.close(menu);
        };
        document.body.appendChild(fullscr);
        const toSizeArr: string[] = toSize.split(",");
        menu.style.width = "0px";
        menu.style.height = "0px";
        menu.style.display = "inline-block";
        menu.style.overflowX = "hidden";
        menu.style.overflowY = "hidden";
        menu.style.transition = "all 0.3s";
        setTimeout(() => {
            menu.style.width = toSizeArr[0] + "px";
            menu.style.height = toSizeArr[1] + "px";
        }, 100);
        setTimeout(() => {
            menu.style.transition = "";
            menu.style.width = toSizeArr[0] + "px";
            menu.style.height = toSizeArr[1] + "px";
            menu.style.overflowY = "auto";
        }, 500);
    }

    static close(menu: HTMLElement) {
        menu.style.transition = "all 0.3s";
        setTimeout(() => {
            menu.style.width = "0px";
            menu.style.height = "0px";
            menu.style.overflowX = "hidden";
            menu.style.overflowY = "hidden";
        }, 100);
        setTimeout(() => {
            menu.style.display = "none";
            const fullscrs: HTMLCollectionOf<Element> =
                document.body.getElementsByClassName("ya-fullscr");
            for (const key in fullscrs) {
                if (Object.prototype.hasOwnProperty.call(fullscrs, key)) {
                    const fullscr = fullscrs[key];
                    fullscr.remove();
                }
            }
        }, 500);
    }
}
