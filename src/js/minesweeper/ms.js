import { createTimer, setRandNumsArr, createIcon } from "./utils.js";
import { numRows, numCols, ms_minesDisplay, restartMSBtn, msBoard } from "./game_incs.js";

let timerID;
let totalNumMines = 10;
const initMS = function(restartBtn, displays) {                                                         
   let secsRemaining = 60;
   timerID = createTimer(displays[1], secsRemaining);
   restartBtn.appendChild(createIcon("fa-solid fa-face-grin-wide"));
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
				this.classList.remove("flag");
				this.removeChild(this.firstChild);
				totalNumMines++;
			 }
		  } else {
			 const flagIcon = createIcon("fa-solid fa-flag");
			 this.appendChild(flagIcon);
			 this.classList.add("flag");
			 totalNumMines--;
		  }
		  if(totalNumMines < 10) totalNumMines = `0${totalNumMines}`;
		  ms_minesDisplay.textContent = totalNumMines;
	   }
	} else {
	   if(this.classList.contains("covered")) {
		   this.classList.remove("covered");
		   this.classList.add("uncovered");

		   if(this.classList.contains("mine")) {
			  this.classList.remove("mine");
			  this.classList.add("burst");
			  restartMSBtn.removeChild(restartMSBtn.lastChild);
			  restartMSBtn.appendChild(createIcon("fa-solid fa-face-dizzy"));
			  for(const child of msBoard.children) {
				 child.classList.remove("covered");
				 child.classList.add("uncovered");
				 if(child.classList.contains("mine")) {
					const bombIcon = createIcon("fa-solid fa-bomb");
					child.appendChild(bombIcon);
				 } else if(child.classList.contains("burst")) {
					const burstIcon = createIcon("fa-solid fa-burst");
					child.appendChild(burstIcon);
				 } else if(child.classList.contains("flag")) {
					child.classList.remove("flag");
					child.removeChild(child.firstChild);
				 }
				 child.removeEventListener("click", clickCell);
			  }

			  // stop the timer when the game is over
			  clearInterval(timerID);
		  }
	   }
	}
};

export { initMS, createBoard };
