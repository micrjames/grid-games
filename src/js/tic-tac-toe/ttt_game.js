import { changeSectionVisibility } from "../utils/utils.js";
import { CLASS, winningMessageEl, instructionsMessageEl, winningMessageText } from "./game_incs.js";

const toggleUIEls = function(gameDone) {
    if(gameDone) {
	    changeSectionVisibility(winningMessageEl, instructionsMessageEl);
    } else {
	    changeSectionVisibility(instructionsMessageEl, winningMessageEl);
    }
}

const checkWin = function(mat, currentClass, pos) {
    const matrix = mat[`${currentClass}`];
 
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
};

const checkDraw = function(mat) {
    const circleMat = mat.circle.mat;                                                                   
    const xMat = mat.x.mat;
     
    const flatCircleMat = circleMat.flat();
    const flatXMat = xMat.flat();

    const addedFlatMats = flatCircleMat.map((el, index) => el + flatXMat[index]);
 
    return addedFlatMats.every(el => el == 1);
};

const endGame = function(msg, gameOver) {
    gameOver = true;
    winningMessageText.textContent = msg;
    toggleUIEls(gameOver);

    return gameOver;
};

const setBoardHoverClass = function(board, circleTurn, CLASS) {
    board.classList.remove(CLASS.X);
    board.classList.remove(CLASS.CIRCLE);
 
    if(circleTurn) board.classList.add(CLASS.CIRCLE);
    else board.classList.add(CLASS.X);
};

const placeMark = function(mat, cell, currentClass, pos) {
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
 
export { toggleUIEls, checkWin, checkDraw, endGame, setBoardHoverClass, placeMark };
