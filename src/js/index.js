import { games, modal } from "./incs.js";
import { modalHdrText, modalHdrCloseBtn } from "./modal.js";

for(const game of games.children) {
    for(const el of game.children) {
	    if(el.tagName === "FIGCAPTION") {
		    const button = el.children[0];
		    button.addEventListener("click", function(event) {
			    const title = this.textContent.trim();

			    modalHdrText.textContent = title;

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
