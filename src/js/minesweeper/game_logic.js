import { createBoard, initMS, startTimer, stopTimer, clickCell } from "./ms.js";
import { board, msRestartBtn, minesDisplay, countdownDisplay } from "./game_incs.js";
import { removeChildren } from "../utils/utils.js";

const startMS = function() {
    // const randCellsArr = initMS(msRestartBtn, [ms_minesDisplay, ms_countdownDownDisplay]);
    initMS(msRestartBtn, [minesDisplay, countdownDisplay]); 
    const cellFragment = createBoard();
    board.appendChild(cellFragment);
};

const resetMS = function() {
    restartMS();
    const cells = board.children;
    for(const cell of cells) {
		cell.addEventListener("click", clickCell);
	}
    startTimer(countdownDisplay, msRestartBtn);
};

const restartMS = function() {
    stopTimer(); 
    removeChildren(board);
    startMS();
};

export { startMS, restartMS, resetMS };
