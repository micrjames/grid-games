import { createBoard, initMS } from "./ms.js";
import { board, msRestartBtn, minesDisplay, countdownDisplay } from "./game_incs.js";
import { removeChildren } from "../utils/utils.js";

const startMS = function() {
    // const randCellsArr = initMS(msRestartBtn, [ms_minesDisplay, ms_countdownDownDisplay]);
    initMS(msRestartBtn, [minesDisplay, countdownDisplay]); 
    const cellFragment = createBoard();
    board.appendChild(cellFragment);
};

const resetMS = function() {
    removeChildren(board);
    startMS();
};

export { startMS, resetMS };
