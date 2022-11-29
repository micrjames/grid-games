import { numRows, numCols, minePlacement, numMines, mineNumRange } from "./game_incs.js";
import { addIcon, removeIcon, createTimer, changeBtnIcon, switchClasses } from "../utils/utils.js";
import Random from "../utils/Random.js";
import Matrix from "../utils/Matrix.js";

let cellsMat;
let timer;
let totalNumMines;
let secsRemaining = 60;
const initMS = function(restartBtn, displays) {
    totalNumMines = numMines;
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

	   cellFragment.appendChild(cell);
   }
   return cellFragment;
};

const clickCell = function(event) {
   const board = this.parentElement;
   const gameInterface = board.parentElement.children[0];
   const minesDisplay = gameInterface.children[0];
   const btnGroup = gameInterface.children[1];
   const restartBtn = btnGroup.children[0];
   
   const [row, col] = enumCells(board, this);
   if(event.metaKey) {
	  if(totalNumMines > 0) {
		  manageFlag(this, minesDisplay);
	  }
   } else {
	  if(this.classList.contains("covered")) {
		 switchClasses(this, "covered", "uncovered");

		 if(this.classList.contains("mine")) {
			 switchClasses(this, "mine", "burst");
			 changeBtnIcon(restartBtn, "face-dizzy");
			 for(const child of board.children) {
				 manageCellState(child);	
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

const numMinesNear = function() {
};

const manageFlag = function(cell, minesDisplay) {
   if(cell.children.length) {
	   if(cell.classList.contains("flag")) {
		   removeIcon(cell, "flag");
		   totalNumMines++;
	   }
   } else {
	   addIcon(cell, "flag", true);
	   totalNumMines--;
   }
   if(totalNumMines < 10) totalNumMines = `0${totalNumMines}`;
   minesDisplay.textContent = totalNumMines;
};

const manageCellState = function(cell) {
   switchClasses(cell, "covered", "uncovered");
   if(cell.classList.contains("mine")) {
	  addIcon(cell, "bomb");
   } else if(cell.classList.contains("burst")) {
	  addIcon(cell, "burst");
   }
   else if(cell.classList.contains("flag")) {
	  removeIcon(child, "flag");
   } 
};

const enumCells = function(board, cell) {
   const cells = board.children;
   let row;
   let col;
   for(let i = 0; i < cells.length; i++) {
	   if(cells[i] === cell) {
		  row = Math.floor(i / numRows);
		  col = i % numCols;
	   }
   }

   return [row, col];
};

export { createBoard, initMS, startTimer, stopTimer, placeMines, clickCell };
