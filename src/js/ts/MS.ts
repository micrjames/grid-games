class Random {
    // "number" and "integer" functions returns are inclusive of max and min
    private minimum: number;
    private maximum: number;

    constructor(minimum:number = -1, maximum: number = -1) {
	    this.minimum = minimum;
	    this.maximum = maximum;
	}

    set min(value: number) {
	    this.minimum = value;
	}
    get min(): number{
	    return this.minimum;
	}
    set max(value: number) {
	    this.maximum = value;
	}
    get max(): number {
	    return this.maximum;
	}

    get number(): number {
		return Math.random() * (this.maximum - this.minimum + 1) + this.minimum;
	}
    get integer(): number {
		return Math.floor(this.number);
	}
	get zeroOrOne(): number {
	    return Math.round(Math.random());
	}
    choice(nums: number[]): number {
	    this.minimum = 0;
	    this.maximum = nums.length - 1;
		
	    return nums[this.integer];
	}
	static populate(n: number, start: number = 0, end: number = 100): number[] {
	   return Array.from({length: n}, _ => {
		  const randNum = new Random(start, end);
		  return randNum.integer;
	   });
	}
}

class Range implements Iterable<number> {
   private startPoint: number;
   private endPoint: number;
   private step: number;

   constructor(end: number, start=0, step=1) {
	  this.startPoint = start - step;
	  this.endPoint = end;
	  this.step = step;
   }

   // Symbol.iterator makes an iterator
   // * makes it a generator
   *[Symbol.iterator](): IterableIterator<number> {
	  while(this.startPoint < this.endPoint - this.step)
		 // yield a value
		 yield this.startPoint += this.step; 
   }
};

