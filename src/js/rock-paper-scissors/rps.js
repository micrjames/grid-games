import { buildEl, addIcon } from "./utils.js";
import { rps, iconClassNames } from "./game_incs.js";

let plyrScore;
let cmptrScore;

const resetScore = function() {
    plyrScore = 0;
    cmptrScore = 0;
}

const createSelection = function(context, buttonValues) {
    const div = buildEl("div", "selections", "selections");
    buttonValues.forEach(buttonValue => {
        const button = buildEl("button", "selection"); 
	    button.addEventListener("click", handleSelectionClick);

        const icon = addIcon(button, buttonValue.icon);
        icon.setAttribute("id", buttonValue.type);
        div.appendChild(button);
    });                                                                                                   
    context.insertBefore(div, context.firstChild);
};

const handleSelectionClick = function() {
    const selectionBtnChildren = this.children;
    const selectionBtnIcon = selectionBtnChildren[0];

    // Get the values for the icon
    const whichSelectionBtnIconID = selectionBtnIcon.id;
    const whichSelectionBtnIcon = selectionBtnIcon.className;

    // remove the player result
    const selectionsNode = this.parentNode;			// <div class="selections" id="selections">
    const resultsNode = selectionsNode.nextSibling; // <div class="results" id="results">

    rps.removeChild(selectionsNode);
    rps.removeChild(resultsNode);

    // rebuild resultsNode with new values 
    const resultsComputerIcon = getRandomIcon(iconClassNames);
    if(resultsComputerIcon.beats == whichSelectionBtnIconID) cmptrScore++;
    // whichSelectionBtnIconID				-- player selected choice type
    const resultsPlayerIcon = iconClassNames.find(item => item.type == whichSelectionBtnIconID);
    if(resultsPlayerIcon.beats == resultsComputerIcon.type) plyrScore++;
    createResults(rps, whichSelectionBtnIcon, resultsComputerIcon.icon, plyrScore, cmptrScore);
    createSelection(rps, iconClassNames);     
};

const createResults = function(context, playerIcon, computerIcon, playerScore, computerScore) {
    const div = buildEl("div", "results", "results");

    const playerSpan = createResult("plyr-result", "You", "result-score", playerScore, playerIcon, "plyr-selection");
    div.appendChild(playerSpan);

    const computerSpan = createResult("cmptr-result", "Computer", "result-score", computerScore, computerIcon, "cmptr-selection");
    div.appendChild(computerSpan);

   	context.insertBefore(div, context.firstChild);
};

const createResult = function(name, msg, resultClass, resultMsg, resultIcon, iconID) {
    const spanOuter = buildEl("span", null, name);
    
	const textMsg = document.createTextNode(msg);
    spanOuter.appendChild(textMsg);

   	const spanScore = buildEl("span", resultClass);
   	const textScore = document.createTextNode(resultMsg);
    spanScore.appendChild(textScore);

    spanOuter.appendChild(spanScore); 

    const icon = addIcon(spanOuter, resultIcon);
    icon.setAttribute("id", iconID);
    spanOuter.appendChild(icon);
    
    return spanOuter;
};

const getRandomIcon = function(iconClassNamesList) {
    const iconIndex = Math.floor(Math.random() * iconClassNamesList.length);    
    return iconClassNamesList[iconIndex];
};

export { createSelection, createResults, resetScore };
