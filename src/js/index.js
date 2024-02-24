import { figures, modalEl } from "./incs.js";
import { TTT } from "./ttt/TTT.js";
import { RPS } from "./rps/RPS.js";
import { MS } from "./ms/MS.js";
import { Modal } from "./libs/modal.min.js";
import { Figure } from "./libs/figure.min.js";
import { spinalCase } from "./utils/utils.js";

for(const figure of figures)
   new Figure(figure, text => {
	  const modal = new Modal(modalEl);
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
			   case gameDisplay.firstElementChild.nextElementSibling : {
				   let rps = new RPS(game);
				   rps.start();

				   resetBtn.addEventListener("click", () => {
					   rps.reset();
				   });
				   break;
			   }
			   case gameDisplay.firstElementChild.nextElementSibling.nextElementSibling: {
				  new MS(game, 9);
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
	  modal.doOnClose(() => {
		 location.reload();
	  });
	  window.scrollTo(0, 0);
   });
