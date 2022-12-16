import { data, CLASS, mat, whichCell, winningMessageText } from "./game_incs.js";
import { range } from "../utils/range.js";
import { removeProperties } from "../utils/utils.js";
import { remZeroes, removedZeroesIdx, getArrRuns, matchRun } from "./array_ops.js"; 

const swapTurn = function(turn) {
    turn = !turn;
    return turn;
}; 

const clearVals = function() {
    mat.yellow.clear();
    mat.red.clear();
    removeProperties(whichCell);
    winningMessageText.textContent = "";
};

const placePiece = function(cell, currentClass, pos) {
    switch(currentClass) {
	    case CLASS.YELLOW:
		   mat.yellow.setElement(1, pos.row, pos.col);
		   break;
	    case CLASS.RED:
		   mat.red.setElement(1, pos.row, pos.col);
		   break;
	}
    cell.classList.add("covered");
    cell.classList.add(currentClass);
};

const getPieceWhere = function(cells, col) {
    let whichCell;
    let row;
    for(const whichRow of [...range(data.numRows)].reverse()) {        
        const childIndex = col + (whichRow+1) * data.numCols; 
        whichCell = cells.item(childIndex);
	    row = whichRow;
        if(!whichCell.classList.contains("covered")) break;
    }

    return { cell: whichCell, row, col };
};

const findRunOfFour = function(arr, runIndex) {
	const idxArr = remZeroes(arr);
	const divPts = removedZeroesIdx(idxArr);

	const runsArr = getArrRuns(idxArr);

    const targetRun = 4;
	return matchRun(runsArr, targetRun, runIndex);
};

export { swapTurn, placePiece, getPieceWhere, clearVals, findRunOfFour }; 
