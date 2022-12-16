import { mat, board, CLASS, data, whichCell } from "./game_incs.js";
import { swapTurn, placePiece, getPieceWhere } from "./utils.js";
import { titleCase, removeClasses, addClasses, isObjEmpty } from "../utils/utils.js";
import { checkWin, checkDraw, endGame } from "./cf_game.js";

let yellowTurn;
let currentClass;
let gameOver = false;

const handleClick = function() {
    if(!gameOver) {
	   placePiece(whichCell.cell, currentClass, whichCell.pos);
	   if(checkWin(mat, currentClass, whichCell.pos)) {
		   const titledClass = titleCase(currentClass);
		   gameOver = endGame(`${titledClass} wins!`);
	   } else if(checkDraw(mat)) {
		   gameOver = endGame("There is a draw!");
	   }
	   
	   yellowTurn = swapTurn(yellowTurn);  
	   currentClass = yellowTurn ? CLASS.YELLOW : CLASS.RED;
	}
};

const handleHover = function() {
    if(isObjEmpty(whichCell)) {
	   yellowTurn = data.yellow;
	   currentClass = CLASS.YELLOW;
	}
    const { cell, row, col } = getPieceWhere(board.children, +this.id);
    whichCell.cell = cell;
	whichCell.pos = { row, col }
    addClasses(whichCell.cell, "try", currentClass);
};
 
const handleOut = function() {
    removeClasses(whichCell.cell, "try", currentClass);
};

const setOver = function(done) {
	gameOver = done;
};

export { handleClick, handleHover, handleOut, setOver };
