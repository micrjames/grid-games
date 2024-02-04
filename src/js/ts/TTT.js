"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTT = void 0;
var Cell = /** @class */ (function () {
    function Cell(cellEl, cb) {
        this.cell = cellEl;
        this.cell.addEventListener("click", function () {
            cb();
        });
    }
    return Cell;
}());
var TTT = /** @class */ (function () {
    function TTT(board) {
        this.circleTurn = true;
        this._board = board;
        this.cellEls = board.children;
        this.CLASS = {
            X: "x",
            CIRCLE: "circle"
        };
        this._board.classList.add("circle");
    }
    TTT.prototype.setMarks = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var cell = new Cell(this_1.cellEls[i], function () {
                var currentClass = _this.circleTurn ? _this.CLASS.CIRCLE : _this.CLASS.X;
                _this.cellEls[i].classList.add(currentClass);
                _this.circleTurn = !_this.circleTurn;
                _this._board.classList.remove(_this.CLASS.X);
                _this._board.classList.remove(_this.CLASS.CIRCLE);
                if (_this.circleTurn)
                    _this._board.classList.add(_this.CLASS.CIRCLE);
                else
                    _this._board.classList.add(_this.CLASS.X);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.cellEls.length; i++) {
            _loop_1(i);
        }
    };
    return TTT;
}());
exports.TTT = TTT;
