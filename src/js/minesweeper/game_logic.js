import { initMS, clickCell } from "./ms.js";
import { numRows, numCols, board, msRestartBtn, minesDisplay, countdownDisplay, secsRemaining } from "./game_incs.js";
import { removeChildren } from "../utils/utils.js";
import { startTimer, stopTimer } from "./ms_timer.js";
import { createBoard } from "./ms_game.js";

const startMS = function() {
    // const randCellsArr = initMS(msRestartBtn, [ms_minesDisplay, ms_countdownDownDisplay]);
    const minesMat = initMS(msRestartBtn, [minesDisplay, countdownDisplay]); 
    const cellFragment = createBoard(numRows * numCols, minesMat);
    board.appendChild(cellFragment);
};

const resetMS = function() {
    restartMS();
    const cells = board.children;
    for(const cell of cells) {
		cell.addEventListener("click", clickCell);
	}
    startTimer(secsRemaining, countdownDisplay, msRestartBtn);
};

const restartMS = function() {
    stopTimer(); 
    removeChildren(board);
    startMS();
};

export { startMS, restartMS, resetMS };
