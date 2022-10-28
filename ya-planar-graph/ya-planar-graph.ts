/**
 * 對話方塊（函式型）
 */
export default class PlanarGraph extends HTMLElement {
  static control = "ya-planar-graph";
  pointName: (number | null)[] = [];
  pointPositionList: (number[][] | null)[] = [];
  index = 1;

  /**
   * 加载所需的样式等其他文件
   * 該函式由 YAUI 類呼叫，無需手工執行
   */
  static loadFile() {
    require(`./${PlanarGraph.control}.css`);
  }

  // /**
  //  * 建構函式
  //  */
  constructor() {
    super();
    this.init();
  }

  /**
   * 顯示此對話方塊
   */
  init() {
    this.className = PlanarGraph.control;
    const width = this.getAttribute("width");
    if (width != null) {
      if (width.split("%").length == 1) {
        this.style.width = width + "px";
      } else {
        this.style.width = width;
      }
    }
    const height = this.getAttribute("height");
    if (height != null) {
      if (height.split("%").length == 1) {
        this.style.height = height + "px";
      } else {
        this.style.height = height;
      }
    }
    const src = this.getAttribute("src");
    if (src != null && src != "") {
      this.style.background = "url(" + src + ")";
    }
    const isShowMode = this.getAttribute("show");
    if (
      !(
        isShowMode != null &&
        (isShowMode == "true" || isShowMode == "1" || isShowMode == "")
      )
    ) {
      const pGVMenu = document.createElement("div");
      pGVMenu.id = "pGVMenu";
      pGVMenu.style.display = "none";
      pGVMenu.innerHTML = '<div class="pGVMItem">删除标点</div>';
      document.body.appendChild(pGVMenu);
      // const pGVMenu = document.getElementById("pGVMenu");

      let delI = 0;
      this.onclick = (e) => {
        pGVMenu.style.display = "none";
        const xW = e.clientX / this.offsetWidth;
        const yH = e.clientY / this.offsetHeight;
        for (let i = 0; i < this.pointPositionList.length; i++) {
          const pPL = this.pointPositionList[i];
          if (pPL == null) {
            this.index = i + 1;
            break;
          } else if (i + 1 == this.pointPositionList.length) {
            this.index = i + 2;
          }
        }
        const point = document.createElement("div");
        point.className = "position";
        point.innerText = this.index.toString();
        point.style.left = xW * this.offsetWidth - 12 + "px";
        point.style.top = yH * this.offsetHeight - 12 + "px";
        const clientList = [
          [this.offsetWidth, this.offsetHeight],
          [e.clientX, e.clientY],
          [xW, yH],
        ];
        if (this.index > this.pointPositionList.length) {
          this.pointPositionList.push(clientList);
          this.pointName.push(this.index);
        } else {
          this.pointPositionList[this.index - 1] = clientList;
          this.pointName[this.index - 1] = this.index;
        }
        this.appendChild(point);
        this.index++;
        point.onclick = (pe) => {
          try {
            delI = Number(point.innerText) - 1;
            pGVMenu.style.display = "block";
            const delV = this.pointPositionList[delI];
            if (delV != null) {
              if (delV[1][0] + pGVMenu.offsetWidth > this.offsetWidth) {
                pGVMenu.style.left = delV[1][0] - pGVMenu.offsetWidth + "px";
              } else {
                pGVMenu.style.left = delV[1][0] + "px";
              }
              if (delV[1][1] + pGVMenu.offsetHeight > this.offsetHeight) {
                pGVMenu.style.top = delV[1][1] - pGVMenu.offsetHeight + "px";
              } else {
                pGVMenu.style.top = delV[1][1] + "px";
              }
            }
          } catch (error) {
            delI = 0;
          }
          pe.stopPropagation();
        };
      };

      const pGVMItems = pGVMenu.getElementsByClassName(
        "pGVMItem"
      ) as HTMLCollectionOf<HTMLDivElement>;
      if (pGVMItems != null) {
        for (let i = 0; i < pGVMItems.length; i++) {
          const pGVMItem: HTMLDivElement = pGVMItems[i];
          if (pGVMItem.innerText == "删除标点") {
            pGVMItem.onclick = (e) => {
              this.pointPositionList[delI] = null;
              this.pointName[delI] = null;
              pGVMenu.style.display = "none";
              const positions = this.getElementsByClassName(
                "position"
              ) as HTMLCollectionOf<HTMLDivElement>;
              for (let pi = 0; pi < positions.length; pi++) {
                const position: HTMLDivElement = positions[pi];
                //console.log("##", position.innerText, (delI + 1).toString(), position.innerText == (delI + 1).toString())
                if (position.innerText == (delI + 1).toString()) {
                  position.remove();
                  break;
                }
              }

              e.stopPropagation();
            };
            break;
          }
        }
      }
    }
  }

  /**
   * 顯示此對話方塊https://www.mytongdy.com/observer/client/#/project/231/private
   */
  show(option: yaPointDataOption[]) {
    const isShowMode = this.getAttribute("show");
    if (
      isShowMode != null &&
      (isShowMode == "true" || isShowMode == "1" || isShowMode == "")
    ) {
      option.forEach((e: yaPointDataOption) => {
        const point: HTMLDivElement = document.createElement("div");
        point.id = "point" + e.monitorID;
        point.className = "position";
        point.innerText = e.chartMonitorID.toString();
        point.style.left = e.pointXPercent * this.offsetWidth - 12 + "px";
        point.style.top = e.pointYPercent * this.offsetHeight - 12 + "px";
        this.appendChild(point);
      });
    }
  }

  setBackGround(bg: string) {
    const temp = bg.split("://");
    if (temp.length >= 2) {
      this.style.backgroundImage = "url(" + bg + ")";
    } else {
      this.style.background = bg;
    }
  }

  /**
   * 清除画板
   */
  Clear() {
    this.index = 1;
    this.pointName = [];
    this.pointPositionList = [];
    this.innerHTML = "";
  }
  /**
   * 銷燬
   */
  Dispose() {
    this.pointName = [];
    this.pointPositionList = [];
    this.remove();
  }
}
interface yaPointDataOption {
  projectID: number;
  chartMonitorID: string | number;
  monitorID: number;
  width: number;
  height: number;
  pointX: number;
  pointY: number;
  pointXPercent: number;
  pointYPercent: number;
}
