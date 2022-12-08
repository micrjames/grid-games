import { modalBody } from "../modal.js";
import Matrix from "../utils/Matrix.js";

const data = {
    "numRows": 6,
    "numCols": 6,
    "yellow": true
};
const CLASS = {
   YELLOW: "yellow",
   RED: "red"
};
const mat = {};
mat.yellow = new Matrix(6);
mat.red = new Matrix(6);

const gameDisplay = modalBody.children[0];
const cf = gameDisplay.children.namedItem("cf");
const board = cf.children.namedItem("board");
const winningMessage = cf.children[1];
const winningMessageText = winningMessage.children[0];
const btnGroup = winningMessage.children[1];
const cfRestartBtn = btnGroup.children.namedItem("restart-cf");

export { data, board, CLASS, mat, winningMessageText, cfRestartBtn };
