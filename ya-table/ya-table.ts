/**
 * 對話方塊（函式型）
 */
export default class YaTable extends HTMLElement {
  static control = "ya-table";
  curPage = "1";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${YaTable.control}.css`);
  }

  /**
   * 將某個物件視為本控制元件
   * @param {any} obj 本控制元件物件
   * @return {YaTable} 本控制元件物件
   */
  static f(obj: any): YaTable {
    return obj as YaTable;
  }

  // /**
  //  * 建構函式
  //  */
  constructor() {
    super();
  }

  /**
   * 顯示此對話方塊
   * @param {string[]} headData 标题
   * @param {string[][]} bodyData 数据
   * @param {string[]} navigationList 页标
   * @param {string} currentPage 默认页标
   * @param {(pageNumber: string) => void} jumpPage 点击页标执行的方法
   */
  init(
    headData: string[],
    bodyData: string[][],
    navigationList: string[],
    currentPage: string,
    jumpPage: (pageNumber: string) => void = () => null
  ) {
    this.curPage = currentPage;
    // headData = headData;
    // bodyData = bodyData;
    if (this.className.indexOf(YaTable.control) < 0) {
      this.className = YaTable.control + " " + this.className;
    }
    const tableDiv = document.createElement("div");

    tableDiv.className = YaTable.control + "-view";
    const table = document.createElement("table");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");

    tableDiv.appendChild(table);

    const navigationDiv = document.createElement("div");
    navigationDiv.className = "navigation";
    for (let i = 0; i < navigationList.length; i++) {
      const nav = navigationList[i];
      const navSpan = document.createElement("span");
      if (i == 0 || i + 1 == navigationList.length) {
        navSpan.style.fontWeight = "500";
      } else if (nav == this.curPage) {
        navSpan.className = "current";
      }
      navSpan.innerText = nav;
      navigationDiv.appendChild(navSpan);
    }
    tableDiv.appendChild(navigationDiv);

    this.appendChild(tableDiv);

    this.Update(headData, bodyData, currentPage);

    const spans = this.getElementsByTagName("span");
    for (const element of spans) {
      const span = element;
      span.onclick = () => {
        if (this.curPage != span.innerText) {
          for (const element of spans) {
            element.className = "";
          }
          span.className = "current";
          this.curPage = span.innerText;
          jumpPage(span.innerText);
        }
      };
    }
  }

  /**
   * 顯示此對話方塊
   * @param {string[]} headData 标题
   * @param {string[][]} bodyData 数据
   * @param {string} currentPage 当前页标
   */
  Update(headData: string[], bodyData: string[][], currentPage: string) {
    const tables = this.getElementsByTagName("table");
    for (const table of tables) {
      table.innerHTML = "";

      const headDatatr = document.createElement("tr");
      for (const h of headData) {
        const th = document.createElement("th");
        th.innerText = h;
        headDatatr.appendChild(th);
      }
      table.appendChild(headDatatr);

      const tbodyData = document.createElement("tbody");
      for (const btrData of bodyData) {
        const btr = document.createElement("tr");
        for (const btdData of btrData) {
          const td = document.createElement("td");
          td.innerText = btdData;
          btr.appendChild(td);
        }
        tbodyData.appendChild(btr);
      }
      table.appendChild(tbodyData);
    }
    const spans = this.getElementsByTagName("span");
    for (const span of spans) {
      if (span.innerText == currentPage) {
        this.curPage = span.innerText;
        span.className = "current";
      } else {
        span.className = "";
      }
    }
  }

  /**
   * 顯示此對話方塊
   * @param {string[]} navigationList 页标
   * @param {(pageNumber: string) => void} jumpPage 点击页标执行的方法
   */
  SetPageNumber(
    navigationList: string[],
    jumpPage: (pageNumber: string) => void = () => null
  ) {
    if (navigationList.length > 0) {
      const navigationDivs = this.getElementsByClassName("navigation");
      for (const navigationDiv of navigationDivs) {
        navigationDiv.innerHTML = "";
        for (let i = 0; i < navigationList.length; i++) {
          const nav = navigationList[i];
          const navSpan = document.createElement("span");
          if (i == 0 || i + 1 == navigationList.length) {
            navSpan.style.fontWeight = "500";
          } else if (nav == this.curPage) {
            navSpan.className = "current";
          }
          navSpan.innerText = nav;
          navigationDiv.appendChild(navSpan);
        }
      }

      const spans = this.getElementsByTagName("span");
      for (const span of spans) {
        span.onclick = () => {
          if (this.curPage != span.innerText) {
            for (const s of spans) {
              s.className = "";
            }
            span.className = "current";
            this.curPage = span.innerText;
            jumpPage(span.innerText);
          }
        };
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
