import { gameValues, gameBtnPrev, gameBtnNext } from "./gamePostsCarousel/gamePost_incs.js";
import { setGamePostValues } from "./gamePostsCarousel/setGamePosts.js";

let gamePostValuesIndex = 0;

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
