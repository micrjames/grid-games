import { buildEl } from "../utils/utils.js";
import { handleClick, handleHover, handleOut } from "./handlers.js";

const createEndCaps = function(numCols) {
   const endCapFragment = document.createDocumentFragment();                                          
   for(let i = 0; i < numCols; i++) {
	  const endCap = buildEl("div", "col-end-cap", i.toString());
	  endCap.addEventListener("click", handleClick)
	  endCap.addEventListener("mouseover", handleHover);
	  endCap.addEventListener("mouseout", handleOut);
	  endCapFragment.appendChild(endCap);
   }   

   return endCapFragment;
};

const createCells = function(numRows, numCols) {
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
	   const cell = buildEl("div", "cell");
	   cellFragment.appendChild(cell);
   }  

   return cellFragment;
};

export { createEndCaps, createCells };