const shuffle = (array: number[]): number[] => {
    // shuffle is done in place
    const randNum = new Random(0);
    let j: number;
    for(let i = array.length-1; i > 0; i--) {
		randNum.max = i;
		j = randNum.integer;
	    
	    [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

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

class Timer {
    protected timerID: ReturnType<typeof setInterval>;
    protected interval: number;

    constructor(interval: number) {
	   this.interval = interval;
	}

    start(cb: () => void) {
	    this.timerID = setInterval(cb, this.interval);
	}

    cancel() {
	    clearInterval(this.timerID);
	}
}

export class Countdown extends Timer {
   private secsRemaining: number;

   constructor(secsRemaining: number, doEachSec?: (remainingTime: number) => void, doAtEnd?: () => void) {
	  super(1000);
	  this.secsRemaining = secsRemaining;
	  super.start(() => {
		 this.secsRemaining--;
		 if(doEachSec) doEachSec(this.secsRemaining);
		 if(this.secsRemaining == 0) {
			super.cancel();
				 
			// countdown is over when the timer clock runs out
			if(doAtEnd) doAtEnd();
		 }
	  });
   }
   get seconds(): number {
	  return this.secsRemaining;
   }
}

class Cell {
   private cell: Element;
   constructor(...classNames: string[]) {
	  this.cell = document.createElement("div");
	  for(const className of classNames) {
		 this.cell.classList.add(className);
		 this.cell.addEventListener("click", () => {
			if(this.cell.classList.contains("covered")) {
			   switchIcons(this.cell, ["covered"], ["uncovered"]);
			   if(this.cell.classList.contains("mine")) {
				  switchIcons(this.cell, ["mine"], ["burst"]);
				  addIcon(this.cell, "burst", true, "solid");
			   }
			}
		 });
	  }
   }

   add(context: DocumentFragment) {
	  context.appendChild(this.cell);
   }
}
class Cells {
   private _cells: DocumentFragment;
   private num: number;
   constructor(num: number) {
	  this.num = num;
	  this._cells = document.createDocumentFragment();
   }
   set() {
	  for(let i = 0; i < this.num; i++) {
		 const cell = new Cell("cell", "covered");
		 cell.add(this._cells);
	  }
   }
   add(context: Element) {
	  context.appendChild(this._cells);
   }
   get cells() {
	  return this._cells.children;
   }
}

class Board {
   private board: Element;
   private cells: Cells;
   private size: number;
   constructor(board: Element, size: number) {
	  this.board = board;
	  this.size = size;
	  this.cells = new Cells(size);
   }

   create() {
	  this.cells.set();
	  this.cells.add(this.board);
   }

   setMines(minesMat: Matrix, num: number) {
	  const numRows = Math.sqrt(this.size);
	  const numCols = numRows;
	  const mineNumRange = [...new Range(num)];
	  const matIdxArr = [...new Range(this.size)];                                                                   
	  const shuffledArray = shuffle(matIdxArr);
	  const slicedAndShuffledArray = shuffledArray.slice(0, mineNumRange.length);
									   
	  slicedAndShuffledArray.forEach(place => { 
		  const mineRow = Math.floor(place / numRows);
		  const mineCol = place % numCols;

		  minesMat.setElement(1, mineRow, mineCol);
		  this.board.children[place].classList.add("mine");
	  });
   }

   reset() {
	  while(this.board.firstChild)
		 this.board.removeChild(this.board.lastChild);
   }
}


export class MS {                                                         
	private countdownDisplay: Element;
	private minesDisplay: Element;
	private gameBoard: Element;
	private boardResetBtn: Element;
	private boardResetBtnIcon: Element;
	private winningMsg: Element;
	private instructionsMsg: Element;
	private countdown: Countdown;
	private minesMat: Matrix;
	private totalSeconds: number;

	private board: Board;
    constructor(game: HTMLElement, n: number) {
	   const gameInterface = game.firstElementChild;                                      
	   this.gameBoard = gameInterface.nextElementSibling;
	   this.countdownDisplay = gameInterface.children[2];
	   this.totalSeconds = 10;
	   this.minesDisplay = gameInterface.children[0];

	   const btnGroup = gameInterface.children[1];
	   this.boardResetBtn = btnGroup.firstElementChild;
	   this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;

	   this.winningMsg = game.children.namedItem("winning-message");
	   this.instructionsMsg = this.winningMsg.nextElementSibling;

	   this.minesMat = new Matrix(n);
	   this.board = new Board(this.gameBoard, n*n);

	   this.start(this.totalSeconds.toString(), "10");
    }
	
	start(seconds: string, numMines: string) {
	   this.board.create();
	   this.board.setMines(this.minesMat, 10);
	   console.log(this.minesMat.toString());
	   this.minesDisplay.textContent = numMines;
	   this.countdownDisplay.textContent = seconds;
	   this.countdown = new Countdown(this.totalSeconds, remainingTime => {
           if(this.countdown.seconds < 10) seconds = `0${remainingTime}`;                       
           else seconds = remainingTime.toString();
           this.countdownDisplay.textContent = seconds;
       }, () => {
		   switchIcons(this.boardResetBtnIcon, ["fa", "fa-smile-o"], ["far", "fa-dizzy"]);

           this.instructionsMsg.classList.add("hidden");
           const resetHandler = () => {
			  switchIcons(this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);

			  this.board.reset();
			  this.minesMat.clear();

			  this.boardResetBtn.removeEventListener("click", resetHandler);
			  this.instructionsMsg.classList.remove("hidden");

			  this.start(this.totalSeconds.toString(), "10");
			  this.board.setMines(this.minesMat, 10);
		   };
		   this.boardResetBtn.addEventListener("click", resetHandler);
	   });
	}
} 

const switchIcons = (context: Element, iconClassName1: string[], iconClassName2: string[]) => {
	context.classList.remove(iconClassName1[0]);
	context.classList.remove(iconClassName1[1]);
	context.classList.add(iconClassName2[0]);
	context.classList.add(iconClassName2[1]);
};
const createIcon = function(iconClasses: string) {
   const icon = document.createElement("i");
	
   const classes = iconClasses.split(" ");
   classes.forEach(item => {
	  icon.classList.add(item);
   });
	
   return icon;
};

const addIcon = function(context: Element, name: string, className=false, type='regular') {
   const icon = createIcon(`fa-${type} fa-${name}`);
   context.appendChild(icon);
   if(className) context.classList.add(`${name}`);

   return icon;
};

const removeIcon = function(context: Element, name: string) {
   context.classList.remove(`${name}`);                                                            
   context.removeChild(context.lastChild);
};
