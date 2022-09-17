import { gameValues, gameBtnPrev, gameBtnNext } from "./gamePostsCarousel/gamePost_incs.js";
import { setGamePostValues } from "./gamePostsCarousel/setGamePosts.js";

import { modalTrigger, modalHdrText, closeBtn } from "./modal.js";

let gamePostValuesIndex = 0;

setGamePostValues(gamePostValuesIndex);
gameBtnPrev.disabled = true;

modalHdrText.textContent = gameValues[gamePostValuesIndex].name;

gameBtnPrev.addEventListener("click", function() {
   gamePostValuesIndex--;
   if(gamePostValuesIndex == 0) gameBtnPrev.disabled = true;
   if(gamePostValuesIndex != gameValues.length-1) gameBtnNext.disabled = false;
   setGamePostValues(gamePostValuesIndex);
   modalHdrText.textContent = gameValues[gamePostValuesIndex].name;
});
gameBtnNext.addEventListener("click", function() {
   gamePostValuesIndex++;
   if(gamePostValuesIndex != 0) gameBtnPrev.disabled = false;
   if(gamePostValuesIndex == gameValues.length-1) gameBtnNext.disabled = true;
   setGamePostValues(gamePostValuesIndex);
   modalHdrText.textContent = gameValues[gamePostValuesIndex].name;
});
