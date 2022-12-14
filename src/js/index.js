import { games, modal } from "./incs.js";
import { modalHdrText, modalHdrCloseBtn, modalBody } from "./modal.js";
import { spinalCase } from "./utils/utils.js";
import { rpsRestartBtn } from "./rock-paper-scissors/game_incs.js";
import { startRPS, resetRPS } from "./rock-paper-scissors/game_logic.js";

import { tttRestartBtn } from "./tic-tac-toe/game_incs.js";
import { startTTT, resetTTT } from "./tic-tac-toe/game_logic.js";

import { msRestartBtn } from "./minesweeper/game_incs.js";
import { startMS, restartMS, resetMS } from "./minesweeper/game_logic.js";

import { cfRestartBtn } from "./connect-four/game_incs.js";
import { startCF, resetCF } from "./connect-four/game_logic.js";

const gameDisplay = modalBody.children[0];
for(const game of games.children) {
    for(const el of game.children) {
	    if(el.tagName === "FIGCAPTION") {
		    const button = el.children[0];
		    button.addEventListener("click", function(event) {
			    const title = this.textContent.trim();

			    modalHdrText.textContent = title;
				for(const child of gameDisplay.children) {
				   const spinaledTitle = spinalCase(title);
				   if(child.classList.contains(spinaledTitle)) child.classList.remove("hidden");
				   else child.classList.add("hidden");
				}

			    modal.classList.remove("hidden"); 
			   /*
			    const figCaption = this.parentElement;
				const figure = figCaption.parentElement
				const posY = figure.offsetTop;
				*/
			    modal.style.top = "75px";
			    window.scrollTo(0, 0);
			});
		}
	}
}

modalHdrCloseBtn.addEventListener("click", function(event) {
    modal.classList.add("hidden");

    for(const child of gameDisplay.children) {
	    if(child.classList.contains("hidden")) {
		    continue;
		} else {
		    switch(child.id) {
			    case "ttt":
				  resetTTT();
				  break;
			   case "rps":
				  resetRPS();
				  break;
			   case "ms":
				  restartMS();
				  break;
			   case "cf":
				  resetCF();
				  break;
			}
		}
	}
});

/* tic-tac-toe */
startTTT();
tttRestartBtn.addEventListener("click", resetTTT);

/* rock-paper-scissors */
startRPS();
rpsRestartBtn.addEventListener("click", resetRPS);

/* minesweeper */
startMS();
msRestartBtn.addEventListener("click", resetMS);

/* connect-four */
startCF();
cfRestartBtn.addEventListener("click", resetCF);
