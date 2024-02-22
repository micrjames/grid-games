import { Cell } from "./Cell.js";
export class Cells {
    constructor(num) {
        this.num = num;
        this._cells = document.createDocumentFragment();
    }
    set() {
        for (let i = 0; i < this.num; i++) {
            const cell = new Cell("cell", "covered");
            cell.add(this._cells);
        }
    }
    add(context) {
        context.appendChild(this._cells);
    }
    get cells() {
        return this._cells.children;
    }
}
