/**
 * 时间选择器
 */
export default class YaTimeSelecter extends HTMLElement {
    static control = "ya-time-selecter";
    scrolling: boolean = false;
    oldScrollTop: number = 0;

    /**
     * 加载所需的样式等其他文件
     * 該函式由 YAUI 類呼叫，無需手工執行
     */
    static loadFile() {
        require(`./${YaTimeSelecter.control}.css`);
    }

    /**
     * 對該控制元件的 UI 和行為進行準備工作
     */
    constructor() {
        super();
        this.className = YaTimeSelecter.control + " " + this.className;
        const leftBox: HTMLDivElement = document.createElement("div");
        leftBox.className = `${YaTimeSelecter.control}-box ${YaTimeSelecter.control}-left-box`;
        let items: HTMLDivElement[] = [];
        for (let i = 1; i < 62; i++) {
            const item: HTMLDivElement = document.createElement("div");
            item.className = `${YaTimeSelecter.control}-item`;
            if (i > 1 && i < 61) {
                item.innerText = (i - 1).toString();
            }
            leftBox.appendChild(item);
            items.push(item);
        }
        leftBox.addEventListener("scroll", (ev: Event) => {
            if (this.scrolling) {
                return;
            }
            const scrollTop: number = leftBox.scrollTop;
            setTimeout(() => { // 等待滾動完成
                for (let i = 0; i < items.length; i++) {
                    const item: HTMLDivElement = items[i];
                    const prev: HTMLDivElement | undefined = items[i - 1];
                    const next: HTMLDivElement | undefined = items[i + 1];
                    const toOffsetTop = item.offsetTop - 64; // 有0.3s CSS动画
                    if (scrollTop < toOffsetTop) {
                        this.scrolling = true;
                        leftBox.scrollTop = item.offsetTop - 32;
                        setTimeout(() => {
                            this.scrolling = false;
                            console.log("V:", item.innerText);
                        }, 300);
                        break;
                    }
                }
            }, 100);
        });
        const nowSel = document.createElement("div");
        nowSel.className = `${YaTimeSelecter.control}-now-sel`;
        leftBox.appendChild(nowSel);
        this.appendChild(leftBox);
        const rightBox: HTMLDivElement = document.createElement("div");
        rightBox.className = `${YaTimeSelecter.control}-box ${YaTimeSelecter.control}-right-box`;
        this.appendChild(rightBox);
    }
}
