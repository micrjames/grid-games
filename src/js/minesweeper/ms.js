import { numRows, numCols } from "./game_incs.js";
import { addIcon, createTimer, changeBtnIcon } from "../utils/utils.js";

let timer;
let totalNumMines = 10;
const initMS = function(restartBtn, displays) {
    let secsRemaining = 60;
    if(timer) timer.cancel();
    timer = createTimer(displays[1], secsRemaining, () => {
	    changeBtnIcon(restartBtn, "face-dizzy");
	});
    if(!restartBtn.children.length) addIcon(restartBtn, "face-grin-wide");
    displays[0].textContent = totalNumMines;
    displays[1].textContent = secsRemaining;
    
    // return setRandNumsArr(10, numRows * numCols);
};

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

export { createBoard, initMS };
