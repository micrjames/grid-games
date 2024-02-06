class Matrix {
   private _mat: number[][];
   private N: number;

   constructor(N: number) {
	   this.N = N;
	   this.clear();
   }

   static fromArray(array: number[][]): Matrix {
	   const N = array.length;
	   const arrMat = new Matrix(N);
	   arrMat._mat = array;

	   return arrMat;
   }

   private set() {
	   for(let i = 0; i < this.N; i++) {
		   this._mat = [...this._mat, Array(this.N).fill(0)];
	   }
   }

   clear() {
	   this._mat = [];
	   this.set();
   }

   get size(): number {
	   return this.N;
   }

   get mat()  {
	   return this._mat;
   }

   setElement(val: number, j: number, i: number) {
	  this._mat[j][i] = val;
   }
   getElement(j: number, i: number): number {
	  return this._mat[j][i];
   }

   setRow(val: any[], which: number) {
	  this._mat[which] = val;
   }
   getRow(which: number): any[] {
	  return this._mat.filter((_, index) => index == which).flat();
   }
   getCol(which: number): any[] {
	  return this._mat.map(row => row[which]);
   }

   getDiagonal(k: number) {
	   let diagonal = [];
	   let pivot = Math.abs(k);
	   if (k >= 0) {
		  for(let rowIndex = 0; rowIndex < this.N; rowIndex++) {
			  for(let colIndex = 0; colIndex < this.N; colIndex++) {
					if(colIndex == pivot) {
					   pivot++;
					   diagonal = [...diagonal, this._mat[rowIndex][colIndex]];

					   break;
					}
			  }
		  }
	   } else {
		  for(let colIndex = 0; colIndex < this.N; colIndex++) {
			  for(let rowIndex = 0; rowIndex < this.N; rowIndex++) {
					if(rowIndex == pivot) {
					   pivot++;
					   diagonal = [...diagonal, this._mat[rowIndex][colIndex]];

					   break;
					}
			  }
		  }
	   }

	   return diagonal;
   }
   getCounterDiagonal(k: number) {
	   const counterMatrix = new Matrix(this.N);
	   this._mat.forEach((row, index) => {
		   const revRow = row.reduce((acc, item) => [item].concat(acc), []);
		   counterMatrix.setRow(revRow, index);
	   });

	   const reverseCounterDiagonal = counterMatrix.getDiagonal(k);
	   const counterDiagonal = reverseCounterDiagonal.reverse();
	   return counterDiagonal;
   }
   get main_diagonal() {
	   return this.getDiagonal(0);
   }
   get main_counterDiagonal() {
	   return this.getCounterDiagonal(0);
   }

   transpose(): Matrix {
	  const tMat = new Matrix(this.N);

	  for(let j = 0; j < this.N; j++) {
		  for(let i = 0; i < this.N; i++) {
			  tMat.mat[j][i] = this._mat[i][j];
		  }
	  }
	  return tMat;
   }

   add(thatMat: Matrix): Matrix {
	  const addedArray = this._mat.map((row, rowIndex) => {
		   return row.map((el, elIndex) => {
			   return el + thatMat.mat[rowIndex][elIndex];
		   });
	   });
	  return Matrix.fromArray(addedArray);
   }
   multiply(thatMat: Matrix): Matrix {
	  const multArray = this._mat.map((row, rowIndex) => row.map((_, colIndex) => {
		  const row = this.getRow(rowIndex);
		  const col = thatMat.getCol(colIndex);
		  return row.reduce((accumulator, currentValue, currentIndex) => {
			 return currentValue * col[currentIndex] + accumulator;
		  }, 0);
	  })); 
	  return Matrix.fromArray(multArray);
   }
   multiply_scalar(scalar: number): Matrix {
	  return Matrix.fromArray(this._mat.map(row => row.map(el => scalar * el)));
   }

   toString(): string {
	  let mstring = '';

	  this._mat.forEach((row, rowIndex) => {
		mstring += '[\t';
		row.forEach((_, colIndex) => {
		   mstring += this._mat[rowIndex][colIndex] + '\t';
		});
		mstring += ']\n';
	  });

	  return mstring;
   }
}

interface POS {
	[prop: string]: number
}
class Cell {   
    private _cell: HTMLElement;  
	private _pos: POS;
    constructor(cellEl: HTMLElement) {                      
	   this._cell = cellEl;
	   this._pos = {
			row: -1,
			col: -1
	   }; 
    }
	handleClick(cb: () => void) {
       this._cell.addEventListener("click", () => {   
		  cb();
       }, { once: true });
	}
	get pos(): POS {
		const pos = this._cell.dataset.pos;
		const splitPos = pos.split("-");
		this._pos = { row: +splitPos[0], col: +splitPos[1] };
		return this._pos;
	}
	set pos(pos: POS) {
		this._pos = pos;
	}
	get cell(): Element {
	   return this._cell;
	}
} 

interface CLASSES {
   [prop: string]: string;
}
interface MATS {
   [prop: string]: Matrix;
}

