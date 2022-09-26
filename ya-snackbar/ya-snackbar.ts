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
     *
     */
    static show(
        text: string,
        title: string = "",
        icon: string = "info",
        duration: number = 3000
    ) {
        const snackbar: HTMLSpanElement = document.createElement("span");
        snackbar.className = YaSnackbar.control + " ya-share-box";
        const bg: HTMLSpanElement = document.createElement("span");
        bg.className = "ya-share-box-bg";
        bg.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
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
        document.body.appendChild(snackbar);
    }
}
