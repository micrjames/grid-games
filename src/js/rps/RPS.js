import { buildEl, switchVisibility, addIcon } from "../../js/utils/domHelpers.js";
import { getRandomIdx } from "../../js/utils/utils.js";
import IconTypes from "./IconTypes.js";
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
        this.score = {
            player: "0",
            computer: "0"
        };
        this.handleSelectionClick = this.handleSelectionClick.bind(this);
    }
    resetScore() {
        this.score.player = "0";
        this.score.computer = "0";
    }
    start() {
        this.resetScore();
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
        // Get the selected class
        const whichSelectionBtnIconClass = selectionBtnIcon.classList[1];
        // Get the results element
        const selectionBtn = selectionBtnIcon.parentElement;
        const selections = selectionBtn === null || selectionBtn === void 0 ? void 0 : selectionBtn.parentElement;
        const results = selections === null || selections === void 0 ? void 0 : selections.nextElementSibling;
        // Get the winning message element
        const winningMsg = results === null || results === void 0 ? void 0 : results.nextElementSibling;
        // Get the instructions element
        const instructionsEl = winningMsg === null || winningMsg === void 0 ? void 0 : winningMsg.nextElementSibling;
        const plyrResults = results === null || results === void 0 ? void 0 : results.firstElementChild;
        const cmptrResults = results === null || results === void 0 ? void 0 : results.lastElementChild;
        this.changeIcon(plyrResults, whichSelectionBtnIconClass);
        const randIdx = getRandomIdx(this.icons.length);
        this.changeIcon(cmptrResults, `fa-${this.icons[randIdx].icon}`);
        const splitSelClass = whichSelectionBtnIconClass.split('-');
        splitSelClass.shift();
        const joinedSelClass = splitSelClass.join('-');
        console.log(`player: ${joinedSelClass}`, `computer: ${this.icons[randIdx].icon}`);
        console.log(winningMsg, instructionsEl);
        // check if joinedSelClass beats icons[randIdx]
        const joinedSelClassIdx = this.icons.findIndex(icon => joinedSelClass == icon.icon);
        const joinedSelClassBeats = this.icons[joinedSelClassIdx].beats;
        const joinedSelClassBeatsIdx = this.icons.findIndex(icon => joinedSelClassBeats == icon.type);
        const computerClassBeats = this.icons[randIdx].beats;
        const computerClassBeatsIdx = this.icons.findIndex(icon => computerClassBeats == icon.type);
        const whichResults = this.checkWhichResults(plyrResults, cmptrResults, this.icons, joinedSelClassIdx, randIdx, joinedSelClassBeatsIdx, computerClassBeatsIdx);
        this.endGame(winningMsg, selections, instructionsEl, whichResults.textMsg);
        if (whichResults.which)
            this.setScore(whichResults.which, 1);
    }
    changeIcon(thisResults, whichSelectionBtnIconClass) {
        // Get the current player class
        const thisResultsIcon = thisResults === null || thisResults === void 0 ? void 0 : thisResults.lastElementChild;
        const thisResultsIconClass = thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList[1];
        thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList.remove(thisResultsIconClass);
        thisResultsIcon === null || thisResultsIcon === void 0 ? void 0 : thisResultsIcon.classList.add(whichSelectionBtnIconClass);
    }
    setScore(thisResults, score) {
        // Get the current player score
        const thisResultsScore = thisResults === null || thisResults === void 0 ? void 0 : thisResults.firstElementChild;
        console.log(thisResultsScore === null || thisResultsScore === void 0 ? void 0 : thisResultsScore.parentElement);
        thisResultsScore.textContent = "1";
    }
    checkWhichResults(plyrResults, cmptrResults, icons, plyrIdx, cmptrIdx, plyrBeatsIdx, cmptrBeatsIdx) {
        if (icons[plyrBeatsIdx].icon == icons[cmptrIdx].icon) {
            return {
                textMsg: 'Player wins!',
                which: plyrResults
            };
        }
        if (icons[cmptrBeatsIdx].icon == icons[plyrIdx].icon) {
            return {
                textMsg: 'Computer wins!',
                which: cmptrResults
            };
        }
        if (icons[plyrIdx].icon == icons[cmptrIdx].icon) {
            return {
                textMsg: 'There is a draw!',
                which: null
            };
        }
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
        const playerSpan = this.createResult("plyr-result", "You", "result-score", this.score.player, this.icons[0].icon, "plyr-selection");
        div.appendChild(playerSpan);
        const computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.score.player, this.icons[2].icon, "cmptr-selection");
        div.appendChild(computerSpan);
        this.context.insertBefore(div, this.context.firstChild);
    }
}
