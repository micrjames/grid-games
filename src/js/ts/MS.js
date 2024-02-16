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
var MS = /** @class */ (function () {
    function MS(game) {
        var gameInterface = game.firstElementChild;
        this.countdownDisplay = gameInterface.children[2];
        this.minesDisplay = gameInterface.children[0];
        var btnGroup = gameInterface.children[1];
        this.boardResetBtn = btnGroup.firstElementChild;
        this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;
        this.winningMsg = game.children.namedItem("winning-message");
        this.instructionsMsg = this.winningMsg.nextElementSibling;
        var seconds = "10";
        this.countdownDisplay.textContent = seconds;
        this.start(seconds);
    }
    MS.prototype.start = function (seconds) {
        var _this = this;
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
                _this.countdownDisplay.textContent = seconds.toString();
                switchIcons(_this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);
                _this.boardResetBtn.removeEventListener("click", resetHandler);
                _this.instructionsMsg.classList.remove("hidden");
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
