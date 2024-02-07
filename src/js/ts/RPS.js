"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPS = void 0;
var buildEl = function (el, className, idName, text) {
    if (className === void 0) { className = null; }
    if (idName === void 0) { idName = null; }
    if (text === void 0) { text = null; }
    var element = document.createElement(el);
    if (className != null)
        element.setAttribute("class", className);
    if (idName != null)
        element.setAttribute("id", idName);
    if (text) {
        var elTxt = document.createTextNode(text);
        element.appendChild(elTxt);
    }
    return element;
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
var RPS = /** @class */ (function () {
    function RPS(context) {
        this.createResult = function (name, msg, resultClass, resultMsg, resultIcon, iconID) {
            var outerEl = buildEl("div", null, name);
            var textMsg = document.createTextNode(msg);
            outerEl.appendChild(textMsg);
            var spanScore = buildEl("span", resultClass, null, resultMsg);
            outerEl.appendChild(spanScore);
            var icon = addIcon(outerEl, resultIcon);
            icon.setAttribute("id", iconID);
            outerEl.appendChild(icon);
            return outerEl;
        };
        this.context = context;
        this.icons = [
            {
                "icon": "hand-back-fist",
                "type": "rock",
                "beats": "scissors"
            },
            {
                "icon": "hand",
                "type": "paper",
                "beats": "rock"
            },
            {
                "icon": "hand-scissors",
                "type": "scissors",
                "beats": "paper"
            }
        ];
        this.score = {
            player: "0",
            compputer: "0"
        };
    }
    RPS.prototype.start = function () {
        this.createResults();
        this.createSelection();
    };
    ;
    RPS.prototype.createSelection = function () {
        var _this = this;
        var div = buildEl("div", "selections", "selections");
        this.icons.forEach(function (buttonValue) {
            var button = buildEl("button", "selection");
            button.addEventListener("click", _this.handleSelectionClick);
            var icon = addIcon(button, buttonValue.icon);
            icon.setAttribute("id", buttonValue.type);
            div.appendChild(button);
        });
        this.context.insertBefore(div, this.context.firstChild);
    };
    RPS.prototype.handleSelectionClick = function (event) {
        var selectionBtnIcon = event.target;
        // Get the selected class
        var whichSelectionBtnIconClass = selectionBtnIcon.classList[1];
        // Get the results element
        var selectionBtn = selectionBtnIcon.parentElement;
        var selections = selectionBtn === null || selectionBtn === void 0 ? void 0 : selectionBtn.parentElement;
        var results = selections === null || selections === void 0 ? void 0 : selections.nextElementSibling;
        var plyrResults = results === null || results === void 0 ? void 0 : results.firstElementChild;
        // Get the current player class
        var plyrResultsIcon = plyrResults === null || plyrResults === void 0 ? void 0 : plyrResults.lastElementChild;
        var plyrResultsIconClass = plyrResultsIcon === null || plyrResultsIcon === void 0 ? void 0 : plyrResultsIcon.classList[1];
        // Get the current player score
        var plyrResultsScore = plyrResults === null || plyrResults === void 0 ? void 0 : plyrResults.firstElementChild;
        var plyrResultsScoreText = plyrResultsScore === null || plyrResultsScore === void 0 ? void 0 : plyrResultsScore.textContent;
        plyrResultsIcon === null || plyrResultsIcon === void 0 ? void 0 : plyrResultsIcon.classList.remove(plyrResultsIconClass);
        plyrResultsIcon === null || plyrResultsIcon === void 0 ? void 0 : plyrResultsIcon.classList.add(whichSelectionBtnIconClass);
        console.log(plyrResultsScoreText);
    };
    RPS.prototype.createResults = function () {
        var div = buildEl("div", "results", "results");
        var playerSpan = this.createResult("plyr-result", "You", "result-score", this.score.player, this.icons[0].icon, "plyr-selection");
        div.appendChild(playerSpan);
        var computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.score.player, this.icons[2].icon, "cmptr-selection");
        div.appendChild(computerSpan);
        this.context.insertBefore(div, this.context.firstChild);
    };
    return RPS;
}());
exports.RPS = RPS;
