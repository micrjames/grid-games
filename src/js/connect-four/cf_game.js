import { winningMessageText } from "./game_incs.js";
import { findRunOfFour } from "./utils.js";

const checkWin = function(mat, currentClass, pos) {
   	const matrix = mat[`${currentClass}`];

    // pos always intersects with some row and some column
    // , but only four pieces in a row or column
    const row = matrix.getRow(pos.row);
    if(findRunOfFour(row, pos.col)) return true;

    const column = matrix.getCol(pos.col);
    if(findRunOfFour(column, pos.row)) return true;

    // does pos intersect with any diagonal?
    // pos.col + k == pos.row
   
    // does pos intersect with any counter diagonal?
    // pos.row == matrix_size - pos.col + k

    return false;
};

const checkDraw = function(mat) {
    const yellowMat = mat.yellow.mat;
    const redMat = mat.red.mat;

    const flatYellowMat = yellowMat.flat();
    const flatRedMat = redMat.flat();

    const addedFlatMats = flatYellowMat.map((el, index) => el + flatRedMat[index]);

    return addedFlatMats.every(el => el == 1);
};

const endGame = function(msg) {
    winningMessageText.textContent = msg;
    return true;
};

export { checkWin, checkDraw, endGame };
