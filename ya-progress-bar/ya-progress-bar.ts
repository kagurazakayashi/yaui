/**
 * 進度條和條形結構圖顯示控制元件
 */
export default class YaProgressBar extends HTMLElement {
  static control = "ya-progress-bar";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaProgressBar.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaView} 本控制元件物件
   */
  static f(obj: any): YaProgressBar {
    return obj as YaProgressBar;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    if (this.className.indexOf(YaProgressBar.control) < 0) {
      this.className = YaProgressBar.control + " " + this.className;
    }
    const val: string | null = this.getAttribute("values") ?? null;
    const max: number = parseInt(this.getAttribute("max") ?? "100");
    const color: string = this.getAttribute("colors") ?? "skyblue";
    this.update(val, max, color);
  }

  /**
   * 更新進度顯示。
   * @param {string|number|null} values 描述進度的字串，支援的格式：
   * - 進度條顯示模式:
   * `100` 當前值（不是當前百分比，可以為數字型別。例如 max 值為 200，則會顯示為 50%）
   * `100:#0F0` 當前值:顏色
   * - 條形圖表顯示模式:
   * `100:#0F0;100:#F00` 例如 max 值為 200 時，前 50% 為綠色，後 50% 為紅色。
   * `10:#0F0;70:#F00;20:#F00` 例如 max 值為 100 時，前 10% 為綠色，中間 70% 為藍色，後 20% 為紅色。
   * `10:#0F0;70:#F00;:#F00` 同上，最後一部分的值可以省略，省略時預設為填充剩餘的部分。
   * 以上顏色部分也可以省略，省略則預設天藍色。
   * @param {number} maxVal 最大值（不是百分比）
   * @param {string} colors 在進度條顯示模式下，指定當到達每個值時的進度條整體顏色。支援的格式：
   * - 指定預設顏色模式:
   * `#F00` 當 values 中沒有指定顏色時，採用紅色作為進度條顏色。
   * - 自動根據值切換顏色模式:
   * `0:#F00;50:#0F0;100:#00F` 當值為 0 時，採用紅色；當值為 50 時，採用綠色；當值為 100 時，採用藍色。
   * 注意：該模式下，values 必須為數字（或數字字串）。
   * 注意：如果 values 和 colors 都沒提供顏色值時，可以從 CSS 中指定顏色值。
   * @return {number[]} 每個值的百分比
   */
  update(
    values: string | number | null = null,
    maxVal = 100,
    colors = ""
  ): number[] {
    this.setAttribute("values", values?.toString() ?? "");
    this.setAttribute("max", maxVal.toString());
    this.setAttribute("colors", colors);
    const percentages: number[] = [];
    if (values === null) {
      this.waitAni();
      return percentages;
    } else {
      this.waitAni(false);
    }
    let defaultColor = colors;
    if (colors.length > 0) {
      const colorItems: string[] = colors.toString().split(";");
      if (colorItems.length > 1) {
        const nVal: number =
          typeof values === "string" ? parseInt(values) : values;
        for (const colorItem of colorItems) {
          const colorInfo: string[] = colorItem.split(":");
          const minVal: number = parseInt(colorInfo[0]);
          const nColor: string = colorInfo[1];
          if (nVal > minVal) {
            defaultColor = nColor;
          }
        }
      }
    }
    const items: string[] = values.toString().split(";");
    let left = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const infos: string[] = item.split(":");
      let width;
      if (infos[0].length > 0) {
        width = (parseInt(infos[0]) / maxVal) * 100;
      } else {
        width = 100 - left;
      }
      const color: string =
        infos.length > 1 && infos[1].length > 0 ? infos[1] : defaultColor;
      const spanClass = `${YaProgressBar.control}-item ${YaProgressBar.control}-item-${i}`;
      const spans: HTMLCollectionOf<Element> =
        this.getElementsByClassName(spanClass);
      let span: HTMLSpanElement;
      if (spans.length > 0) {
        span = spans[0] as HTMLSpanElement;
      } else {
        span = document.createElement("span");
        span.className = spanClass;
        this.appendChild(span);
      }
      span.style.left = left.toString() + "%";
      left += width;
      span.style.width = width.toString() + "%";
      percentages.push(width);
      if (color.length > 0) {
        span.style.backgroundColor = color;
      }
    }
    return percentages;
  }

  /**
   * 建立等待條形動畫
   * @param {boolean} isVisible 是否以等待動畫模式顯示
   * @return {boolean} 是否之前已經建立等待動畫模式
   */
  waitAni(isVisible = true): boolean {
    const nClass = `${YaProgressBar.control}-wait`;
    const waits: HTMLCollectionOf<Element> =
      this.getElementsByClassName(nClass);
    if (waits.length > 0) {
      // wait = waits[0] as HTMLSpanElement;
      if (!isVisible) {
        for (const key in waits) {
          if (Object.prototype.hasOwnProperty.call(waits, key)) {
            const rmWaits = waits[key];
            rmWaits.remove();
          }
        }
      }
      return true;
    } else if (isVisible) {
      const wait: HTMLSpanElement = document.createElement("span");
      wait.className = nClass;
      this.appendChild(wait);
    }
    return false;
  }
}
