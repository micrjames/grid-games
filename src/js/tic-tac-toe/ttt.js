import { board, CLASS, mat, winningMessageEl, winningMessageText, instructionsMessageEl } from "./game_incs.js";
import { titleCase } from "../utils/utils.js";

let circleTurn;
let gameOverMsg;
let gameOver = false;

const handleClick = function(event) {
    const cell = this; // event.target;
	const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;
	const pos = getPos(cell);

	if(!gameOver) placeMark(cell, currentClass, pos);
	if(checkWin(currentClass, pos)) {
		const titledClass = titleCase(currentClass); 
		gameOverMsg = `${titledClass} wins!`;
		endGame(gameOverMsg);
	} else if(checkDraw(currentClass)) {
		gameOverMsg = "There is a draw!";
		endGame(gameOverMsg);
	}

    if(!gameOver) {
	   swapTurn();
	   setBoardHoverClass();
	}
};

const setBoardHoverClass = function() {
    board.classList.remove(CLASS.X);
    board.classList.remove(CLASS.CIRCLE);

    if(circleTurn) board.classList.add(CLASS.CIRCLE);
    else board.classList.add(CLASS.X);
};

const placeMark = function(cell, currentClass, pos) {
    switch(currentClass) {
	    case CLASS.CIRCLE:
		   mat.circle.setElement(1, pos.row, pos.col);
		   break;
	    case CLASS.X:
		   mat.x.setElement(1, pos.row, pos.col);
		   break;
	}
    cell.classList.add(currentClass);
};

const getPos = function(cell) {
    const pos = cell.dataset.pos;
    const splitPos = pos.split("-");
    return { row: +splitPos[0], col: +splitPos[1] }; 
};

const endGame = function(msg) {
    gameOver = true;
    winningMessageText.textContent = msg;
    toggleUIEls(gameOver);
};

const checkWin = function(currentClass, pos) {
    const matrix = mat[`${currentClass}`];

    // pos always intersects with some row and some column
    if(matrix.getRow(pos.row).every(el => el == 1)) return true;
    if(matrix.getCol(pos.col).every(el => el == 1)) return true; 
    
    // does pos intersect with diagonal?
    // pos.col == pos.row
    if(pos.col == pos.row) {
	   if(matrix.diagonal.every(el => el == 1)) return true;
	}

    // does pos intersect with counter diagonal?
    // pos.row == matrix_size - pos.col
    if(pos.row == ((matrix.size - 1) - pos.col)) {
	   if(matrix.counterDiagonal.every(el => el == 1)) {
		   return true;
	   }
	}

    return false;
};

const checkDraw = function() {
    const circleMat = mat.circle.mat;
    const xMat = mat.x.mat;
    
    const flatCircleMat = circleMat.flat();
    const flatXMat = xMat.flat();

    const addedFlatMats = flatCircleMat.map((el, index) => el + flatXMat[index]);

    return addedFlatMats.every(el => el == 1);
};

const swapTurn = function() {
    circleTurn = !circleTurn;
};

const toggleUIEls = function(gameDone) {
    if(gameDone) {
	   winningMessageEl.classList.remove("hidden");
       instructionsMessageEl.classList.add("hidden");
	} else {
	   winningMessageEl.classList.add("hidden");
       instructionsMessageEl.classList.remove("hidden");
	}
}

const setOver = function(done) {
    gameOver = done;
};

export { handleClick, setBoardHoverClass, toggleUIEls, setOver };
