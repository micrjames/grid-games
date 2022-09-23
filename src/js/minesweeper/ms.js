import { createTimer, setRandNumsArr, addIcon, removeIcon, switchClasses } from "./utils.js";
import { numRows, numCols, ms_minesDisplay, restartMSBtn, msBoard } from "./game_incs.js";

let timer;
let totalNumMines = 10;
const initMS = function(restartBtn, displays) {                                                         
   let secsRemaining = 60;
   if(timer) timer.cancelTimer();
   timer = createTimer(displays[1], secsRemaining);
   if(!restartBtn.children.length) addIcon(restartBtn, "face-grin-wide");
   displays[0].textContent = totalNumMines;                         
   displays[1].textContent = secsRemaining;
												   
   return setRandNumsArr(10, numRows * numCols);
};

const createCell = function() {
   const cell = document.createElement("div");
   cell.classList.add("cell");
   cell.classList.add("covered");
   
   return cell;
};

const createBoard = function(randArr) {
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const cell = createCell();
       cellFragment.appendChild(cell);

       if(randArr.some(randItem => randItem == i)) {
           cell.classList.add("mine");
       }
 
       cell.addEventListener("click", clickCell);
   }

   return cellFragment;
};

const clickCell = function(event) {
	if(event.metaKey) { 
	   if(totalNumMines > 0) {
		  if(this.children.length) {
			 if(this.classList.contains("flag")) {
				removeIcon(this, "flag");
				totalNumMines++;
			 }
		  } else {
			 addIcon(this, "flag", true);
			 totalNumMines--;
		  }
		  if(totalNumMines < 10) totalNumMines = `0${totalNumMines}`;
		  ms_minesDisplay.textContent = totalNumMines;
	   }
	} else {
	   if(this.classList.contains("covered")) {
		   switchClasses(this, "covered", "uncovered");

		   if(this.classList.contains("mine")) {
			  switchClasses(this, "mine", "burst");
			  restartMSBtn.removeChild(restartMSBtn.lastChild);
			  addIcon(restartMSBtn, "face-dizzy");
			  for(const child of msBoard.children) {
				 switchClasses(child, "covered", "uncovered");
				 if(child.classList.contains("mine")) {
					addIcon(child, "bomb");
				 } else if(child.classList.contains("burst")) {
					addIcon(child, "burst");
				 } else if(child.classList.contains("flag")) {
					removeIcon(child, "flag");
				 }
				 child.removeEventListener("click", clickCell);
			  }

			  // stop the timer when the game is over
			  timer.cancelTimer();
		  }
	   }
	}
};

export { initMS, createBoard };
