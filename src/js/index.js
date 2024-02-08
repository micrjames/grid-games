requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js', 'js/utils/utils.js', 'js/utils/domHelpers.js', 'js/ts/TTT.js', 'js/ts/RPS.js'], function() {
   for(const figure of figures) {
	  new Figure(figure, text => {
		 const modal = new Modal(modalEl);
		 modal.doOnClose();
		 modal.hdrText = text;
		 const spinaledText = spinalCase(text);
		 const gameDisplay = modal.body.children[0];
		 const games = gameDisplay.children;
		 for(const game of games) {
			if(game.classList.contains(spinaledText)) {
			   const board = game.children.namedItem("board");
			   const winningMsg = game.children.namedItem("winning-message");
			   const gameDisplayBtnGroup = winningMsg.children[1];
			   const resetBtn = gameDisplayBtnGroup.firstElementChild;
			   game.classList.remove("hidden");
			   /*********/
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
				  default: {
					 break;
				  }
			   }
			   /*********/
			} else {
			   game.classList.add("hidden");
			}
		 }
		 modal.open();
		 window.scrollTo(0, 0);
	  });
   }
});
