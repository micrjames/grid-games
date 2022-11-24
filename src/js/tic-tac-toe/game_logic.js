import { cellEls, CLASS } from "./game_incs.js";
import { handleClick, setBoardHoverClass, toggleUIEls, setOver } from "./ttt.js";
import { mat } from "../incs.js";

const startTTT = function() {
	setup();
    setBoardHoverClass();
};

const resetTTT = function() {
    setup();

	mat.circle.clear();
	mat.x.clear();

    setOver(false);
};

const setup = function() {
    for(const cellEl of cellEls) {
	    if(cellEl.classList.contains(CLASS.X)) cellEl.classList.remove(CLASS.X);
	    else if(cellEl.classList.contains(CLASS.CIRCLE)) cellEl.classList.remove(CLASS.CIRCLE);

	    cellEl.removeEventListener("click", handleClick);
	    cellEl.addEventListener("click", handleClick);
	}

    toggleUIEls(false);
}

export { startTTT, resetTTT };
