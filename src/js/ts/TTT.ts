class Cell {   
    private _cell: Element;  
    constructor(cellEl: Element) {                      
	   this._cell = cellEl;   
    }
	handleClick(cb: () => void) {
       this._cell.addEventListener("click", () => {   
		  cb();
       }, { once: true });
	}
	get cell(): Element {
	   return this._cell;
	}
} 

interface CLASSES {
 [prop: string]: string;
}

export class TTT {
   private circleTurn: boolean;
   private gameOver: boolean;
   private _board: HTMLElement;
   private cellEls: HTMLCollection;
   private cells: Cell[] = [];
   private CLASS: CLASSES;

   constructor(board: HTMLElement) {
	  this.circleTurn = true;
	  this.gameOver = false;
	  this._board = board;
	  this.cellEls = board.children;
	  for(let i = 0; i < this.cellEls.length; i++) {
	  	  this.cells.push(new Cell(this.cellEls[i]));
	  }
	  this.CLASS = {
		  X: "x",
		  CIRCLE: "circle"
	  };

	  this.start();
   }

   setMarks() {
	  for(let i = 0; i < this.cells.length; i++) {
		 this.cells[i].handleClick(() => {
			const currentClass = this.circleTurn ? this.CLASS.CIRCLE : this.CLASS.X;
			// const pos = getPos(cell);
			if(!this.gameOver) this.setMark(i, currentClass);
			// if(checkWin(mat, currentClass, pos)) {
			// 	const titledClass = titleClass(currentClass));
			// 	gameOver = endGame(`${titledClass} wins!`, gameOver);
			//  } else if(checkDraw(mat))
			//  gameOver = endGame("There is a draw!", gameover);
			if(!this.gameOver) {
			   this.circleTurn = !this.circleTurn;
			   this.setBoardHoverClass();
			}
		 });
	  }
   }
   setMark(which: number, className: string) {
	  switch(className) {
		   case this.CLASS.CIRCLE:
			  // mat.circle.setElement(1, pos.row, pos.col);
		   break;
		   case this.CLASS.X:
			  // mat.x.setElement(1, pos.row, pos.col);
           break;
	  }
	  this.cells[which].cell.classList.add(className);
   }

   setup() {
	  for(let i = 0; i < this.cells.length; i++) {
	    if(this.cells[i].cell.classList.contains(this.CLASS.X)) this.cells[i].cell.classList.remove(this.CLASS.X);
	    else if(this.cells[i].cell.classList.contains(this.CLASS.CIRCLE)) this.cells[i].cell.classList.remove(this.CLASS.CIRCLE);
	  }

	  // toggleUIEls(false);
   }
   setBoardHoverClass() {
	  this._board.classList.remove(this.CLASS.X);
	  this._board.classList.remove(this.CLASS.CIRCLE);

	  if(this.circleTurn) this._board.classList.add(this.CLASS.CIRCLE);
	  else this._board.classList.add(this.CLASS.X);
   }
   start() {
	  this.setup();
	  this.setBoardHoverClass();
   }
   reset() {
	  this.setup();

	  // mat.circle.clear();
	  // mat.x.clear();

	  this.gameOver = false;
   }

   endGame(msg: string, gameOver: boolean) {
	   // gameOver = true;
	   // winningMessageText.textContent = msg;
	   // toggleUIEls(gameOver);
   };
/*
   const toggleUIEls = function(gameDone) {
	   if(gameDone) {
		   changeSectionVisibility(winningMessageEl, instructionsMessageEl);
	   } else {
		   changeSectionVisibility(instructionsMessageEl, winningMessageEl);
	   }
   }
*/
}
