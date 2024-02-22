import config from "./config.js";
import { buildEl, switchVisibility, addIcon } from "../../js/utils/domHelpers.js";
import { getRandomIdx } from "../../js/utils/utils.js";
import IconTypes from "./IconTypes.js";
import { Score } from "./Score.js";
export class RPS {
    constructor(context) {
        this.createResult = function (name, msg, resultClass, resultMsg, resultIcon, iconID) {
            const outerEl = buildEl("div", null, name);
            const textMsg = document.createTextNode(msg);
            outerEl.appendChild(textMsg);
            const spanScore = buildEl("span", resultClass, null, resultMsg);
            outerEl.appendChild(spanScore);
            const icon = addIcon(outerEl, resultIcon);
            icon.setAttribute("id", iconID);
            outerEl.appendChild(icon);
            return outerEl;
        };
        this.context = context;
        this.icons = IconTypes;
        this.score = new Score();
        this.handleSelectionClick = this.handleSelectionClick.bind(this);
    }
    start() {
        this.score.reset();
        this.createResults();
        this.createSelection();
    }
    ;
    reset() {
        this.context.removeChild(this.context.firstChild);
        this.context.removeChild(this.context.firstChild);
        const winningMsg = this.context.firstElementChild;
        const instructionsEl = winningMsg === null || winningMsg === void 0 ? void 0 : winningMsg.nextElementSibling;
        switchVisibility(instructionsEl, winningMsg);
        this.start();
    }
    createSelection() {
        const div = buildEl("div", "selections", "selections");
        this.icons.forEach(buttonValue => {
            const button = buildEl("button", "selection");
            button.addEventListener("click", this.handleSelectionClick);
            const icon = addIcon(button, buttonValue.icon);
            icon.setAttribute("id", buttonValue.type);
            div.appendChild(button);
        });
        this.context.insertBefore(div, this.context.firstChild);
    }
    handleSelectionClick(event) {
        const selectionBtnIcon = event.target;
        const whichSelectionBtnIconClass = selectionBtnIcon.classList[1];
        // Get the results element
        const selections = selectionBtnIcon.parentElement.parentElement;
        const results = selections.nextElementSibling;
        const winningMsg = results === null || results === void 0 ? void 0 : results.nextElementSibling;
        const instructionsEl = winningMsg === null || winningMsg === void 0 ? void 0 : winningMsg.nextElementSibling;
        const resultsObj = {
            plyr: results === null || results === void 0 ? void 0 : results.firstElementChild,
            cmptr: results === null || results === void 0 ? void 0 : results.lastElementChild
        };
        const randIdx = getRandomIdx(this.icons.length);
        this.changeIcon(resultsObj.plyr, whichSelectionBtnIconClass);
        this.changeIcon(resultsObj.cmptr, `fa-${this.icons[randIdx].icon}`);
        const splitSelClass = whichSelectionBtnIconClass.split('-');
        splitSelClass.shift();
        const playerClassIdx = this.icons.findIndex(icon => splitSelClass.join('-') == icon.icon);
        const whichResults = this.checkWhichResults(resultsObj, this.icons, playerClassIdx, randIdx);
        if (whichResults.which) {
            this.score.incScore(whichResults.name);
            this.setScore(whichResults);
        }
        this.context.addEventListener("gameover", () => {
            this.endGame(winningMsg, selections, instructionsEl, whichResults.textMsg);
        });
        if (this.score.getIntScore("player") == config.numToWin || this.score.getIntScore("computer") == config.numToWin) {
            this.context.dispatchEvent(new Event("gameover"));
        }
    }
    changeIcon(thisResults, whichSelectionBtnIconClass) {
        // Get the current player class
        const thisResultsIcon = thisResults === null || thisResults === void 0 ? void 0 : thisResults.lastElementChild;
        const thisResultsIconClass = thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList[1];
        thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList.remove(thisResultsIconClass);
        thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList.add(whichSelectionBtnIconClass);
    }
    setScore(thisResults) {
        var _a;
        // Get the current player score
        const thisResultsScore = (_a = thisResults.which) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        thisResultsScore.textContent = this.score.getScore(thisResults.name);
    }
    checkWhichResults(resultsObj, icons, plyrIdx, cmptrIdx) {
        let whichWins;
        let results;
        let name;
        const plyrBeatsIdx = this.icons.findIndex(icon => this.icons[plyrIdx].beats == icon.type);
        const cmptrBeatsIdx = this.icons.findIndex(icon => this.icons[cmptrIdx].beats == icon.type);
        if (icons[plyrBeatsIdx].icon == icons[cmptrIdx].icon) {
            whichWins = "Player";
            results = resultsObj.plyr;
            name = whichWins.toLowerCase();
        }
        if (icons[cmptrBeatsIdx].icon == icons[plyrIdx].icon) {
            whichWins = "Computer";
            results = resultsObj.cmptr;
            name = whichWins.toLowerCase();
        }
        if (icons[plyrIdx].icon == icons[cmptrIdx].icon) {
            whichWins = "No one";
            name = whichWins.toLowerCase();
        }
        return {
            textMsg: `${whichWins} wins!`,
            which: results,
            name
        };
    }
    endGame(winningMsg, selections, instructionsEl, winning_msg_text) {
        winningMsg.firstElementChild.textContent = winning_msg_text;
        for (let i = 0; i < (selections === null || selections === void 0 ? void 0 : selections.children.length); i++) {
            const selBtn = selections.children[i];
            selBtn.disabled = true;
        }
        switchVisibility(winningMsg, instructionsEl);
    }
    createResults() {
        const div = buildEl("div", "results", "results");
        const playerSpan = this.createResult("plyr-result", "You", "result-score", this.score.getScore("player"), this.icons[0].icon, "plyr-selection");
        div.appendChild(playerSpan);
        const computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.score.getScore("computer"), this.icons[2].icon, "cmptr-selection");
        div.appendChild(computerSpan);
        this.context.insertBefore(div, this.context.firstChild);
    }
}
