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
     */
    static show(
        text: string,
        title: string = "",
        icon: string = "info",
        duration: number = 3000
    ) {
        const snackboxs: HTMLCollectionOf<Element> =
            document.getElementsByClassName(YaSnackbar.control + "-box");
        let snackbox: HTMLDivElement;
        if (snackboxs.length == 0) {
            snackbox = document.createElement("div");
            snackbox.className = YaSnackbar.control + "-box";
            document.body.appendChild(snackbox);
        } else {
            snackbox = snackboxs[0] as HTMLDivElement;
        }
        const snackbar: HTMLSpanElement = document.createElement("span");
        snackbar.className = YaSnackbar.control + " ya-share-box";
        const bg: HTMLSpanElement = document.createElement("span");
        bg.className = "ya-share-box-bg";
        snackbar.appendChild(bg);
        if (icon.length > 0) {
            const iconInfo: string[] = icon.split("#");
            const iconType: string = iconInfo[0];
            const iconColor: string = iconInfo[1] ?? "";
            const iconBox = document.createElement("span");
            iconBox.className =
                YaSnackbar.control + "-icon material-icons-outlined";
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
        const moveX: number = snackbar.clientWidth + 20;
        setTimeout(() => {
            if (snackbar)
                snackbar.style.transform = `translate(-${moveX}px, 0)`;
        }, 100);
        const closeTransform: string = `translate(${moveX}px, 0)`;
        setTimeout(() => {
            if (snackbar) snackbar.style.transform = closeTransform;
        }, 100 + duration);
        setTimeout(() => {
            if (snackbar) snackbar.remove();
            YaSnackbar.autoRemoveBox();
        }, 100 + duration + 300);
        snackbar.addEventListener("click", () => {
            if (snackbar) snackbar.style.transform = closeTransform;
            setTimeout(() => {
                if (snackbar) snackbar.remove();
                YaSnackbar.autoRemoveBox();
            }, 300);
        });
    }

    static autoRemoveBox() {
        const snackbars: HTMLCollectionOf<Element> =
            document.getElementsByClassName(YaSnackbar.control);
        if (snackbars.length == 0) {
            const snackboxs: HTMLCollectionOf<Element> =
                document.getElementsByClassName(YaSnackbar.control + "-box");
            for (const key in snackboxs) {
                if (Object.prototype.hasOwnProperty.call(snackboxs, key)) {
                    const snackbox: Element = snackboxs[key];
                    snackbox.remove();
                }
            }
        }
    }
}
