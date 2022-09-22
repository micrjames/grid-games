const numRows = 9;                                                                                   
const numCols = 9;
const minesweeperEl = document.querySelector(".game-minesweeper");
const msBoard = document.querySelector(".ms-board");

const ms_minesDisplay = document.querySelector(".game-interface-mines-display");
const ms_countdownDisplay = document.querySelector(".game-interface-countdown");
const restartMSBtn = document.querySelector("#restart-ms");

export { numRows, numCols, minesweeperEl, msBoard, ms_minesDisplay, ms_countdownDisplay, restartMSBtn };
