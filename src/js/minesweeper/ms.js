import { numRows, numCols, minePlacement, numMines, mineNumRange } from "./game_incs.js";
import { addIcon, removeIcon, createTimer, changeBtnIcon, switchClasses } from "../utils/utils.js";
import Random from "../utils/Random.js";
import Matrix from "../utils/Matrix.js";

let cellsMat;
let timer;
let totalNumMines = numMines;
let secsRemaining = 60;
const initMS = function(restartBtn, displays) {
    if(restartBtn.children.length) removeIcon(restartBtn, "face-grin-wide");
	addIcon(restartBtn, "face-grin-wide");
    displays[0].textContent = totalNumMines;
    displays[1].textContent = secsRemaining;
    
    placeMines();
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
   const minesArr = cellsMat.mat.flat()
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const cell = createCell();
	   if(minesArr[i] == 1) cell.classList.add("mine");
       cell.addEventListener("click", clickCell);

	   cellFragment.appendChild(cell);
   }
   return cellFragment;
};

const clickCell = function(event) {
   if(event.metakey) {
   } else {
	  if(this.classList.contains("covered")) {
		 switchClasses(this, "covered", "uncovered");

		 if(this.classList.contains("mine")) {
			 switchClasses(this, "mine", "burst");
			 const board = this.parentElement;
			 const gameInterface = board.parentElement.children[0];
			 const btnGroup = gameInterface.children[1];
			 const restartBtn = btnGroup.children[0];
			 changeBtnIcon(restartBtn, "face-dizzy");
			 for(const child of board.children) {
				 switchClasses(child, "covered", "uncovered");
				 if(child.classList.contains("mine")) {
					addIcon(child, "bomb");
				 } else if(child.classList.contains("burst")) {
					addIcon(child, "burst");
				 }
				 child.removeEventListener("click", clickCell);
			 }

			 // stop the timer when the game is over
			 stopTimer();
		 }
	  }
   }
};

const placeMines = function() {
    cellsMat = new Matrix(numCols);
    mineNumRange.forEach(_ => {
		minePlacement.row = new Random(0, cellsMat.size - 1).int;
		minePlacement.col = new Random(0, cellsMat.size - 1).int;
		cellsMat.setElement(1, minePlacement.row, minePlacement.col);
    });
};

export { createBoard, initMS, startTimer, stopTimer, placeMines };
