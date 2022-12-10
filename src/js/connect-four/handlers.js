import { board, CLASS, data, whichCell } from "./game_incs.js";
import { swapTurn, placePiece, getPieceWhere } from "./utils.js";
import { removeClasses, addClasses, isObjEmpty } from "../utils/utils.js";

let yellowTurn;
let currentClass;

const handleClick = function() {
    placePiece(whichCell.cell, currentClass, whichCell.pos);

    yellowTurn = swapTurn(yellowTurn);  
    currentClass = yellowTurn ? CLASS.YELLOW : CLASS.RED;
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

export { handleClick, handleHover, handleOut };
