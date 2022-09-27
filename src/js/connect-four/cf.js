import { cf_data } from "./game_incs.js";

let whichBoardChild;

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

    cf_data.yellow = !cf_data.yellow;
    whichBoardChild = null;
};

const handleHover = function() {
    const capID = +this.id;

    const theBoard = this.parentElement;
    const theBoardChildren = theBoard.children;

    for(const whichRow of [6, 5, 4, 3, 2, 1]) {
	   let childIndex = capID + whichRow * cf_data.numCols; 
	   whichBoardChild = theBoardChildren.item(childIndex);
	   console.log(whichRow);
	   if(!whichBoardChild.classList.contains("covered")) {
		   break;
	   }
	}
    whichBoardChild.classList.add("try");
    if(cf_data.yellow) whichBoardChild.classList.add("yellow");
    else whichBoardChild.classList.add("red");
};

const handleOut = function() {
   const theBoard = this.parentElement;
   const theBoardChildren = theBoard.children;
   for(const child of theBoardChildren) {
      if(child.classList.contains("try")) child.classList.remove("try");
   }
};

export { createEndCaps, createCells };
