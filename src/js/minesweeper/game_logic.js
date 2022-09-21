import { numRows, numCols, minesweeperEl, msBoard } from "./game_incs.js";

const startMS = function() {
   const MSCellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const MScell = document.createElement("div");
	   MScell.classList.add("cell");
	   MSCellFragment.appendChild(MScell);
   }  
   msBoard.appendChild(MSCellFragment);
}  

export { startMS };
