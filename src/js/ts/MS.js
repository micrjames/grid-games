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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MS = exports.Countdown = void 0;
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
    return Countdown;
}(Timer));
exports.Countdown = Countdown;
var Cell = /** @class */ (function () {
    function Cell() {
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        this.cell = document.createElement("div");
        for (var _a = 0, classNames_1 = classNames; _a < classNames_1.length; _a++) {
            var className = classNames_1[_a];
            this.cell.classList.add(className);
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
        this.cells = document.createDocumentFragment();
    }
    Cells.prototype.set = function () {
        for (var i = 0; i < this.num; i++) {
            var cell = new Cell("cell", "covered");
            cell.add(this.cells);
        }
    };
    Cells.prototype.add = function (context) {
        context.appendChild(this.cells);
    };
    return Cells;
}());
var Board = /** @class */ (function () {
    function Board(board, size) {
        this.board = board;
        this.cells = new Cells(size);
    }
    Board.prototype.create = function () {
        this.cells.set();
        this.cells.add(this.board);
    };
    Board.prototype.reset = function () {
        while (this.board.firstChild)
            this.board.removeChild(this.board.lastChild);
    };
    return Board;
}());
var MS = /** @class */ (function () {
    function MS(game) {
        var gameInterface = game.firstElementChild;
        this.gameBoard = gameInterface.nextElementSibling;
        this.countdownDisplay = gameInterface.children[2];
        this.minesDisplay = gameInterface.children[0];
        var btnGroup = gameInterface.children[1];
        this.boardResetBtn = btnGroup.firstElementChild;
        this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;
        this.winningMsg = game.children.namedItem("winning-message");
        this.instructionsMsg = this.winningMsg.nextElementSibling;
        this.board = new Board(this.gameBoard, 81);
        this.start("10", "00");
    }
    MS.prototype.start = function (seconds, numMines) {
        var _this = this;
        this.board.create();
        this.minesDisplay.textContent = numMines;
        this.countdownDisplay.textContent = seconds;
        this.countdown = new Countdown(10, function (remainingTime) {
            if (_this.countdown.seconds < 10)
                seconds = "0".concat(remainingTime);
            else
                seconds = remainingTime.toString();
            _this.countdownDisplay.textContent = seconds;
        }, function () {
            switchIcons(_this.boardResetBtnIcon, ["fa", "fa-smile-o"], ["far", "fa-dizzy"]);
            _this.instructionsMsg.classList.add("hidden");
            var resetHandler = function () {
                switchIcons(_this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);
                _this.board.reset();
                _this.boardResetBtn.removeEventListener("click", resetHandler);
                _this.instructionsMsg.classList.remove("hidden");
                _this.start("10", "00");
            };
            _this.boardResetBtn.addEventListener("click", resetHandler);
        });
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
