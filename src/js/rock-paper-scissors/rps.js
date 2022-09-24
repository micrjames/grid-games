import { buildEl, addIcon } from "./utils.js";

const createSelection = function(context, buttonValues) {
    const div = buildEl("div", "selections", "selections");
    buttonValues.forEach(buttonValue => {
        const button = buildEl("button", "selection"); 

        const icon = addIcon(button, buttonValue.icon);
        icon.setAttribute("id", buttonValue.type);
        div.appendChild(button);
    });                                                                                                   
    context.insertBefore(div, context.firstChild);
};

const createResults = function(context, buttonValues) {
    const div = buildEl("div", "results", "results");

    const playerSpan = createResult("plyr-result", "You", "result-score", "0", buttonValues[2].icon, "plyr-selection");
    div.appendChild(playerSpan);

    const computerSpan = createResult("cmptr-result", "Computer", "result-score", "0", buttonValues[0].icon, "cmptr-selection");
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

export { createSelection, createResults };
