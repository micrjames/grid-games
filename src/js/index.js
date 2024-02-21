import { figures, modalEl } from "./incs.js";
import { TTT } from "./ttt/TTT.js";
import { Modal } from "./modal.min.js";
import { Figure } from "./figure.min.js";
import { spinalCase } from "./utils/utils.js";

for(const figure of figures)
   new Figure(figure, text => {
	  const modal = new Modal(modalEl);
	  modal.doOnClose();
	  modal.hdrText = text;
	  const spinaledText = spinalCase(text);
	  const gameDisplay = modal.body.children[0];
	  const games = gameDisplay.children;
	  let winningMsg;
	  let gameDisplayBtnGroup;
	  let resetBtn;
	  for(const game of games) {
		 if(game.classList.contains(spinaledText)) {
			const board = game.children.namedItem("board");
			game.classList.remove("hidden");
			if(game.id) {
			   winningMsg = game.children.namedItem("winning-message");
			   gameDisplayBtnGroup = winningMsg.children[1];
			   resetBtn = gameDisplayBtnGroup.firstElementChild;
			}
			/************/
			switch(game) {
			   case gameDisplay.firstElementChild : {
				  let ttt = new TTT(board);
				  ttt.setMarks();

				  resetBtn.addEventListener("click", () => {
					  ttt = null;
					  ttt = new TTT(board);
					  ttt.setMarks();
				  });
				  break;
			   }
			   default: {
				  break;
			   }
			}
			/************/
		 } else {
			game.classList.add("hidden");
		 }
	  }
	  modal.open();
	  window.scrollTo(0, 0);
   });
