import { numRows, numCols, connectFourEl, cfBoard } from "./game_incs.js";

const startCF = function() {
   const CFEndCapFragment = document.createDocumentFragment();                                          
   const CFCellFragment = document.createDocumentFragment();
   for(let i = 0; i < numCols; i++) {
       const CFEndCap = document.createElement("div");
	   CFEndCap.classList.add("col-end-cap");
	   CFEndCapFragment.appendChild(CFEndCap);
   }   
   for(let i = 0; i < numRows * numCols; i++) {
       const CFcell = document.createElement("div");
	   CFcell.classList.add("cell");
	   CFCellFragment.appendChild(CFcell);
   }  
   cfBoard.appendChild(CFEndCapFragment);
   cfBoard.appendChild(CFCellFragment);
}  

export { startCF };
