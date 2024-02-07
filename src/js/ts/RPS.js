"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPS = void 0;
var buildEl = function (el, className, idName) {
    if (className === void 0) { className = null; }
    if (idName === void 0) { idName = null; }
    var element = document.createElement(el);
    if (className != null)
        element.setAttribute("class", className);
    if (idName != null)
        element.setAttribute("id", idName);
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
            var spanOuter = buildEl("div", null, name);
            var textMsg = document.createTextNode(msg);
            spanOuter.appendChild(textMsg);
            var spanScore = buildEl("span", resultClass);
            var textScore = document.createTextNode(resultMsg);
            spanScore.appendChild(textScore);
            spanOuter.appendChild(spanScore);
            var icon = addIcon(spanOuter, resultIcon);
            icon.setAttribute("id", iconID);
            spanOuter.appendChild(icon);
            return spanOuter;
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
        this.playerScore = "0";
        this.computerScore = "0";
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
        // Get the values for the icon
        var whichSelectionBtnIconID = selectionBtnIcon.id;
        var whichSelectionBtnIcon = selectionBtnIcon.className;
        console.log(whichSelectionBtnIcon, whichSelectionBtnIconID);
    };
    RPS.prototype.createResults = function () {
        var div = buildEl("div", "results", "results");
        var playerSpan = this.createResult("plyr-result", "You", "result-score", this.playerScore, this.icons[0].icon, "plyr-selection");
        div.appendChild(playerSpan);
        var computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.computerScore, this.icons[2].icon, "cmptr-selection");
        div.appendChild(computerSpan);
        this.context.insertBefore(div, this.context.firstChild);
    };
    return RPS;
}());
exports.RPS = RPS;
