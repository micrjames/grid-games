"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MS = exports.Countdown = void 0;
var Random = /** @class */ (function () {
    function Random(minimum, maximum) {
        if (minimum === void 0) { minimum = -1; }
        if (maximum === void 0) { maximum = -1; }
        this.minimum = minimum;
        this.maximum = maximum;
    }
    Object.defineProperty(Random.prototype, "min", {
        get: function () {
            return this.minimum;
        },
        set: function (value) {
            this.minimum = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "max", {
        get: function () {
            return this.maximum;
        },
        set: function (value) {
            this.maximum = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "number", {
        get: function () {
            return Math.random() * (this.maximum - this.minimum + 1) + this.minimum;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "integer", {
        get: function () {
            return Math.floor(this.number);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Random.prototype, "zeroOrOne", {
        get: function () {
            return Math.round(Math.random());
        },
        enumerable: false,
        configurable: true
    });
    Random.prototype.choice = function (nums) {
        this.minimum = 0;
        this.maximum = nums.length - 1;
        return nums[this.integer];
    };
    Random.populate = function (n, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 100; }
        return Array.from({ length: n }, function (_) {
            var randNum = new Random(start, end);
            return randNum.integer;
        });
    };
    return Random;
}());
var Range = /** @class */ (function () {
    function Range(end, start, step) {
        if (start === void 0) { start = 0; }
        if (step === void 0) { step = 1; }
        this.startPoint = start - step;
        this.endPoint = end;
        this.step = step;
    }
    // Symbol.iterator makes an iterator
    // * makes it a generator
    Range.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.startPoint < this.endPoint - this.step)) return [3 /*break*/, 2];
                    // yield a value
                    return [4 /*yield*/, this.startPoint += this.step];
                case 1:
                    // yield a value
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    return Range;
}());
;
var shuffle = function (array) {
    var _a;
    // shuffle is done in place
    var randNum = new Random(0);
    var j;
    for (var i = array.length - 1; i > 0; i--) {
        randNum.max = i;
        j = randNum.integer;
        _a = __read([array[j], array[i]], 2), array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
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
            this._mat = __spreadArray(__spreadArray([], __read(this._mat), false), [Array(this.N).fill(0)], false);
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
                        diagonal = __spreadArray(__spreadArray([], __read(diagonal), false), [this._mat[rowIndex][colIndex]], false);
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
                        diagonal = __spreadArray(__spreadArray([], __read(diagonal), false), [this._mat[rowIndex][colIndex]], false);
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
var Timer = /** @class */ (function () {
    function Timer(interval) {
        this.interval = interval;
    }
    Timer.prototype.start = function (cb) {
        this.timerID = setInterval(cb, this.interval);
    };
    Timer.prototype.cancel = function () {
        clearInterval(this.timerID);
    };
    return Timer;
}());
var Countdown = /** @class */ (function (_super) {
    __extends(Countdown, _super);
    function Countdown(secsRemaining, doEachSec, doAtEnd) {
        var _this = _super.call(this, 1000) || this;
        _this.secsRemaining = secsRemaining;
        _super.prototype.start.call(_this, function () {
            _this.secsRemaining--;
            if (doEachSec)
                doEachSec(_this.secsRemaining);
            if (_this.secsRemaining == 0) {
                _super.prototype.cancel.call(_this);
                // countdown is over when the timer clock runs out
                if (doAtEnd)
                    doAtEnd();
            }
        });
        return _this;
    }
    Object.defineProperty(Countdown.prototype, "seconds", {
        get: function () {
            return this.secsRemaining;
        },
        enumerable: false,
        configurable: true
    });
    Countdown.prototype.end = function () {
        _super.prototype.cancel.call(this);
    };
    return Countdown;
}(Timer));
exports.Countdown = Countdown;
var Cell = /** @class */ (function () {
    function Cell() {
        var e_1, _a;
        var _this = this;
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        this.cell = document.createElement("div");
        var gameOverEvent = new Event("gameover", { bubbles: true });
        try {
            for (var classNames_1 = __values(classNames), classNames_1_1 = classNames_1.next(); !classNames_1_1.done; classNames_1_1 = classNames_1.next()) {
                var className = classNames_1_1.value;
                this.cell.classList.add(className);
                this.cell.addEventListener("click", function () {
                    if (_this.cell.classList.contains("covered")) {
                        switchIcons(_this.cell, ["covered"], ["uncovered"]);
                        if (_this.cell.classList.contains("mine")) {
                            switchIcons(_this.cell, ["mine"], ["burst"]);
                            addIcon(_this.cell, "burst", true, "solid");
                            _this.cell.dispatchEvent(gameOverEvent);
                        }
                    }
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (classNames_1_1 && !classNames_1_1.done && (_a = classNames_1.return)) _a.call(classNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Cell.prototype.add = function (context) {
        context.appendChild(this.cell);
    };
    return Cell;
}());
var Cells = /** @class */ (function () {
    function Cells(num) {
        this.num = num;
        this._cells = document.createDocumentFragment();
    }
    Cells.prototype.set = function () {
        for (var i = 0; i < this.num; i++) {
            var cell = new Cell("cell", "covered");
            cell.add(this._cells);
        }
    };
    Cells.prototype.add = function (context) {
        context.appendChild(this._cells);
    };
    Object.defineProperty(Cells.prototype, "cells", {
        get: function () {
            return this._cells.children;
        },
        enumerable: false,
        configurable: true
    });
    return Cells;
}());
var Board = /** @class */ (function () {
    function Board(board, size) {
        this.board = board;
        this.size = size;
        this.cells = new Cells(size);
    }
    Board.prototype.create = function () {
        this.cells.set();
        this.cells.add(this.board);
    };
    Board.prototype.setMines = function (minesMat, num) {
        var _this = this;
        var numRows = Math.sqrt(this.size);
        var numCols = numRows;
        var mineNumRange = __spreadArray([], __read(new Range(num)), false);
        var matIdxArr = __spreadArray([], __read(new Range(this.size)), false);
        var shuffledArray = shuffle(matIdxArr);
        var slicedAndShuffledArray = shuffledArray.slice(0, mineNumRange.length);
        slicedAndShuffledArray.forEach(function (place) {
            var mineRow = Math.floor(place / numRows);
            var mineCol = place % numCols;
            minesMat.setElement(1, mineRow, mineCol);
            _this.board.children[place].classList.add("mine");
        });
    };
    Board.prototype.reset = function () {
        while (this.board.firstChild)
            this.board.removeChild(this.board.lastChild);
    };
    return Board;
}());
var MS = /** @class */ (function () {
    function MS(game, n) {
        var gameInterface = game.firstElementChild;
        this.gameBoard = gameInterface.nextElementSibling;
        this.countdownDisplay = gameInterface.children[2];
        this.totalSeconds = 10;
        this.minesDisplay = gameInterface.children[0];
        var btnGroup = gameInterface.children[1];
        this.boardResetBtn = btnGroup.firstElementChild;
        this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;
        this.winningMsg = game.children.namedItem("winning-message");
        this.instructionsMsg = this.winningMsg.nextElementSibling;
        this.minesMat = new Matrix(n);
        this.board = new Board(this.gameBoard, n * n);
        this.resetHandler = this.resetHandler.bind(this);
        this.start(this.totalSeconds.toString(), "10");
    }
    MS.prototype.start = function (seconds, numMines) {
        var _this = this;
        this.board.create();
        this.board.setMines(this.minesMat, 10);
        console.log(this.minesMat.toString());
        this.minesDisplay.textContent = numMines;
        this.countdownDisplay.textContent = seconds;
        this.countdown = new Countdown(this.totalSeconds, function (remainingTime) {
            if (_this.countdown.seconds < 10)
                seconds = "0".concat(remainingTime);
            else
                seconds = remainingTime.toString();
            _this.countdownDisplay.textContent = seconds;
        }, function () {
            _this.gameBoard.dispatchEvent(new Event("gameover"));
        });
        this.gameBoard.addEventListener("gameover", function () {
            _this.countdown.cancel();
            _this.setGameover();
            var cells = _this.gameBoard.children;
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].classList.contains("covered"))
                    switchIcons(cells[i], ["covered"], ["uncovered"]);
                if (cells[i].classList.contains("mine"))
                    addIcon(cells[i], "bomb", true, "solid");
            }
        }, { once: true });
    };
    MS.prototype.setGameover = function () {
        switchIcons(this.boardResetBtnIcon, ["fa", "fa-smile-o"], ["far", "fa-dizzy"]);
        this.instructionsMsg.classList.add("hidden");
        this.boardResetBtn.addEventListener("click", this.resetHandler);
    };
    MS.prototype.resetHandler = function () {
        switchIcons(this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);
        this.board.reset();
        this.minesMat.clear();
        this.boardResetBtn.removeEventListener("click", this.resetHandler);
        this.instructionsMsg.classList.remove("hidden");
        this.start(this.totalSeconds.toString(), "10");
        //this.board.setMines(this.minesMat, 10);
    };
    return MS;
}());
exports.MS = MS;
var switchIcons = function (context, iconClassName1, iconClassName2) {
    context.classList.remove(iconClassName1[0]);
    context.classList.remove(iconClassName1[1]);
    context.classList.add(iconClassName2[0]);
    context.classList.add(iconClassName2[1]);
};
var createIcon = function (iconClasses) {
    var icon = document.createElement("i");
    var classes = iconClasses.split(" ");
    classes.forEach(function (item) {
        icon.classList.add(item);
    });
    return icon;
};
var addIcon = function (context, name, className, type) {
    if (className === void 0) { className = false; }
    if (type === void 0) { type = 'regular'; }
    var icon = createIcon("fa-".concat(type, " fa-").concat(name));
    context.appendChild(icon);
    if (className)
        context.classList.add("".concat(name));
    return icon;
};
var removeIcon = function (context, name) {
    context.classList.remove("".concat(name));
    context.removeChild(context.lastChild);
};
