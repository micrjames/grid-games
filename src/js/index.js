import { gameValues, gameBtnPrev, gameBtnNext } from "./gamePostsCarousel/gamePost_incs.js";
import { setGamePostValues } from "./gamePostsCarousel/setGamePosts.js";

import { setShowGame } from "./gamePostsCarousel/setShowGame.js";

import { modalTrigger, modalHdrText, closeBtn } from "./modal.js";

let gamePostValuesIndex = 0;

setGamePostValues(gamePostValuesIndex);
gameBtnPrev.disabled = true;

modalHdrText.textContent = gameValues[gamePostValuesIndex].name;

setShowGame(gamePostValuesIndex);

gameBtnPrev.addEventListener("click", function() {
   gamePostValuesIndex--;
   if(gamePostValuesIndex == 0) gameBtnPrev.disabled = true;
   if(gamePostValuesIndex != gameValues.length-1) gameBtnNext.disabled = false;
   setGamePostValues(gamePostValuesIndex);
   modalHdrText.textContent = gameValues[gamePostValuesIndex].name;
   setShowGame(gamePostValuesIndex);
});
gameBtnNext.addEventListener("click", function() {
   gamePostValuesIndex++;
   if(gamePostValuesIndex != 0) gameBtnPrev.disabled = false;
   if(gamePostValuesIndex == gameValues.length-1) gameBtnNext.disabled = true;
   setGamePostValues(gamePostValuesIndex);
   modalHdrText.textContent = gameValues[gamePostValuesIndex].name;
   setShowGame(gamePostValuesIndex);
});

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
restartBtn.addEventListener("click", startGame);

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

const board = document.querySelector("#board");
const cellEls = document.querySelectorAll("[data-cell]");
let circleTurn;
startGame();

function startGame() {
   circleTurn = false;
   cellEls.forEach(cellEl => {
	  cellEl.classList.remove(X_CLASS);
	  cellEl.classList.remove(CIRCLE_CLASS);
	  cellEl.removeEventListener("click", handleClick);
	  cellEl.addEventListener("click", handleClick, { once: true });
   });
   setBoardHoverClass();
   btnGroup.classList.add("hidden");
   winningMessageTextElement.classList.add("hidden");
   instructionsMessageElement.classList.remove("hidden");
}

function setBoardHoverClass() {
   board.classList.remove(X_CLASS);
   board.classList.remove(CIRCLE_CLASS);
   if(circleTurn) board.classList.add(CIRCLE_CLASS);
   else board.classList.add(X_CLASS);
}
function handleClick(event) {
   const cell = event.target;
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
   placeMark(cell, currentClass);

   // check for a win
   if(checkWin(currentClass)) {
	  endGame(false);
   } else if(checkDraw()) {
	  endGame(true);
   } else {
	  swapTurns();
	  setBoardHoverClass();
   }
}
function swapTurns() {
   circleTurn = !circleTurn;
}
function placeMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function checkWin(currentClass) {
   return WINNING_COMBINATIONS.some(combination => {
	  return combination.every(index => {
		   return cellEls[index].classList.contains(currentClass);
	  });
   });
}

function checkDraw() {
   return [...cellEls].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
   });
}

function endGame(draw) {
   if(draw) {
	  winningMessageTextElement.innerText = "It's a Draw!";
   } else {
	  winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins the Game!`;
   }
   btnGroup.classList.remove("hidden");
   winningMessageTextElement.classList.remove("hidden");
   instructionsMessageElement.classList.add("hidden");
}
