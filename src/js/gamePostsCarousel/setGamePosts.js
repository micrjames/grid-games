import { gameFigures, gameValues } from "./gamePost_incs.js";

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

export { setGamePostValues };
