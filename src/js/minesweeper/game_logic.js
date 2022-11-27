import { createBoard } from "./ms.js";
import { board, msRestartBtn } from "./game_incs.js";
import { removeChildren } from "../utils/utils.js";

const startMS = function() {
    // const randCellsArr = initMS(msRestartBtn, [ms_minesDisplay, ms_countdownDownDisplay]);
    const cellFragment = createBoard();
    board.appendChild(cellFragment);
};

const resetMS = function() {
    removeChildren(board);
    startMS();
};

export { startMS, resetMS };
