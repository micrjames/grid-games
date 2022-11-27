import { modalBody } from "../modal.js";

const numRows = 9;                                                                                   
const numCols = 9;

const gameDisplay = modalBody.children[0];
const ms = gameDisplay.children.namedItem("ms");

const interface = ms.children[0];
const minesDisplay = interface.children[0];
const btnGroup = interface.children[1];
const countdownDisplay = interface.children[2];
const msRestartBtn = btnGroup.children.namedItem("restart-ms");
const board = ms.children.namedItem("board");

export { minesDisplay, countdownDisplay, msRestartBtn, board };
