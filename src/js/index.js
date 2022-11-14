import { games, modal } from "./incs.js";
import { modalHdrText, modalHdrCloseBtn, modalBody } from "./modal.js";
import { spinalCase } from "./utils.js";
import { rpsRestartBtn } from "./rock-paper-scissors/game_incs.js";
import { startRPS, resetRPS } from "./rock-paper-scissors/game_logic.js";

for(const game of games.children) {
    for(const el of game.children) {
	    if(el.tagName === "FIGCAPTION") {
		    const button = el.children[0];
		    button.addEventListener("click", function(event) {
			    const title = this.textContent.trim();

			    modalHdrText.textContent = title;
				const gameDisplay = modalBody.children[0];
				for(const game of gameDisplay.children) {
				   const spinaledTitle = spinalCase(title);
				   if(game.classList.contains(spinaledTitle)) game.classList.remove("hidden");
				   else game.classList.add("hidden");
				}

			    modal.classList.remove("hidden"); 
			    const figCaption = this.parentElement;
				const figure = figCaption.parentElement
				const posY = figure.offsetTop;
			    modal.style.top = posY + "px";
			});
		}
	}
}

modalHdrCloseBtn.addEventListener("click", function(event) {
    modal.classList.add("hidden");
});

/* rock-paper-scissors */
startRPS();
rpsRestartBtn.addEventListener("click", resetRPS);
