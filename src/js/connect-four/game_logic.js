import { cf_data, cfBoard } from "./game_incs.js";
import { createEndCaps, createCells } from "./cf.js";

const startCF = function() {
   const CFEndCapFragment = createEndCaps(cf_data.numCols);                                          
   const CFCellFragment = createCells(cf_data.numRows, cf_data.numCols);

   cfBoard.appendChild(CFEndCapFragment);
   cfBoard.appendChild(CFCellFragment);
}  

export { startCF };
