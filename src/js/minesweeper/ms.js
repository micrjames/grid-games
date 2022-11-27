import { numRows, numCols } from "./game_incs.js";

const createCell = function() {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("covered");

    return cell;
};

const createBoard = function() {
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const cell = createCell();
	   cellFragment.appendChild(cell);

	  /*
	   if(randArr.some(randItem => randItem == i)) {
           cell.classList.add("mine");
       }
 
	   */
       cell.addEventListener("click", clickCell);
   }
   return cellFragment;
};

const clickCell = function() {
};

export { createBoard };
