import { numRows, numCols, minesweeperEl, msBoard, ms_minesDisplay, ms_countdownDisplay, restartMSBtn } from "./game_incs.js";

let totalNumMines = 10;

const setRandNumsArr = (numRandNums, gridSize) => {
   let randNumsArr = [];
   for(let i = 0; i <= numRandNums-1; i++) {
	  const randNum = Math.floor(Math.random() * gridSize);
	  if(randNumsArr.length) {
		 if(randNumsArr.some(num => num == randNum)) {
			i--;
			continue;
		 }
	  }
	  randNumsArr.push(randNum);
   }
   return randNumsArr;
};

const startMS = function() {
   restartMSBtn.appendChild(addIcon("fa-solid fa-face-grin-wide"));
   const randCellsArr = setRandNumsArr(10, numRows * numCols);
   ms_minesDisplay.textContent = totalNumMines;
   ms_countdownDisplay.textContent = "60";
   const MSCellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const MScell = document.createElement("div");
	   MScell.classList.add("cell");
	   MScell.classList.add("covered");
	   MSCellFragment.appendChild(MScell);

	   if(randCellsArr.some(randItem => randItem == i)) {
		  MScell.classList.add("mine");
	   }

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
			 const flagIcon = addIcon("fa-solid fa-flag");
			 this.appendChild(flagIcon);
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
			  restartMSBtn.removeChild(restartMSBtn.lastChild);
			  restartMSBtn.appendChild(addIcon("fa-solid fa-face-dizzy"));
			  for(const child of msBoard.children) {
				 child.classList.remove("covered");
				 child.classList.add("uncovered");
				 if(child.classList.contains("mine")) {
					const bombIcon = addIcon("fa-solid fa-bomb");
					child.appendChild(bombIcon);
				 }
			  }
		   }
	   }
	}
};

export { startMS };
