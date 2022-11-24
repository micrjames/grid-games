import { board, CLASS } from "./game_incs.js";
import { mat } from "../incs.js";
import { titleCase } from "../utils/utils.js";

let circleTurn;
const handleClick = function(event) {
    const cell = this;// event.target;
    const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;

    const pos = getPos(cell);
    switch(currentClass) {
	    case CLASS.CIRCLE:
		   mat.circle.setElement(1, pos.row, pos.col);
		   break;
	    case CLASS.X:
		   mat.x.setElement(1, pos.row, pos.col);
		   break;
	}

    console.log(`circle matrix: ${mat.circle.mat}`);
    console.log(`x matrix: ${mat.x.mat}`);
	placeMark(cell, currentClass);
    if(checkWin(currentClass, pos)) {
	    const titledClass = titleCase(currentClass); 
	    alert(`${titledClass} wins!`);
	} else if(checkDraw(currentClass)) {
	    alert("There is a draw!");
	}

    swapTurn();
    setBoardHoverClass();
};

const setBoardHoverClass = function() {
    board.classList.remove(CLASS.X);
    board.classList.remove(CLASS.CIRCLE);

    if(circleTurn) board.classList.add(CLASS.CIRCLE);
    else board.classList.add(CLASS.X);
};

const placeMark = function(cell, currentClass) {
    cell.classList.add(currentClass);
};

const getPos = function(cell) {
    const pos = cell.dataset.pos;
    const splitPos = pos.split("-");
    return { row: +splitPos[0], col: +splitPos[1] }; 
};

const endGame = function(draw) {
};

const checkWin = function(currentClass, pos) {
    const matrix = mat[`${currentClass}`];

    console.log(matrix.getRow(pos.row));
    console.log(matrix.getCol(pos.col));
    // pos always intersects with some row and some column
    if(matrix.getRow(pos.row).every(el => el == 1)) return true;
    if(matrix.getCol(pos.col).every(el => el == 1)) return true; 
    
    // does pos intersect with diagonal?
    // pos.col = pos.row
    if(pos.col == pos.row){
	   if(matrix.diagonal.every(el => el == 1)) {
		  return true;
	   }
	}
    
    // (0, 2) (1, 1) (2, 0)
    // does pos intersect with counter diagonal?
    if(pos.row == (matrix.size - 1) - pos.col) {
	   if(matrix.counterDiagonal.every(el => el == 1)) {
		   return true;
	   }
	}
    return false;
};

const checkDraw = function(currentClass) {
    return false;
};

const swapTurn = function() {
    circleTurn = !circleTurn;
};

export { handleClick, setBoardHoverClass };
