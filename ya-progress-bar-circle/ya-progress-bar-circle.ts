/**
 * 對話方塊（函式型）
 */
export default class CircleProgressBar extends HTMLElement {
  static control = "ya-progress-bar-circle";
  private maxVal = 0;
  private colorList: string[] = [];
  private showValue = true;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${CircleProgressBar.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {CircleProgressBar} 本控制元件物件
   */
  static f(obj: any): CircleProgressBar {
    return obj as CircleProgressBar;
  }

  // /**
  //  * 建構函式
  //  */
  constructor() {
    super();
    const colors: string | null = this.getAttribute("colors");
  }

  /**
   * 更新配置
   * @param {number} value 當前值
   * @param {number} maxVal 最大值
   * @param {string} colors 階段顏色值（平均分配刻度）
   * 支援的格式示例：
   * `#F00` 顯示為紅色
   * `50:#F00` 當百分比大於等於 50 時顯示為紅色
   * `0:#0F0;50:#00F;100:#F00` 當百分比大於等於 0 時，顯示為綠色；當百分比大於等於 50 時，顯示為藍色；當百分比大於等於 100 時，顯示為紅色
   * `#0F0;50:#00F;100:#F00` 同上，初始值可只寫顏色。
   * @param {number} numShow 顯示小數位數。-1 為不顯示，0 為整數，1 為一位小數，2 為兩位小數，以此類推。
   * @param {string} text 要在圓環中顯示的文字。將覆蓋 numShow 設定。
   * @return {number} 進度百分比
   */
  update(
    value: number,
    maxVal: number,
    colors: string,
    numShow = 1,
    text = ""
  ): number {
    this.setAttribute("value", value.toString());
    this.setAttribute("maxVal", maxVal.toString());
    this.setAttribute("colors", colors);
    this.setAttribute("numShow", numShow.toString());
    if (value > maxVal) {
      maxVal = value;
    }
    this.className = YaProgressBarCircle.control;

    const dleftClass = YaProgressBarCircle.control + "-left";
    const dlefts = this.getElementsByClassName(dleftClass);
    if (dlefts.length == 0) {
      const dleft = document.createElement("div");
      dleft.className = dleftClass;
      const leftCircle = document.createElement("div");
      leftCircle.className = `${YaProgressBarCircle.control}-circle ${YaProgressBarCircle.control}-cl`;
      dleft.appendChild(leftCircle);
      this.appendChild(dleft);
    }

    const drightClass = YaProgressBarCircle.control + "-right";
    const drights = this.getElementsByClassName(drightClass);
    if (drights.length == 0) {
      const dright = document.createElement("div");
      dright.className = drightClass;
      const rightCircle = document.createElement("div");
      rightCircle.className = `${YaProgressBarCircle.control}-circle ${YaProgressBarCircle.control}-cr`;
      dright.appendChild(rightCircle);
      this.appendChild(dright);
    }

    this.numShow = numShow;
    this.maxVal = maxVal;
    this.colors = colors;
    return this.setProgress(value, text);
  }

  /**
   * 顯示此對話方塊
   * @param {number} now 当前值
   */
  SetProgress(now: number) {
    if (this.showValue) {
      const progressNumber = document.getElementById(
        "ya-progress-bar-circle-progress-number"
      ) as HTMLDivElement | null;
      if (progressNumber != null) {
        progressNumber.innerText = ((now / this.maxVal) * 100).toFixed(1);
      }
    }
    const progress = (now / this.maxVal) * 100;
    const cl = document.getElementById(
      "ya-progress-bar-circle-cl"
    ) as HTMLDivElement;
    const cr = document.getElementById(
      "ya-progress-bar-circle-cr"
    ) as HTMLDivElement;
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
