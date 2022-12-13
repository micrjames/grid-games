import { board, cellEls, CLASS, mat } from "./game_incs.js";
import { handleClick } from "./ttt.js";
import { toggleUIEls, setBoardHoverClass } from "./ttt_game.js";
import { setOver } from "./utils.js";

const startTTT = function() {
	setup();
    setBoardHoverClass(board, true, CLASS);
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
