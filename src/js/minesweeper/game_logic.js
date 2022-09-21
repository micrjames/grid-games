import { numRows, numCols, minesweeperEl, msBoard } from "./game_incs.js";

const startMS = function() {
   const MSCellFragment = document.createDocumentFragment();
   for(let i = 0; i < numRows * numCols; i++) {
       const MScell = document.createElement("div");
	   MScell.classList.add("cell");
	   MScell.classList.add("covered");
	   MSCellFragment.appendChild(MScell);

	   MScell.addEventListener("click", function() {
			 // this.classList.toggle("covered");
			 // this.classList.toggle("uncovered");
		     const icon = addIcon("fa-solid fa-flag");
		     
		     this.appendChild(icon);
	   });
   }  
   msBoard.appendChild(MSCellFragment);
}  

const addIcon = function(iconClasses) {
	const icon = document.createElement("i");

    const classes = iconClasses.split(" ");
    classes.forEach(item =>  {
	   icon.classList.add(item);
	});

    return icon;
};

export { startMS };
