import { board, CLASS, mat } from "./game_incs.js";
import { titleCase } from "../utils/utils.js";
import { checkWin, checkDraw, endGame, setBoardHoverClass, placeMark } from "./ttt_game.js";
import { swapTurn, getPos } from "./utils.js";

let circleTurn = true;
let gameOver = false;

const handleClick = function(event) {
    const cell = this; // event.target;
	const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;
	const pos = getPos(cell);

	if(!gameOver) placeMark(mat, cell, currentClass, pos);
	if(checkWin(mat, currentClass, pos)) {
		const titledClass = titleCase(currentClass); 
		gameOver = endGame(`${titledClass} wins!`, gameOver);
	} else if(checkDraw(mat)) {
		gameOver = endGame("There is a draw!", gameOver);
	}

    if(!gameOver) {
	   circleTurn = swapTurn(circleTurn);
	   setBoardHoverClass(board, circleTurn, CLASS);
	}
};
const setOver = function(done) {
    gameOver = done;
};

export { handleClick, setOver };
