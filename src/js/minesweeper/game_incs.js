import { modalBody } from "../modal.js";
import { range } from "../utils/range.js"

const numRows = 9;                                                                                   
const numCols = 9;
const secsRemaining = 100;

const gameDisplay = modalBody.children[0];
const ms = gameDisplay.children.namedItem("ms");

const interfaceDisplay = ms.children[0];
const minesDisplay = interfaceDisplay.children[0];
const btnGroup = interfaceDisplay.children[1];
const countdownDisplay = interfaceDisplay.children[2];
const msRestartBtn = btnGroup.children.namedItem("restart-ms");
const board = ms.children.namedItem("board");
const cells = board.children;

const numMines = 10;
const mineNumRange = [...range(numMines)];

export { numRows, numCols, minesDisplay, countdownDisplay, msRestartBtn, board, numMines, mineNumRange, cells, secsRemaining };
