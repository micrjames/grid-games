class Cell {
   private cell: Element;
   constructor(cellEl: Element, cb: () => void) {
	  this.cell = cellEl; 
	  this.cell.addEventListener("click", () => {
		 cb();
	  });
   }
}
