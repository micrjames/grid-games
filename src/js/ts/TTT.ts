class Cell {   
    private cell: Element;  
    constructor(cellEl: Element, cb: () => void) {                      
	   this.cell = cellEl;   
       this.cell.addEventListener("click", () => {   
		  cb();
       });
    }
} 

interface CLASSES {
 [prop: string]: string;
}

export class TTT {
   private circleTurn: boolean;
   private _board: HTMLElement;
   private cellEls: HTMLCollection;
   private CLASS: CLASSES;

   constructor(board: HTMLElement) {
	  this.circleTurn = true;
	  this._board = board;
	  this.cellEls = board.children;
	  this.CLASS = {
		  X: "x",
		  CIRCLE: "circle"
	  };
	  this._board.classList.add("circle");
   }

   setMarks() {
	  for(let i = 0; i < this.cellEls.length; i++) {
		 const cell = new Cell(this.cellEls[i], () => {
			const currentClass = this.circleTurn ? this.CLASS.CIRCLE : this.CLASS.X;
			this.cellEls[i].classList.add(currentClass);
			this.circleTurn = !this.circleTurn;
			this._board.classList.remove(this.CLASS.X);
			this._board.classList.remove(this.CLASS.CIRCLE);

			if(this.circleTurn) this._board.classList.add(this.CLASS.CIRCLE);
			else this._board.classList.add(this.CLASS.X);
		 });
	  }
   }
}
