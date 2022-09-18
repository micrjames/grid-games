import { WINNING_COMBINATIONS, instructionsMessageElement, winningMessageTextElement, btnGroup, board, cellEls } from "./game_incs.js";

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

let circleTurn;

const startTTT = function() {
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
};

const setBoardHoverClass = function() {
   board.classList.remove(X_CLASS);
   board.classList.remove(CIRCLE_CLASS);
   if(circleTurn) board.classList.add(CIRCLE_CLASS);
   else board.classList.add(X_CLASS);
};
const handleClick = function(event) {
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
};
const swapTurns = function() {
   circleTurn = !circleTurn;
};
const placeMark = function(cell, currentClass) {
   cell.classList.add(currentClass);
};

const checkWin = function(currentClass) {
   return WINNING_COMBINATIONS.some(combination => {
	  return combination.every(index => {
		   return cellEls[index].classList.contains(currentClass);
	  });
   });
};

const checkDraw = function() {
   return [...cellEls].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
   });
}

const endGame = function(draw) {
   if(draw) {
	  winningMessageTextElement.innerText = "It's a Draw!";
   } else {
	  winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins the Game!`;
   }
   btnGroup.classList.remove("hidden");
   winningMessageTextElement.classList.remove("hidden");
   instructionsMessageElement.classList.add("hidden");
};

export { startTTT };
