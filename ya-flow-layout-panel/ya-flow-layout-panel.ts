/**
 * 卡片列表佈局面板
 */

// 內容框架
export class YaFlowLayoutPanelContent extends HTMLElement {
  static control = "ya-flow-layout-panel-content";
}

// 卡片列表佈局面板
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
    if (this.className.indexOf(YaFlowLayoutPanel.control) < 0) {
      this.className = YaFlowLayoutPanel.control + " " + this.className;
    }
    this.resize();
  }

  resize(box: YaFlowLayoutPanelContent | null = null) {
    if (box == null) {
      const boxs: HTMLCollectionOf<Element> = this.getElementsByTagName(
        YaFlowLayoutPanelContent.control
      );
      if (boxs.length > 0) {
        box = boxs[0] as YaFlowLayoutPanelContent;
      } else {
        box = document.createElement(YaFlowLayoutPanelContent.control);
        box.innerHTML = this.innerHTML;
        this.innerHTML = "";
        this.appendChild(box);
      }
      box.className = YaFlowLayoutPanelContent.control;
    }
    const firstElement: Element | null = box.firstElementChild;
    if (firstElement != null) {
      const firstElementStyle = window.getComputedStyle(firstElement);
      const width: number =
        parseFloat(firstElementStyle.width) +
        parseFloat(firstElementStyle.marginLeft) +
        parseFloat(firstElementStyle.marginRight) +
        parseFloat(firstElementStyle.paddingLeft) +
        parseFloat(firstElementStyle.paddingRight);
      box.style.gridTemplateColumns = `repeat(auto-fill, ${width}px)`;
    }
  }
}
