"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTT = void 0;
var Cell = /** @class */ (function () {
    function Cell(cellEl) {
        this._cell = cellEl;
    }
    Cell.prototype.handleClick = function (cb) {
        this._cell.addEventListener("click", function () {
            cb();
        }, { once: true });
    };
    Object.defineProperty(Cell.prototype, "cell", {
        get: function () {
            return this._cell;
        },
        enumerable: false,
        configurable: true
    });
    return Cell;
}());
var TTT = /** @class */ (function () {
    function TTT(board) {
        this.cells = [];
        this.circleTurn = true;
        this.gameOver = false;
        this._board = board;
        this.cellEls = board.children;
        for (var i = 0; i < this.cellEls.length; i++) {
            this.cells.push(new Cell(this.cellEls[i]));
        }
        this.CLASS = {
            X: "x",
            CIRCLE: "circle"
        };
        this.start();
    }
    TTT.prototype.setMarks = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.cells[i].handleClick(function () {
                var currentClass = _this.circleTurn ? _this.CLASS.CIRCLE : _this.CLASS.X;
                // const pos = getPos(cell);
                if (!_this.gameOver)
                    _this.setMark(i, currentClass);
                // if(checkWin(mat, currentClass, pos)) {
                // 	const titledClass = titleClass(currentClass));
                // 	gameOver = endGame(`${titledClass} wins!`, gameOver);
                //  } else if(checkDraw(mat))
                //  gameOver = endGame("There is a draw!", gameover);
                if (!_this.gameOver) {
                    _this.circleTurn = !_this.circleTurn;
                    _this.setBoardHoverClass();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.cells.length; i++) {
            _loop_1(i);
        }
    };
    TTT.prototype.setMark = function (which, className) {
        switch (className) {
            case this.CLASS.CIRCLE:
                // mat.circle.setElement(1, pos.row, pos.col);
                break;
            case this.CLASS.X:
                // mat.x.setElement(1, pos.row, pos.col);
                break;
        }
        this.cells[which].cell.classList.add(className);
    };
    TTT.prototype.setup = function () {
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i].cell.classList.contains(this.CLASS.X))
                this.cells[i].cell.classList.remove(this.CLASS.X);
            else if (this.cells[i].cell.classList.contains(this.CLASS.CIRCLE))
                this.cells[i].cell.classList.remove(this.CLASS.CIRCLE);
        }
        // toggleUIEls(false);
    };
    TTT.prototype.setBoardHoverClass = function () {
        this._board.classList.remove(this.CLASS.X);
        this._board.classList.remove(this.CLASS.CIRCLE);
        if (this.circleTurn)
            this._board.classList.add(this.CLASS.CIRCLE);
        else
            this._board.classList.add(this.CLASS.X);
    };
    TTT.prototype.start = function () {
        this.setup();
        this.setBoardHoverClass();
    };
    TTT.prototype.reset = function () {
        this.setup();
        // mat.circle.clear();
        // mat.x.clear();
        this.gameOver = false;
    };
    TTT.prototype.endGame = function (msg, gameOver) {
        // gameOver = true;
        // winningMessageText.textContent = msg;
        // toggleUIEls(gameOver);
    };
    ;
    return TTT;
}());
exports.TTT = TTT;
