"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTT = void 0;
var Matrix = /** @class */ (function () {
    function Matrix(N) {
        this.N = N;
        this.clear();
    }
    Matrix.fromArray = function (array) {
        var N = array.length;
        var arrMat = new Matrix(N);
        arrMat._mat = array;
        return arrMat;
    };
    Matrix.prototype.set = function () {
        for (var i = 0; i < this.N; i++) {
            this._mat = __spreadArray(__spreadArray([], this._mat, true), [Array(this.N).fill(0)], false);
        }
    };
    Matrix.prototype.clear = function () {
        this._mat = [];
        this.set();
    };
    Object.defineProperty(Matrix.prototype, "size", {
        get: function () {
            return this.N;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "mat", {
        get: function () {
            return this._mat;
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.setElement = function (val, j, i) {
        this._mat[j][i] = val;
    };
    Matrix.prototype.getElement = function (j, i) {
        return this._mat[j][i];
    };
    Matrix.prototype.setRow = function (val, which) {
        this._mat[which] = val;
    };
    Matrix.prototype.getRow = function (which) {
        return this._mat.filter(function (_, index) { return index == which; }).flat();
    };
    Matrix.prototype.getCol = function (which) {
        return this._mat.map(function (row) { return row[which]; });
    };
    Matrix.prototype.getDiagonal = function (k) {
        var diagonal = [];
        var pivot = Math.abs(k);
        if (k >= 0) {
            for (var rowIndex = 0; rowIndex < this.N; rowIndex++) {
                for (var colIndex = 0; colIndex < this.N; colIndex++) {
                    if (colIndex == pivot) {
                        pivot++;
                        diagonal = __spreadArray(__spreadArray([], diagonal, true), [this._mat[rowIndex][colIndex]], false);
                        break;
                    }
                }
            }
        }
        else {
            for (var colIndex = 0; colIndex < this.N; colIndex++) {
                for (var rowIndex = 0; rowIndex < this.N; rowIndex++) {
                    if (rowIndex == pivot) {
                        pivot++;
                        diagonal = __spreadArray(__spreadArray([], diagonal, true), [this._mat[rowIndex][colIndex]], false);
                        break;
                    }
                }
            }
        }
        return diagonal;
    };
    Matrix.prototype.getCounterDiagonal = function (k) {
        var counterMatrix = new Matrix(this.N);
        this._mat.forEach(function (row, index) {
            var revRow = row.reduce(function (acc, item) { return [item].concat(acc); }, []);
            counterMatrix.setRow(revRow, index);
        });
        var reverseCounterDiagonal = counterMatrix.getDiagonal(k);
        var counterDiagonal = reverseCounterDiagonal.reverse();
        return counterDiagonal;
    };
    Object.defineProperty(Matrix.prototype, "main_diagonal", {
        get: function () {
            return this.getDiagonal(0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "main_counterDiagonal", {
        get: function () {
            return this.getCounterDiagonal(0);
        },
        enumerable: false,
        configurable: true
    });
    Matrix.prototype.transpose = function () {
        var tMat = new Matrix(this.N);
        for (var j = 0; j < this.N; j++) {
            for (var i = 0; i < this.N; i++) {
                tMat.mat[j][i] = this._mat[i][j];
            }
        }
        return tMat;
    };
    Matrix.prototype.add = function (thatMat) {
        var addedArray = this._mat.map(function (row, rowIndex) {
            return row.map(function (el, elIndex) {
                return el + thatMat.mat[rowIndex][elIndex];
            });
        });
        return Matrix.fromArray(addedArray);
    };
    Matrix.prototype.multiply = function (thatMat) {
        var _this = this;
        var multArray = this._mat.map(function (row, rowIndex) { return row.map(function (_, colIndex) {
            var row = _this.getRow(rowIndex);
            var col = thatMat.getCol(colIndex);
            return row.reduce(function (accumulator, currentValue, currentIndex) {
                return currentValue * col[currentIndex] + accumulator;
            }, 0);
        }); });
        return Matrix.fromArray(multArray);
    };
    Matrix.prototype.multiply_scalar = function (scalar) {
        return Matrix.fromArray(this._mat.map(function (row) { return row.map(function (el) { return scalar * el; }); }));
    };
    Matrix.prototype.toString = function () {
        var _this = this;
        var mstring = '';
        this._mat.forEach(function (row, rowIndex) {
            mstring += '[\t';
            row.forEach(function (_, colIndex) {
                mstring += _this._mat[rowIndex][colIndex] + '\t';
            });
            mstring += ']\n';
        });
        return mstring;
    };
    return Matrix;
}());
var Cell = /** @class */ (function () {
    function Cell(cellEl) {
        this._cell = cellEl;
        this._pos = {
            row: -1,
            col: -1
        };
    }
    Cell.prototype.handleClick = function (cb) {
        this._cell.addEventListener("click", function () {
            cb();
        }, { once: true });
    };
    Object.defineProperty(Cell.prototype, "pos", {
        get: function () {
            var pos = this._cell.dataset.pos;
            var splitPos = pos.split("-");
            this._pos = { row: +splitPos[0], col: +splitPos[1] };
            return this._pos;
        },
        set: function (pos) {
            this._pos = pos;
        },
        enumerable: false,
        configurable: true
    });
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
        this.MAT = {
            X: new Matrix(3),
            CIRCLE: new Matrix(3)
        };
        this.start();
    }
    TTT.prototype.setMarks = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1.cells[i].handleClick(function () {
                var currentClass = _this.circleTurn ? _this.CLASS.CIRCLE : _this.CLASS.X;
                _this.cells[i].pos = _this.cells[i].pos;
                console.log(_this.cells[i].pos);
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
                this.MAT.CIRCLE.setElement(1, this.cells[which].pos.row, this.cells[which].pos.col);
                break;
            case this.CLASS.X:
                this.MAT.X.setElement(1, this.cells[which].pos.row, this.cells[which].pos.col);
                break;
        }
        console.log(this.MAT.X.toString());
        console.log(this.MAT.CIRCLE.toString());
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
