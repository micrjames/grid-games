import { data, board } from "./game_incs.js";
import { createEndCaps, createCells } from "./cf.js";
import { removeChildren } from "../utils/utils.js";
import { clearVals } from "./utils.js";

const startCF = function() {
   buildBoard();
};

const resetCF = function() {
   clearVals();
   removeChildren(board);
   startCF();
};

const buildBoard = function() {
   const CFEndCapFragment = createEndCaps(data.numCols);         
   const CFCellFragment = createCells(data.numRows, data.numCols);

   board.appendChild(CFEndCapFragment);
   board.appendChild(CFCellFragment);
};

export { startCF, resetCF };
