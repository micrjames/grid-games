import { changeBtnIcon } from "../utils/utils.js";
import { createTimer } from "../utils/timer_driver.js";
import { cells } from "./game_incs.js";
import { clickCell } from "./ms.js";

let timer;
const startTimer = function(secsRemaining, countdownDisplay, resetBtn) {
    stopTimer();
    timer = createTimer(countdownDisplay, secsRemaining, () => {
	   changeBtnIcon(resetBtn, "face-dizzy");

	   for(const cell of cells) {
		   cell.removeEventListener("click", clickCell)
	   }
    });
};
const stopTimer = function() {
    if(timer) timer.cancel();
};

export { startTimer, stopTimer };
