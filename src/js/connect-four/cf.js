import { data, board, winningMessageText } from "./game_incs.js";
import { range } from "../utils/range.js";

let whichBoardChild;
let yellowTurn = true;

const createEndCaps = function(numCols) {
   const endCapFragment = document.createDocumentFragment();                                          
   for(let i = 0; i < numCols; i++) {
	  const endCap = document.createElement("div");
	  endCap.classList.add("col-end-cap");
	  endCap.id = i.toString();
	  endCap.addEventListener("click", handleClick)
	  endCap.addEventListener("mouseover", handleHover);
	  endCap.addEventListener("mouseout", handleOut);
	  endCapFragment.appendChild(endCap);
   }   

   return endCapFragment;
};

const createCells = function(numRows, numCols) {
   const cellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
	   const cell = document.createElement("div");
	   cell.classList.add("cell");
	   cellFragment.appendChild(cell);
   }  

   return cellFragment;
};

const handleClick = function() {
    whichBoardChild.classList.add("covered");

    swapPlayer();
    if(checkLose()) {
	    winningMessageText.textContent = "Game Over.";
	    endCap.removeEventListener("click", handleClick)
	    endCap.removeEventListener("mouseover", handleHover);
	    endCap.removeEventListener("mouseout", handleOut);
	}
    if(checkWin()) {
	    winningMessageText.textContent = "You win!";
	    endCap.removeEventListener("click", handleClick)
	    endCap.removeEventListener("mouseover", handleHover);
	    endCap.removeEventListener("mouseout", handleOut);
	}
};

const handleHover = function() {
    const capID = +this.id;

    const theBoard = this.parentElement;
    const theBoardChildren = theBoard.children;

    for(const whichRow of [6, 5, 4, 3, 2, 1]) {
	   let childIndex = capID + whichRow * data.numCols; 
	   whichBoardChild = theBoardChildren.item(childIndex);
	   if(!whichBoardChild.classList.contains("covered")) {
		   break;
	   }
	}
    whichBoardChild.classList.add("try");
    if(yellowTurn) whichBoardChild.classList.add("yellow");
    else whichBoardChild.classList.add("red");
};

const handleOut = function() {
   const theBoard = this.parentElement;
   const theBoardChildren = theBoard.children;
   for(const child of theBoardChildren) {
      if(child.classList.contains("try")) child.classList.remove("try");
   }
};

const checkLose = function() {
   let winningCells = [];
   for(const child of board.children) {
	   if(child.classList.contains("yellow") || child.classList.contains("red")) {
		   winningCells = [...winningCells, child];
	   }
   }

   const boardSize = data.numRows * data.numCols;
   if(winningCells.length == boardSize) 
	  return true;
   return false;
};

const checkWin = function() {
   for(const col of [...range(data.numCols - 3)]) {
	   for(const row of [...range(data.numRows - 3)]) {
	   }
   }
};

const swapPlayer = function() {
    yellowTurn = !yellowTurn;
};

export { createEndCaps, createCells };
