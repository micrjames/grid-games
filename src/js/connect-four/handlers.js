import { board, CLASS } from "./game_incs.js";
import { swapTurn, placePiece, getPieceWhere } from "./utils.js";
import { removeClasses, addClasses } from "../utils/utils.js";

let yellowTurn = true;
let currentClass = "yellow";
let whichCell = {};
whichCell.pos = {};

const handleClick = function() {
    placePiece(whichCell.cell, currentClass, whichCell.pos);

    yellowTurn = swapTurn(yellowTurn);  
    currentClass = yellowTurn ? CLASS.YELLOW : CLASS.RED;
};

const handleHover = function() {
    const { cell, row, col } = getPieceWhere(board.children, +this.id);
    whichCell = {
	    cell,
	    pos: { row, col }
	};
    addClasses(whichCell.cell, "try", currentClass);
};
 
const handleOut = function() {
    removeClasses(whichCell.cell, "try", currentClass);
};

export { handleClick, handleHover, handleOut };
