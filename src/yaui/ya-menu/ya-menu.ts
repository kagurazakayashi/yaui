/**
 * 彈出式選單
 */
export default class YaMenu extends HTMLElement {
    static control = "ya-menu";

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaMenu.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        const toSize: string | null = this.getAttribute("toSize");
        if (toSize && toSize.length > 0) {
            return;
        }
        this.className = YaMenu.control + " ya-share-box " + this.className;
        const items: HTMLCollectionOf<Element> =
            this.getElementsByTagName("ya-menu-item");
        let num: number = 0;
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const item: HTMLElement = items[key] as HTMLElement;
                item.className = "ya-menu-item ya-share-ripple";
                num++;
            }
        }
        if (num == 0) {
            return;
        }
        // const itemMargin: number = parseInt(itemsE[0].style.marginRight);
        setTimeout(() => {
            const thisSizeR: DOMRect = this.getBoundingClientRect();
            const thisSize: number[] = [
                thisSizeR.width, // 0W
                thisSizeR.height, // 1H
                thisSizeR.left, // 2X
                thisSizeR.top, // 3Y
            ];
            this.setAttribute("toSize", thisSize.join(","));
            for (const key in items) {
                if (Object.prototype.hasOwnProperty.call(items, key)) {
                    const item: HTMLElement = items[key] as HTMLElement;
                    item.style.width = thisSize[0] + "px";
                }
            }
            this.style.display = "none";
            this.style.opacity = "1";
        }, 100);
    }

    /**
     * 開啟一個選單
     * @param {YaMenu} menu 要開啟的 YaMenu 物件
     */
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
        const sizeStr: string[] = menu.getAttribute("toSize").split(",");
        let thisSize: number[] = [
            parseInt(sizeStr[0]), // 0W
            parseInt(sizeStr[1]), // 1H
            parseInt(sizeStr[2]), // 2X
            parseInt(sizeStr[3]), // 3Y
        ];
        let bottom: number = thisSize[3] + thisSize[1];
        if (bottom > document.body.clientHeight - 10) {
            bottom = document.body.clientHeight - 10;
        }
        bottom -= thisSize[3];
        thisSize[1] = bottom;
        // const toSizeArr: string[] = toSize.split(",");
        menu.style.width = "0px";
        menu.style.height = "0px";
        menu.style.display = "inline-block";
        menu.style.overflowX = "hidden";
        menu.style.overflowY = "hidden";
        menu.style.transition = "all 0.3s";
        setTimeout(() => {
            menu.style.width = thisSize[0] + "px";
            menu.style.height = thisSize[1] + "px";
        }, 100);
        setTimeout(() => {
            menu.style.transition = "";
            menu.style.width = thisSize[0] + "px";
            menu.style.height = thisSize[1] + "px";
            menu.style.overflowY = "auto";
        }, 500);
    }

    /**
     * 關閉一個選單
     * @param {YaMenu} menu 要關閉的 YaMenu 物件
     */
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
