/* includes */
import { gameValues, gameBtnPrev, gameBtnNext } from "./gamePostsCarousel/gamePost_incs.js";
import { setGamePostValues } from "./gamePostsCarousel/setGamePosts.js";
import { setShowGame } from "./gamePostsCarousel/setShowGame.js";
import { modalTrigger, modalHdrText, closeBtn } from "./modal.js";
import { restartTTTBtn } from "./tic-tac-toe/game_incs.js";
import { startTTT } from "./tic-tac-toe/game_logic.js";
import { startCF } from "./connect-four/game_logic.js";
import { restartMSBtn } from "./minesweeper/game_incs.js";
import { startMS, resetMS } from "./minesweeper/game_logic.js";

/* game post interface */
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

/* tic-tac-toe */
startTTT();
restartTTTBtn.addEventListener("click", startTTT);

/* rock-paper-scissors */

/* connect-four */
startCF();

/* minesweeper */
startMS();
restartMSBtn.addEventListener("click", resetMS);
