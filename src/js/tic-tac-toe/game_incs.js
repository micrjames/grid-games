const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const instructionsMessageElement = document.querySelector(".instructions-message");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartBtn = document.querySelector(".game-display-btn-group-reset");
const btnGroup = document.querySelector(".game-display-btn-group");
const board = document.querySelector("#board");
const cellEls = document.querySelectorAll("[data-cell]");

export { WINNING_COMBINATIONS, instructionsMessageElement, winningMessageTextElement, restartBtn, btnGroup, board, cellEls };
