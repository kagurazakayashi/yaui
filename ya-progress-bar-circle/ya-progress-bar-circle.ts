/**
 * 對話方塊（函式型）
 */
 export default class YaProgressBarCircle extends HTMLElement {
  static control = "ya-progress-bar-circle";
  private maxVal = 0;
  private colors = "";
  private numShow = -1;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaProgressBarCircle.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaProgressBarCircle} 本控制元件物件
   */
  static f(obj: any): YaProgressBarCircle {
    return obj as YaProgressBarCircle;
  }

  // /**
  //  * 建構函式
  //  */
  constructor() {
    super();
    const value: string | null = this.getAttribute("value");
    const maxVal: string | null = this.getAttribute("maxVal");
    const colors: string | null = this.getAttribute("colors");
    const numShow: string | null = this.getAttribute("numShow");
    const text: string | null = this.getAttribute("text");
    this.update(
      parseInt(value ?? "0"),
      parseInt(maxVal ?? "100"),
      colors ?? "#skyblue",
      parseInt(numShow ?? "1"),
      text ?? ""
    );
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
   * 更新進度值
   * @param {number} now 當前值
   * @return {number} 進度百分比
   */
  setProgress(now: number, text = ""): number {
    const progress: number = (now / this.maxVal) * 100;
    const progressNumbers: HTMLCollectionOf<Element> =
      this.getElementsByClassName(
        YaProgressBarCircle.control + "-progress-number"
      );
    let progressNumber: HTMLDivElement;
    if (this.numShow > -1 || text.length > 0) {
      if (progressNumbers.length == 0) {
        progressNumber = document.createElement("div");
        progressNumber.className =
          YaProgressBarCircle.control + "-progress-number";
        this.appendChild(progressNumber);
      } else {
        progressNumber = progressNumbers[0] as HTMLDivElement;
      }
      if (text.length > 0) {
        progressNumber.innerText = text;
      } else {
        progressNumber.innerText =
          progress < 100 ? progress.toFixed(this.numShow) : "100";
      }
    } else if (progressNumbers.length > 0) {
      for (const key in progressNumbers) {
        if (Object.prototype.hasOwnProperty.call(progressNumbers, key)) {
          const element = progressNumbers[key];
          this.removeChild(element);
        }
      }
    }
    const cls = this.getElementsByClassName(
      YaProgressBarCircle.control + "-cl"
    );
    const crs = this.getElementsByClassName(
      YaProgressBarCircle.control + "-cr"
    );
    const cl: HTMLDivElement = cls[0] as HTMLDivElement;
    const cr: HTMLDivElement = crs[0] as HTMLDivElement;
    if (0 <= progress && progress <= 50) {
      const ldeg = 225 + (progress / 50) * 180;
      cr.style.transform = "rotate(" + ldeg + "deg)";
      cl.style.transform = "rotate(135deg)";
    } else if (50 < progress && progress <= 100) {
      const ldeg = 135 + ((progress - 50) / 50) * 180;
      cr.style.transform = "rotate(405deg)";
      cl.style.transform = "rotate(" + ldeg + "deg)";
    }
    const colorList = this.colors.split(";");
    const ratio = this.maxVal / colorList.length;
    for (let i = 0; i < colorList.length; i++) {
      const color: string = colorList[i];
      if (color.length == 0) continue;
      const colorInfo: string[] = color.split(":");
      let r: number = ratio * i;
      let c = "";
      if (colorInfo.length == 1) {
        c = colorInfo[0];
      } else if (colorInfo.length == 2) {
        if (colorInfo[0].length > 0) {
          r = parseInt(colorInfo[0]);
        }
        c = colorInfo[1];
      }
      if (now < r) {
        break;
      } else {
        const pSize: string = "10px solid " + c;
        cl.style.borderTop = pSize;
        cl.style.borderLeft = pSize;
        cr.style.borderTop = pSize;
        cr.style.borderRight = pSize;
      }
    }
    return progress;
  }

  /**
   * 銷燬
   */
  Dispose() {
    this.remove();
  }
}
