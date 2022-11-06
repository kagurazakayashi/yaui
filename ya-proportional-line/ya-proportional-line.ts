export default class YaProportionalLine extends HTMLElement {
  static control = "ya-proportional-line";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaProportionalLine.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaView} 本控制元件物件
   */
  static f(obj: any): YaProportionalLine {
    return obj as YaProportionalLine;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className = YaProportionalLine.control + " " + this.className;
    // const style: CSSStyleDeclaration = window.getComputedStyle(this);
    // console.log("this.clientHeight", this.clientHeight);
    const val = this.getAttribute("value");
    this.update(val ?? "");
  }

  /**
   * 更新進度顯示。
   * @param val 描述進度的字串，支援的格式：
   * 進度條顯示模式:
   * `100` 當前值（例如 max 值為 200，則會顯示為 50%）
   * `100:#0F0` 當前值:顏色
   * 條形圖表顯示模式:
   * `100:#0F0;100:#F00` 例如 max 值為 200 時，前 50% 為綠色，後 50% 為紅色。
   * `10:#0F0;70:#F00;20:#F00` 例如 max 值為 100 時，前 10% 為綠色，中間 70% 為藍色，後 20% 為紅色。
   * `10:#0F0;70:#F00;:#F00` 同上，最後一部分的值可以省略，省略時預設為填充剩餘的部分。
   * 以上顏色部分也可以省略，省略則預設天藍色。
   */
  update(val: string, defaultColor = "skyblue") {
    const max = parseInt(this.getAttribute("max") ?? "100");
    const items: string[] = val.split(";");
    let left = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const infos: string[] = item.split(":");
      let width;
      if (infos[0].length > 0) {
        width = (parseInt(infos[0]) / max) * 100;
      } else {
        width = 100 - left;
      }
      const color: string =
        infos.length > 1 && infos[1].length > 0 ? infos[1] : defaultColor;
      const spanClass = `${YaProportionalLine.control}-item ${YaProportionalLine.control}-item-${i}`;
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
      span.style.backgroundColor = color;
    }
  }

  waitAni() {
    const span = document.createElement("span");
    this.appendChild(span);
    span.className = `${YaProportionalLine.control}-wait`;
  }
}
