import { numRows, numCols, numMines, cells, minesDisplay, msRestartBtn, secsRemaining } from "./game_incs.js";
import { addIcon, removeIcon, changeBtnIcon, switchClasses } from "../utils/utils.js";
import { stopTimer } from "./ms_timer.js";
import { manageFlag, manageCellState, enumCells, deleteCells, addNumOnCell } from "./ms_game.js";
import { placeMines, numMinesNear } from "./ms_mines.js";

let minesMat;
let totalNumMines;
const initMS = function(restartBtn, displays) {
    totalNumMines = numMines;
    if(restartBtn.children.length) removeIcon(restartBtn, "face-grin-wide");
	addIcon(restartBtn, "face-grin-wide");
    displays[0].textContent = totalNumMines;
    displays[1].textContent = secsRemaining;
    
    minesMat = placeMines();

    return minesMat;
};

const clickCell = function(event) {
   const [row, col] = enumCells(cells, this);
   const numMinesNearby = numMinesNear(row, col, minesMat);
   if(event.metaKey) {
	  if(totalNumMines > 0) {
		  totalNumMines = manageFlag(this, minesDisplay, totalNumMines);
	  }
   } else {
	  if(this.classList.contains("covered")) {
		 if(!numMinesNearby) {
			deleteCells(cells, row, col, minesMat);
			addNumOnCell(cells, row, col, minesMat);
		 } else {
			switchClasses(this, "covered", "uncovered");
			if(!this.classList.contains("mine")) {
			   addIcon(this, `${numMinesNearby}`, false, "solid");
			   this.classList.add("numbers");
			}
		 }
		 doGameOver(this);
	  }
   }
};

const doGameOver = function(cell) {
   if(checkWin()) {
	   changeBtnIcon(msRestartBtn, "face-grin-stars");
	   for(const child of cells) {
		   child.removeEventListener("click", clickCell);
	   }
	   // stop the timer when the game is over
	   stopTimer();
   } else {
	  if(cell.classList.contains("mine")) {
		  switchClasses(cell, "mine", "burst");
		  changeBtnIcon(msRestartBtn, "face-dizzy");
		  for(const child of cells) {
			  manageCellState(child);	
			  child.removeEventListener("click", clickCell);
		  }

		  // stop the timer when the game is over
		  stopTimer();
	  }
   }
};

const checkWin = function() {
   let winningCells = [];
   for(const child of cells) {
	   if(child.classList.contains("flag") || child.classList.contains("uncovered")) {
		   winningCells = [...winningCells, child];
	   }
   }

   const boardSize = numRows * numCols;
   if(winningCells.length == boardSize) 
	  return true;
   return false;
};

export { initMS, clickCell };
