import { data, board } from "./game_incs.js";
import { createEndCaps, createCells } from "./cf.js";
import { removeChildren } from "../utils/utils.js";

const startCF = function() {
   const CFEndCapFragment = createEndCaps(data.numCols);                                          
   const CFCellFragment = createCells(data.numRows, data.numCols);

   board.appendChild(CFEndCapFragment);
   board.appendChild(CFCellFragment);
};

const resetCF = function() {
   removeChildren(board);
   startCF();
};

export { startCF, resetCF };
