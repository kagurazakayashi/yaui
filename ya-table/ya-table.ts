/**
 * 對話方塊（函式型）
 */
export default class Table extends HTMLElement {
  static control = "ya-table";
  curPage = "1";

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${Table.control}.css`);
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
    this.className = Table.control;
    const tableDiv = document.createElement("div");

    tableDiv.className = Table.control + "-view";
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
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      span.onclick = () => {
        if (this.curPage != span.innerText) {
          for (let i = 0; i < spans.length; i++) {
            const s = spans[i];
            s.className = "";
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
    for (let ti = 0; ti < tables.length; ti++) {
      const table = tables[ti];
      table.innerHTML = "";

      const headDatatr = document.createElement("tr");
      for (let i = 0; i < headData.length; i++) {
        const h = headData[i];
        const th = document.createElement("th");
        th.innerText = h;
        headDatatr.appendChild(th);
      }
      table.appendChild(headDatatr);

      const tbodyData = document.createElement("tbody");
      for (let i = 0; i < bodyData.length; i++) {
        const btrData = bodyData[i];
        const btr = document.createElement("tr");
        for (let j = 0; j < btrData.length; j++) {
          const btdData = btrData[j];
          const td = document.createElement("td");
          td.innerText = btdData;
          btr.appendChild(td);
        }
        tbodyData.appendChild(btr);
      }
      table.appendChild(tbodyData);
    }
    const spans = this.getElementsByTagName("span");
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
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
      console.log(navigationList);
      const navigationDivs = this.getElementsByClassName("navigation");
      console.log(navigationDivs);
      for (let nDi = 0; nDi < navigationDivs.length; nDi++) {
        const navigationDiv = navigationDivs[nDi];
        console.log(navigationDiv);
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
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        span.onclick = () => {
          if (this.curPage != span.innerText) {
            for (let i = 0; i < spans.length; i++) {
              const s = spans[i];
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
