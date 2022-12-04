import { modalBody } from "../modal.js";

const data = {
    "numRows": 6,
    "numCols": 7,
    "yellow": true
};
const gameDisplay = modalBody.children[0];
const cf = gameDisplay.children.namedItem("cf");
const board = cf.children.namedItem("board");

export { data, board };
