import { msBoard, ms_minesDisplay, ms_countdownDisplay, restartMSBtn } from "./game_incs.js";
import { initMS, createBoard } from "./ms.js";

const startMS = function() {
   const randCellsArr = initMS(restartMSBtn, [ms_minesDisplay, ms_countdownDisplay]);
   const cellFragment = createBoard(randCellsArr);
   msBoard.appendChild(cellFragment);
}

export { startMS };
