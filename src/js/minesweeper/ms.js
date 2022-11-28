import { numRows, numCols } from "./game_incs.js";
import { addIcon, removeIcon, createTimer, changeBtnIcon } from "../utils/utils.js";

let timer;
let totalNumMines = 10;
let secsRemaining = 60;
const initMS = function(restartBtn, displays) {
    if(restartBtn.children.length) removeIcon(restartBtn, "face-grin-wide");
	addIcon(restartBtn, "face-grin-wide");
    displays[0].textContent = totalNumMines;
    displays[1].textContent = secsRemaining;
    
    // return setRandNumsArr(10, numRows * numCols);
};

const startTimer = function(countdownDisplay, resetBtn) {
    stopTimer();
    timer = createTimer(countdownDisplay, secsRemaining, () => {
	    changeBtnIcon(resetBtn, "face-dizzy");
	});
};
const stopTimer = function() {
    if(timer) timer.cancel();
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

export { createBoard, initMS, startTimer, stopTimer };
