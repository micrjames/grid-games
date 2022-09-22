import { numRows, numCols, minesweeperEl, msBoard, ms_minesDisplay, ms_countdownDisplay } from "./game_incs.js";

let totalNumMines = 10;

const setRandNumsArr = (numRandNums, gridSize, exceptionIndex) => {
   let randNumsArr = [];
   for(let i = 0; i <= numRandNums-1; i++) {
	  const randNum = Math.floor(Math.random() * gridSize);
	  if(randNumsArr.length) {
		 if(randNumsArr.some(num => num == randNum || num == exceptionIndex)) {
			i--;
			continue;
		 }
	  }
	  randNumsArr.push(randNum);
   }
   return randNumsArr;
};

const startMS = function() {
   ms_minesDisplay.textContent = totalNumMines;
   ms_countdownDisplay.textContent = "60";
   const MSCellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const MScell = document.createElement("div");
	   MScell.classList.add("cell");
	   MScell.classList.add("covered");
	   MSCellFragment.appendChild(MScell);

	   MScell.addEventListener("click", clickCell); 
   }  
   msBoard.appendChild(MSCellFragment);
}  

const addIcon = function(iconClasses) {
	const icon = document.createElement("i");

    const classes = iconClasses.split(" ");
    classes.forEach(item => {
	   icon.classList.add(item);
	});

    return icon;
};

const clickCell = function(event) {
	if(event.metaKey) { 
	   if(totalNumMines > 0) {
		  if(this.children.length) {
			 this.removeChild(this.firstChild);
			 totalNumMines++;
		  } else {
			 const icon = addIcon("fa-solid fa-flag");
			 this.appendChild(icon);
			 totalNumMines--;
		  }
		  if(totalNumMines < 10) totalNumMines = `0${totalNumMines}`;
		  ms_minesDisplay.textContent = totalNumMines;
	   }
	} else {
	   if(this.classList.contains("covered")) {
		   this.classList.remove("covered");
		   this.classList.add("uncovered");
	   }
	}
};

export { startMS };
