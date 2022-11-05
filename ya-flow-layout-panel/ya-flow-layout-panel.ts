export default class YaFlowLayoutPanel extends HTMLElement {
  static control = "ya-flow-layout-panel";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaFlowLayoutPanel.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaFlowLayoutPanel} 本控制元件物件
   */
  static f(obj: any): YaFlowLayoutPanel {
    return obj as YaFlowLayoutPanel;
  }

  /**
   * 對該控制元件的 UI 和行為進行準備工作
   */
  constructor() {
    super();
    this.className = YaFlowLayoutPanel.control + " " + this.className;
    this.resize();
  }

  resize(box: HTMLDivElement | null = null) {
    if (box == null) {
      const boxs: HTMLCollectionOf<Element> = this.getElementsByClassName(
        YaFlowLayoutPanel.control + "-content"
      );
      if (boxs.length > 0) {
        box = boxs[0] as HTMLDivElement;
      } else {
        box = document.createElement("div");
        box.className = YaFlowLayoutPanel.control + "-content";
        box.innerHTML = this.innerHTML;
        this.innerHTML = "";
        this.appendChild(box);
      }
    }
    const firstElement: Element | null = box.firstElementChild;
    if (firstElement != null) {
      const firstElementStyle = window.getComputedStyle(firstElement);
      box.style.gridTemplateColumns = `repeat(auto-fill, ${firstElementStyle.width})`;
    }
  }
}
