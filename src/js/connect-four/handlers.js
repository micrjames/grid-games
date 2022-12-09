import { board, CLASS } from "./game_incs.js";
import { swapTurn, placePiece, getPieceWhere } from "./utils.js";

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
    whichCell.cell.classList.add("try");
    whichCell.cell.classList.add(currentClass);
};
 
const handleOut = function() {
    if(whichCell.cell.classList.contains("try"))
	   whichCell.cell.classList.remove("try");
};

export { handleClick, handleHover, handleOut };
