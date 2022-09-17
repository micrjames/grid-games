import { gameValues, gameFigures, gameBtnPrev, gameBtnNext } from "./gamePost_incs.js";

let gamePostValuesIndex = 0;

const setGamePostValues = function(which) {
   gameFigures.forEach((gameFigure, index) => {
	  const gameFigureClasslist = gameFigure.classList;
	  if(gameFigureClasslist.contains(`game-${gameValues[index].id}`)) {
		 const gamePostEls = gameFigure.children;

		 gamePostEls[0].setAttribute("src", gameValues[which]["image"]);
		 gamePostEls[1].textContent = gameValues[which]["name"];
	  }
   });
};

setGamePostValues(gamePostValuesIndex);
gameBtnPrev.disabled = true;

gameBtnPrev.addEventListener("click", function() {
   gamePostValuesIndex--;
   if(gamePostValuesIndex == 0) gameBtnPrev.disabled = true;
   if(gamePostValuesIndex != gameValues.length-1) gameBtnNext.disabled = false;
   setGamePostValues(gamePostValuesIndex);
});
gameBtnNext.addEventListener("click", function() {
   gamePostValuesIndex++;
   if(gamePostValuesIndex != 0) gameBtnPrev.disabled = false;
   if(gamePostValuesIndex == gameValues.length-1) gameBtnNext.disabled = true;
   setGamePostValues(gamePostValuesIndex);
});
