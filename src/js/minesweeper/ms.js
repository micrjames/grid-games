import { numRows, numCols, numMines, mineNumRange, cells, minesDisplay, msRestartBtn, secsRemaining } from "./game_incs.js";
import { addIcon, removeIcon, changeBtnIcon, switchClasses } from "../utils/utils.js";
import Matrix from "../utils/Matrix.js";
import { shuffle } from "../utils/shuffle.js";
import { range } from "../utils/range.js";
import { stopTimer } from "./ms_timer.js";

let minesMat;
let delsMat;
let totalNumMines;
const initMS = function(restartBtn, displays) {
    totalNumMines = numMines;
    if(restartBtn.children.length) removeIcon(restartBtn, "face-grin-wide");
	addIcon(restartBtn, "face-grin-wide");
    displays[0].textContent = totalNumMines;
    displays[1].textContent = secsRemaining;
    
    minesMat = placeMines();
    delsMat = new Matrix(minesMat.size);

    return minesMat;
};

const clickCell = function(event) {
   const [row, col] = enumCells(this);
   const numMinesNearby = numMinesNear(row, col);
   if(event.metaKey) {
	  if(totalNumMines > 0) {
		  manageFlag(this, minesDisplay);
	  }
   } else {
	  if(this.classList.contains("covered")) {
		 if(!numMinesNearby) {
			deleteCells(row, col);
			addNumOnCell(row, col);
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

const placeMines = function() {
    let minesMat = new Matrix(numCols);

    const matIdxArr = [...range(numRows * numCols)];
    const shuffledArray = shuffle(matIdxArr);
    const slicedAndShuffledArray = shuffledArray.slice(0, mineNumRange.length);
    
    slicedAndShuffledArray.forEach(place => {
	    const mineRow = Math.floor(place / numRows);
	    const mineCol = place % numCols;

	    minesMat.setElement(1, mineRow, mineCol);
	});
    
    return minesMat;
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
	  if(cell.classList.contains("flag")) {
		 removeIcon(cell, "flag");
	  }
	  addIcon(cell, "burst");
   } else if(cell.classList.contains("flag")) {
	  removeIcon(cell, "flag");
	}
};

const enumCells = function(cell) {
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
   console.log(minesMat);
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

const deleteCells = function(row, col) {
	getMinesNearby(row, col, (nextRow, nextCol) => {
	   delsMat.setElement({ row: nextRow, col: nextCol }, nextRow, nextCol);
	}); 
	delsMat.mat.forEach(delsRow => {
		delsRow.forEach(del => {
			if(del) {
				const cellIndex = del.row * numCols + del.col;
				switchClasses(cells[cellIndex], "covered", "uncovered");
			}
		});
	});
};

const addNumOnCell = function(row, col) {
   getMinesNearby(row, col, (nextRow, nextCol) => {
	   const numMinesNearPeriph = numMinesNear(nextRow, nextCol);
	   const cellIndex = nextRow * numCols + nextCol;
	   if(!cells[cellIndex].children.length)
		   addIcon(cells[cellIndex], `${numMinesNearPeriph}`, false, "solid");
	       cells[cellIndex].classList.add("numbers");
   }); 
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

export { initMS, placeMines, clickCell };
