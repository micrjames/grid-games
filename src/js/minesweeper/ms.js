import { numRows, numCols, minePlacement, numMines, mineNumRange, board, minesDisplay, msRestartBtn } from "./game_incs.js";
import { addIcon, removeIcon, createTimer, changeBtnIcon, switchClasses } from "../utils/utils.js";
import Random from "../utils/Random.js";
import Matrix from "../utils/Matrix.js";
import { range } from "../utils/range.js";

let minesMat;
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
   const minesArr = minesMat.mat.flat()
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const cell = createCell();
	   if(minesArr[i] == 1) cell.classList.add("mine");

	   cellFragment.appendChild(cell);
   }
   return cellFragment;
};

const clickCell = function(event) {
   const [row, col] = enumCells(board, this);
   const numMinesNearby = numMinesNear(row, col);
   if(event.metaKey) {
	  if(totalNumMines > 0) {
		  manageFlag(this, minesDisplay);
	  }
   } else {
	  if(this.classList.contains("covered")) {
		 if(!numMinesNearby) {
			 const mineRemovals = [...range(4)];
			 let initCell = this;

			 getMinesNearby(row, col, (nextRow, nextCol) => {
				switchClasses(initCell, "covered", "uncovered"); 
			 }); 
		 }
		 else {
			switchClasses(this, "covered", "uncovered");
		 }

		 if(this.classList.contains("mine")) {
			 switchClasses(this, "mine", "burst");
			 changeBtnIcon(msRestartBtn, "face-dizzy");
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
    minesMat = new Matrix(numCols);
    mineNumRange.forEach(_ => {
		minePlacement.row = new Random(0, minesMat.size - 1).int;
		minePlacement.col = new Random(0, minesMat.size - 1).int;
		minesMat.setElement(1, minePlacement.row, minePlacement.col);
    });
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
	  if(cell.classList.contains("flag")) {
		 removeIcon(cell, "flag");
	  }
	  addIcon(cell, "bomb");
   } else if(cell.classList.contains("burst")) {
	  removeIcon(cell, "bomb");
	  addIcon(cell, "burst");
   } else if(cell.classList.contains("flag")) {
	  removeIcon(cell, "flag");
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

const minesNearby = function(j, i) {
   let checkEls = [];

   getMinesNearby(j, i, (nextRow, nextCol) => {
	  checkEls = [...checkEls, minesMat.getElement(nextRow, nextCol)];
   }); 
   return checkEls;
};

const getMinesNearby = function(j, i, cb) {
   const row = j-1;
   const col = i-1;
   let nextRow;
   let nextCol;

   for(let rowIt = 0; rowIt < 3; rowIt++) {
	  for(let colIt = 0; colIt < 3; colIt++) {
		  nextRow = row + rowIt;
		  nextCol = col + colIt;
		  if(nextRow >= 0 && nextRow < numRows && nextCol >= 0 && nextCol < numCols)
			 cb(nextRow, nextCol);
		  else continue;
	  }
   }
};

const numMinesNear = function(j, i) {
   const checkEls = minesNearby(j, i); 
   return checkEls.reduce((totalMines, isMine) => totalMines + isMine);
};

export { createBoard, initMS, startTimer, stopTimer, placeMines, clickCell };
