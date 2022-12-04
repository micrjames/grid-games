import { modalBody } from "../modal.js";

const data = {
    "numRows": 6,
    "numCols": 7,
    "yellow": true
};
const gameDisplay = modalBody.children[0];
const cf = gameDisplay.children.namedItem("cf");
const board = cf.children.namedItem("board");
const winningMessage = cf.children[1];
const winningMessageText = winningMessage.children[0];
const btnGroup = winningMessage.children[1];
const cfRestartBtn = btnGroup.children.namedItem("restart-cf");

export { data, board, winningMessageText, cfRestartBtn };
