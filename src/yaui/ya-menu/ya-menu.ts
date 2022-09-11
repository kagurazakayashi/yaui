/**
 * 彈出式選單
 */
export interface YaMenuDelegate {
    yaClickMenuItem(menu: YaMenu, item: HTMLElement, index: number): void;
}

export default class YaMenu extends HTMLElement {
    static control = "ya-menu";
    bg: HTMLSpanElement;
    delegate: YaMenuDelegate | null = null;

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
        const toSize: string | null = this.getAttribute("ya-size");
        if (toSize && toSize.length > 0) {
            return;
        }
        this.className = YaMenu.control + " ya-share-box " + this.className;
        this.bg = document.createElement("span");
        this.bg.className = "ya-share-box-bg";
        this.insertBefore(this.bg, this.firstChild);
        const items: HTMLCollectionOf<Element> =
            this.getElementsByTagName("ya-menu-item");
        let num: number = 0;
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const item: HTMLElement = items[key] as HTMLElement;
                item.className = "ya-menu-item ya-share-ripple";
                const spans: HTMLCollectionOf<HTMLSpanElement> =
                    item.getElementsByTagName("span");
                if (spans.length == 0) {
                    item.className += " ya-menu-item-no-icon";
                }
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
            this.setAttribute("ya-size", thisSize.join(","));
            for (let i = 0; i < items.length; i++) {
                const item: HTMLElement = items[i] as HTMLElement;
                item.style.width = thisSize[0] + "px";
                item.addEventListener("click", () => {
                    this.delegate?.yaClickMenuItem(this, item, i);
                });
            }
            this.style.display = "none";
            this.style.opacity = "1";
        }, 100);
    }

    /**
     * 配置動畫前的狀態
     * @param menu 
     */
    aniPre(menu: YaMenu | HTMLElement) {
        menu.style.width = "0px";
        menu.style.height = "0px";
        menu.style.display = "block";
        menu.style.transition = "all 0.3s";
        menu.style.overflowX = "hidden";
        menu.style.overflowY = "hidden";
    }

    /**
     * 開啟一個選單
     * @param {YaMenu} menu 要開啟的 YaMenu 物件
     */
    static open(menu: YaMenu | HTMLElement) {
        if (menu.getAttribute("ya-open") == "1") {
            return;
        }
        const toSize: string = menu.getAttribute("ya-size");
        if (!toSize || toSize.length == 0) {
            return;
        }
        const sizeStr: string[] = menu.getAttribute("ya-size").split(",");
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
        (menu as YaMenu).aniPre(menu);
        setTimeout(() => {
            menu.style.width = thisSize[0] + "px";
            menu.style.height = thisSize[1] + "px";
            (menu as YaMenu).bg.style.width = thisSize[0] + "px";
            (menu as YaMenu).bg.style.height = menu.scrollHeight + "px";
        }, 100);
        setTimeout(() => {
            menu.style.transition = "";
            menu.style.width = thisSize[0] + "px";
            menu.style.height = thisSize[1] + "px";
            menu.style.overflowY = "auto";
        }, 500);
        menu.setAttribute("ya-open", "1");
    }

    /**
     * 關閉一個選單
     * @param {YaMenu|HTMLElement} menu 要關閉的 YaMenu 物件
     */
    static close(menu: YaMenu | HTMLElement) {
        if (menu.getAttribute("ya-open") == "0") {
            return;
        }
        (menu as YaMenu).aniPre(menu);
        setTimeout(() => {
            menu.style.display = "none";
        }, 300);
        menu.setAttribute("ya-open", "0");
    }
}
