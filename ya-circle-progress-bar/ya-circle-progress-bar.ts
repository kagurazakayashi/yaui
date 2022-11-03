/**
 * 對話方塊（函式型）
 */
export default class circleProgressBar extends HTMLElement {
  static control = "ya-circle-progress-bar";
  private maxVal = 0;
  private colorList: string[] = [];
  private showValue = true;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${circleProgressBar.control}.css`);
  }

  // /**
  //  * 建構函式
  //  */
  constructor() {
    super();
  }

  /**
   * 顯示此對話方塊
   * @param {number} now 当前值
   * @param {number} max 最大值
   */
  init(
    now: number,
    max: number,
    colors: string[],
    backgroundColor = "transparent",
    textcolor = "#000",
    showText = true
  ) {
    this.className = "ya-circle-progress-bar";
    this.style.border = "9px solid " + backgroundColor;

    const dleft = document.createElement("div");
    dleft.className = "ya-circle-progress-bar-left";
    const leftCircle = document.createElement("div");
    leftCircle.id = "ya-circle-progress-bar-cl";
    leftCircle.className = "ya-circle-progress-bar-circle";
    dleft.appendChild(leftCircle);

    const dright = document.createElement("div");
    dright.className = "ya-circle-progress-bar-right";
    const rightCircle = document.createElement("div");
    rightCircle.id = "ya-circle-progress-bar-cr";
    rightCircle.className = "ya-circle-progress-bar-circle";
    dright.appendChild(rightCircle);

    this.appendChild(dleft);
    this.appendChild(dright);
    this.showValue = showText;
    if (showText) {
      const progressNumber = document.createElement("div");
      progressNumber.id = "ya-circle-progress-bar-progress-number";
      progressNumber.style.color = textcolor;
      this.appendChild(progressNumber);
    }

    this.maxVal = max;
    this.colorList = colors;
    this.SetProgress(now);
  }

  /**
   * 顯示此對話方塊
   * @param {number} now 当前值
   */
  SetProgress(now: number) {
    if (this.showValue) {
      const progressNumber = document.getElementById(
        "ya-circle-progress-bar-progress-number"
      ) as HTMLDivElement | null;
      if (progressNumber != null) {
        progressNumber.innerText = ((now / this.maxVal) * 100).toFixed(1);
      }
    }
    const progress = (now / this.maxVal) * 100;
    const cl = document.getElementById("ya-circle-progress-bar-cl") as HTMLDivElement;
    const cr = document.getElementById("ya-circle-progress-bar-cr") as HTMLDivElement;
    if (0 <= progress && progress <= 50) {
      const ldeg = 225 + (progress / 50) * 180;
      console.log("r", ldeg);
      cr.style.transform = "rotate(" + ldeg + "deg)";
      cl.style.transform = "rotate(135deg)";
    } else if (50 < progress && progress <= 100) {
      const ldeg = 135 + ((progress - 50) / 50) * 180;
      console.log("l", ldeg);
      cr.style.transform = "rotate(405deg)";
      cl.style.transform = "rotate(" + ldeg + "deg)";
    }

    const ratio = this.maxVal / this.colorList.length;
    for (let i = 0; i < this.colorList.length; i++) {
      const c = this.colorList[i];
      if (now <= ratio * i) {
        break;
      } else {
        cl.style.borderTop = "10px solid " + c;
        cl.style.borderLeft = "10px solid " + c;
        cr.style.borderTop = "10px solid " + c;
        cr.style.borderRight = "10px solid " + c;
      }
    }
  }

  /**
   * 銷燬
   */
  Dispose() {
    this.remove();
  }
}
