var Cell = /** @class */ (function () {
    function Cell(cellEl, cb) {
        this.cell = cellEl;
        this.cell.addEventListener("click", function () {
            cb();
        });
    }
    return Cell;
}());
exports.Cell = Cell;
