/**
 * 臨時彈出資訊框（函式型）
 */
export default class YaSnackbar {
    static control = "ya-snackbar";

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaSnackbar.control}.css`);
    }

    /**
     * 顯示 Snackbar
     * @param {string} text 要顯示的文字
     * @param {string} title 標題
     * @param {string} icon `圖標名称` 或 `图标名称#图标颜色`
     * 如果未指定 `#图标颜色` ，将根据图标名称自动选择颜色：
     * check_circle:forestgreen, cancel:orangered, warning:goldenrod
     * @param {string} position 在螢幕上的位置
     * lt: 左上, ct: 顶部 rt: 右上, lb: 左下, cb:底部, rb: 右下
     * @param {number} duration 懸停時間
     * @param {number} width 提示框寬度（會改變一側所有提示框的寬度）
     * @param {number} speed 進入和退出動畫的速度
     */
    static show(
        text: string,
        title: string = "",
        icon: string = "info",
        position: string = "rt",
        duration: number = 3000,
        width: number = 300,
        speed: number = 300
    ) {
        position = position.toLowerCase();
        const alignW: string = "lcr".indexOf(position[0]) >= 0 ? position[0] : "r";
        const alignH: string = "tb".indexOf(position[1]) >= 0
            ? position[1]
            : "t";
        const className: string = `${YaSnackbar.control}-box-${alignW} ${YaSnackbar.control}-box-${alignH}`;
        const snackboxs: HTMLCollectionOf<Element> =
            document.getElementsByClassName(className);
        let snackbox: HTMLDivElement;
        if (snackboxs.length == 0) {
            snackbox = document.createElement("div");
            snackbox.className = `${className} ${YaSnackbar.control}-box`;
            document.body.appendChild(snackbox);
        } else {
            snackbox = snackboxs[0] as HTMLDivElement;
        }
        snackbox.style.width = width + "px";
        const snackbar: HTMLSpanElement = document.createElement("span");
        snackbar.className = `${YaSnackbar.control} ${YaSnackbar.control}-${alignW} ${YaSnackbar.control}-${alignW}${alignH} ya-share-box`;
        snackbar.style.transitionDuration = speed / 1000 + "s";
        const bg: HTMLSpanElement = document.createElement("span");
        bg.className = "ya-share-box-bg";
        snackbar.appendChild(bg);
        if (icon.length > 0) {
            const iconInfo: string[] = icon.split("#");
            const iconType: string = iconInfo[0];
            const iconColor: string = iconInfo[1] ?? "";
            const iconBox = document.createElement("span");
            iconBox.className = YaSnackbar.control + "-icon material-icons-outlined";
            if (iconColor.length > 0) {
                iconBox.style.color = iconColor;
            } else if (iconColor != "none") {
                switch (icon) {
                    case "check_circle":
                        iconBox.style.color = "forestgreen";
                        break;
                    case "cancel":
                        iconBox.style.color = "orangered";
                        break;
                    case "warning":
                        iconBox.style.color = "goldenrod";
                        break;
                }
            }
            iconBox.innerText = iconType;
            snackbar.appendChild(iconBox);
        }
        if (title.length > 0) {
            const titleBox = document.createElement("div");
            titleBox.className = YaSnackbar.control + "-title";
            titleBox.innerText = title;
            snackbar.appendChild(titleBox);
        }
        const textBox: HTMLDivElement = document.createElement("div");
        textBox.innerText = text;
        if (icon.length > 0 && title.length == 0) {
            textBox.className += YaSnackbar.control + "-icontop";
        }
        snackbar.appendChild(textBox);
        snackbox.appendChild(snackbar);
        const owidth = snackbar.offsetWidth;
        const oheight = snackbar.offsetHeight;
        // alignW
        // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!
        let startTransform: string;
        let closeTransform: string;
        const move: number[] = new Array<number>(2);
        const translate: string = 'translate';
        if (alignW == "c") {
            switch (alignH) {
                case "t":
                    snackbar.style.top = (0 - oheight).toString() + "px";
                    move[0] = oheight;
                    move[1] = 0 - oheight;
                    break;
                case "b":
                    snackbar.style.top = oheight.toString() + "px";
                    move[0] = 0 - oheight;
                    move[1] = oheight;
                    break;
                default:
                    break;
            }
            startTransform = `${translate}(0, ${move[0]}px)`;
            closeTransform = `${translate}(0, ${move[1]}px)`;
        } else {
            switch (alignW) {
                case "l":
                    snackbar.style.left = (0 - owidth).toString() + "px";
                    move[0] = owidth + 20;
                    move[1] = 0 - owidth - 20;
                    break;
                case "r":
                    snackbar.style.right = (0 - owidth).toString() + "px";
                    move[0] = 0 - owidth;
                    move[1] = owidth;
                    break;
                default:
                    break;
            }
            startTransform = `${translate}(${move[0]}px, 0)`;
            closeTransform = `${translate}(${move[1]}px, 0)`;
        }
        setTimeout(() => {
            if (snackbar) snackbar.style.transform = startTransform;
        }, 100);
        setTimeout(() => {
            if (snackbar) snackbar.style.transform = closeTransform;
        }, 100 + duration);
        setTimeout(() => {
            if (snackbar) snackbar.remove();
            YaSnackbar.autoRemoveBox(alignW);
        }, 100 + duration + speed);
        snackbar.addEventListener("click", () => {
            if (snackbar) snackbar.style.transform = closeTransform;
            setTimeout(() => {
                if (snackbar) snackbar.remove();
                YaSnackbar.autoRemoveBox(alignW);
            }, speed);
        });
    }

    static autoRemoveBox(alignW: string) {
        const snackbars: HTMLCollectionOf<Element> =
            document.getElementsByClassName(YaSnackbar.control);
        if (snackbars.length == 0) {
            const snackboxs: HTMLCollectionOf<Element> =
                document.getElementsByClassName(`${YaSnackbar.control}-box-${alignW}`);
            for (const key in snackboxs) {
                if (Object.prototype.hasOwnProperty.call(snackboxs, key)) {
                    const snackbox: Element = snackboxs[key];
                    snackbox.remove();
                }
            }
        }
    }
}
