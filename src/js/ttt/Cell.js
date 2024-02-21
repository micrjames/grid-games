export class Cell {
    constructor(cellEl) {
        this._cell = cellEl;
        this._pos = {
            row: -1,
            col: -1
        };
    }
    handleClick(cb) {
        this._cell.addEventListener("click", () => {
            cb();
        }, { once: true });
    }
    get pos() {
        const pos = this._cell.dataset.pos;
        const splitPos = pos === null || pos === void 0 ? void 0 : pos.split("-");
        if (splitPos)
            this._pos = { row: +splitPos[0], col: +splitPos[1] };
        return this._pos;
    }
    set pos(pos) {
        this._pos = pos;
    }
    get cell() {
        return this._cell;
    }
}
