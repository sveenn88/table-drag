class Table {
  constructor(headers, body) {
    this.headers = headers; // ['', '', '', '']
    this.body = body; // [{}]
  }

  build() {

    let table = document.createElement("table");
    let thead = document.createElement("tr");
    thead.classList.add("table__header");
    let tbody = document.createElement("tbody");

    this.headers.forEach(x => {
      let th = document.createElement("th")
      th.innerHTML = x;
      thead.append(th);
    })

    table.appendChild(thead)

    this.body.forEach(x => {
      let tr = document.createElement("tr")
      tr.classList.add("table__body");
      tr
      for (let key in x) {
        let td = document.createElement("td");
        td.innerHTML = x[key];
        tr.append(td);
      }
      tbody.append(tr);
    })

    table.appendChild(tbody);
    return table;
  }

  pushTable(selector, data) {
    let parent = document.querySelector(selector);
    if (parent) {
      parent.appendChild(data);
    } else {
      throw "Table: #### Родитель не найден! Parent not found! ####";
    }
  }
}

class TableDrag extends Table {
  constructor(headers, body) {
    super(headers, body);

    this.dragRow = null;
    this.dragCell = null;

    this.flagRow = false;
    this.flagCell = false;

    this.startRow = null;
    this.currentRow = null;
    this.startCell = null;
    this.currentCell = null;

    this.rows = null
  }

  build() {
    let table = super.build();
    let thead = table.children[0];
    let tbody = table.children[1];

    for (let i = 0; i < thead.children.length; i++) {
      thead.children[i].setAttribute("draggable", true);
      thead.children[i].addEventListener(
        "dragstart",
        this._dragStartCell.bind(this),
        false
      );
      thead.children[i].addEventListener(
        "dragenter",
        this._dragEnterCell.bind(this),
        false
      );
      thead.children[i].addEventListener(
        "dragover",
        this._dragOver.bind(this),
        false
      );
      thead.children[i].addEventListener(
        "dragleave",
        this._dragLeaveCell.bind(this),
        false
      );
      thead.children[i].addEventListener("drop", this._drop.bind(this), false);
      thead.children[i].addEventListener("dragend", this._dragEndCell.bind(this), false);
    }

    for (let i = 0; i < tbody.children.length; i++) {
      tbody.children[i].setAttribute("draggable", true);
      tbody.children[i].addEventListener(
        "dragstart",
        this._dragStartRow.bind(this),
        false
      );
      tbody.children[i].addEventListener(
        "dragenter",
        this._dragEnterRow.bind(this),
        false
      );
      tbody.children[i].addEventListener(
        "dragover",
        this._dragOver.bind(this),
        false
      );
      tbody.children[i].addEventListener(
        "dragleave",
        this._dragLeaveRow.bind(this),
        false
      );
      tbody.children[i].addEventListener("drop", this._drop.bind(this), false);
      tbody.children[i].addEventListener(
        "dragend",
        this._dragEndRow.bind(this),
        false
      );
    }

    return table;
  }

  _dragStartRow(e) {
    this.dragRow = e.target;
    this.flagRow = false;
    this.startRow = this.dragRow.rowIndex;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  }

  _dragStartCell(e) {
    this.flagCell = false;
    this.dragCell = e.target;
    this.startCell = this.dragCell.cellIndex;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  }

  _dragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  _dragEnterRow(e) {
    if (this.dragRow) {
      e.target.parentNode.classList.add("overRow");
    }

    if (this.dragRow && this.dragRow !== e.target.parentNode && this.flagRow) {
      this.currentRow = e.target.parentNode.rowIndex;
      var table = e.target.parentNode.parentNode;
      if (this.currentRow < this.startRow) {
        table.insertBefore(this.dragRow, table.rows[this.currentRow - 1]);
      } else if (this.currentRow > this.startRow) {
        table.insertBefore(this.dragRow, table.rows[this.currentRow]);
      }
      this.startRow = this.currentRow;
    }
    this.flagRow = true;
  }

  _dragEnterCell(e) {
    if (this.dragCell) {
      e.target.classList.add("overCell");
    }

    if (this.dragCell && this.dragCell !== e.target && this.flagCell) {
      var rows = e.target.parentNode.parentNode.children[1].rows;
      this.currentCell = e.target.cellIndex;
      var table = e.target.parentNode;

      if (this.currentCell < this.dragCell.cellIndex) {
        table.insertBefore(this.dragCell, table.cells[this.currentCell]);
        for (let i = 0; i < rows.length; i++) {
          let col = rows[i].cells[this.dragCell.cellIndex + 1];
          rows[i].insertBefore(col, rows[i].cells[this.dragCell.cellIndex]);
        }
      } else if (this.currentCell >  this.dragCell.cellIndex) {
        table.insertBefore(table.cells[this.currentCell], this.dragCell);
        for (let i = 0; i < rows.length; i++) {
          let col = rows[i].cells[this.dragCell.cellIndex - 1];
          rows[i].insertBefore(rows[i].cells[this.dragCell.cellIndex], col);
        }
      }
      this.startRow = this.currentCell;
    }
    this.flagCell = true;
  }

  _dragLeaveRow(e) {
    e.target.parentNode.classList.remove("overRow");
  }

  _dragLeaveCell(e) {
    e.target.classList.remove("overCell");
  }

  _drop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    return false;
  }

  _dragEndRow(e) {
    e.target.classList.remove("overRow");
    this.dragRow = null;
  }

  _dragEndCell(e) {
    e.target.classList.remove("overCell");
    this.dragCell = null;
  }
}