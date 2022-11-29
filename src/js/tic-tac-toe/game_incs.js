import Matrix from "../utils/Matrix.js";
import { modalBody } from "../modal.js";

const gameDisplay = modalBody.children[0];
const ttt = gameDisplay.children.namedItem("ttt");

const board = ttt.children.namedItem("board");
const cellEls = board.children;

const winningMessageEl = ttt.children[1];
const winningMessageText = winningMessageEl.children[0];

const btnGroup = winningMessageEl.children[1];
const tttRestartBtn = btnGroup.children[0];

const instructionsMessageEl = ttt.children[2];

const CLASS = {
    X: "x",
    CIRCLE: "circle"
};

const mat = {};
mat.circle = new Matrix(3);
mat.x = new Matrix(3);

export { board, cellEls, CLASS, winningMessageEl, winningMessageText, instructionsMessageEl, tttRestartBtn, mat };
