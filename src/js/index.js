import { gameValues, gameFigures, gameBtnPrev, gameBtnNext } from "./gamePost_incs.js";

let gamePostValuesIndex = 0;

const setGamePostValues = function(which) {
   gameFigures.forEach((gameFigure, index) => {
	  const gameFigureClasslist = gameFigure.classList;
	  if(gameFigureClasslist.contains(`game-${gameValues[index].id}`)) {
		 const gamePostEls = gameFigure.children;

		 gamePostEls[0].setAttribute("src", gameValues[which]["image"]);

		 const descriptionText = document.createTextNode(gameValues[which]["name"]);
		 gamePostEls[1].append(descriptionText);
	  }
   });
};

setGamePostValues(gamePostValuesIndex);
if(gamePostValuesIndex == 0) {
   gameBtnPrev.disabled = true;
} else if(gamePostValuesIndex == gameValues.length-1) {
   gameBtnNext.disabled = true;
}

gameBtnPrev.addEventListener("click", function() {
   gamePostValuesIndex--;
});
gameBtnNext.addEventListener("click", function() {
   gamePostValuesIndex++;
});
