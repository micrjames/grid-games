import { board, CLASS } from "./game_incs.js";
import { mat } from "../incs.js";

let circleTurn;
const handleClick = function(event) {
    const cell = this;// event.target;
    const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;

    const pos = getPos(cell);
    switch(currentClass) {
	    case CLASS.CIRCLE:
		   mat.circle.setElement(1, pos.x, pos.y);
		   console.log(mat.circle.mat);
		   break;
	    case CLASS.X:
		   mat.x.setElement(1, pos.x, pos.y);
		   console.log(mat.x.mat);
		   break;
	}
    placeMark(cell, currentClass);

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
    return { x: +splitPos[0], y: +splitPos[1] }; 
};

const endGame = function(draw) {
};

const checkWin = function(currentClass) {
};

const checkDraw = function() {
};

const swapTurn = function() {
    circleTurn = !circleTurn;
};

export { handleClick, setBoardHoverClass };