export class TTT {
   private circleTurn: boolean;
   private gameOver: boolean;
   private _board: HTMLElement;
   private cellEls: HTMLCollection;
   private cells: Cell[] = [];
   private CLASS: CLASSES;
   private MAT: MATS;

   constructor(board: HTMLElement) {
	  this.circleTurn = true;
	  this.gameOver = false;
	  this._board = board;
	  this.cellEls = board.children;
	  for(let i = 0; i < this.cellEls.length; i++) {
	  	  this.cells.push(new Cell(this.cellEls[i] as HTMLElement));
	  }
	  this.CLASS = {
		  X: "x",
		  CIRCLE: "circle"
	  };
	  this.MAT = {
		 X: new Matrix(3),
		 CIRCLE: new Matrix(3)
	  };

	  this.start();
   }

   setMarks() {
	  for(let i = 0; i < this.cells.length; i++) {
		 this.cells[i].handleClick(() => {
			if(!this.gameOver) {
				const currentClass = this.circleTurn ? this.CLASS.CIRCLE : this.CLASS.X;
				this.cells[i].pos = this.cells[i].pos;
				console.log(this.cells[i].pos)
				console.log('circle turn?', this.circleTurn);
				this.setMark(i, currentClass);
				if(this.checkWin(currentClass, this.cells[i].pos)) {
					const titledClass = titleCase(currentClass);
					this.endGame(`${titledClass} wins!`);
				} else if(this.checkDraw()) {
					console.log("There is a draw!");
					this.endGame("There is a draw!");
				}
			
			    this.circleTurn = !this.circleTurn;
			    this.setBoardHoverClass();
			 }
		 });
	  }
   }
   setMark(which: number, className: string) {
	  switch(className) {
		   case this.CLASS.CIRCLE:
			  this.MAT.CIRCLE.setElement(1, this.cells[which].pos.row, this.cells[which].pos.col);
		   break;
		   case this.CLASS.X:
			  this.MAT.X.setElement(1, this.cells[which].pos.row, this.cells[which].pos.col);
           break;
	  }
	  console.log(this.MAT.X.toString());
	  console.log(this.MAT.CIRCLE.toString());
	  console.log('circle turn?', this.circleTurn);
	  this.cells[which].cell.classList.add(className);
   }

   setup() {
	  for(let i = 0; i < this.cells.length; i++) {
	    if(this.cells[i].cell.classList.contains(this.CLASS.X)) this.cells[i].cell.classList.remove(this.CLASS.X);
	    else if(this.cells[i].cell.classList.contains(this.CLASS.CIRCLE)) this.cells[i].cell.classList.remove(this.CLASS.CIRCLE);
	  }

	  this.toggleUIEls(this._board.nextElementSibling);
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

   checkWin(currentClass: string, pos: POS) {
	  const matrix = this.MAT[`${currentClass.toUpperCase()}`];
 
      // pos always intersects with some row and some column
      if(matrix.getRow(pos.row).every(el => el == 1)) return true;
      if(matrix.getCol(pos.col).every(el => el == 1)) return true; 
     
      // does pos intersect with diagonal?
      // pos.col == pos.row
      if(pos.col == pos.row) {
        if(matrix.main_diagonal.every(el => el == 1)) return true;
      }
   
      // does pos intersect with counter diagonal?
      // pos.row == matrix_size - pos.col
      if(pos.row == ((matrix.size - 1) - pos.col)) {
        if(matrix.main_counterDiagonal.every(el => el == 1)) {
            return true;
	    }
      }
 
      return false;
   }

   checkDraw() {
      const circleMat = this.MAT.CIRCLE.mat;                                                                   
      const xMat = this.MAT.X.mat;
     
      const flatCircleMat = circleMat.flat();
      const flatXMat = xMat.flat();

      const addedFlatMats = flatCircleMat.map((el, index) => el + flatXMat[index]);
 
      return addedFlatMats.every(el => el == 1);
    }
    endGame(msg: string) {
	  this.gameOver = !this.gameOver;
	  this.toggleUIEls(this._board.nextElementSibling, msg);
    }

   	toggleUIEls(winningMsg: Element, msg?: string) {
	   const instructionsMsg = winningMsg?.nextElementSibling;
	   if(this.gameOver) {
		   const winningMsgText = winningMsg.children[0];
		   winningMsgText.textContent = msg;
		   changeSectionVisibility(winningMsg, instructionsMsg);
	   } else {
		   changeSectionVisibility(instructionsMsg, winningMsg);
	   }
   }
}

const changeSectionVisibility = function(context1, context2) {                                        
    context1.classList.remove("hidden");
    context2.classList.add("hidden");
};
const titleCase = str => {
	const strArr = str.split(' ');
    const titled = strArr.map(word => {
	    const upperStart = word[0].toUpperCase();
	    const restWord = word.slice(1, str.length);
	    return upperStart + restWord.toLowerCase();
	}); 
    const titledStr = titled.join(' ');
    return titledStr;
};
