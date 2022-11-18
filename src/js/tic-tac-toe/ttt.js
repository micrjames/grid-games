import { board, CLASS } from "./game_incs.js";

let circleTurn;
const handleClick = function(event) {
    const cell = this;// event.target;
    const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;

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
