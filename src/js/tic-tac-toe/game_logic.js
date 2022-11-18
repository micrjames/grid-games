import { cellEls, CLASS, winningMessageEl, instructionsMessageEl } from "./game_incs.js";
import { handleClick, setBoardHoverClass } from "./ttt.js";

const startTTT = function() {
    for(const cellEl of cellEls) {
	    if(cellEl.classList.contains(CLASS.X)) cellEl.classList.remove(CLASS.X);
	    else if(cellEl.classList.contains(CLASS.CIRCLE)) cellEl.classList.remove(CLASS.CIRCLE);

	    cellEl.removeEventListener("click", handleClick);
	    cellEl.addEventListener("click", handleClick);
	}

    setBoardHoverClass();

    winningMessageEl.classList.add("hidden");
    instructionsMessageEl.classList.remove("hidden");
};

const resetTTT = function() {
};

export { startTTT, resetTTT };
