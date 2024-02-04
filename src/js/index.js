requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js', 'js/utils/utils.js', 'js/utils/domHelpers.js', 'js/ts/TTT.js'], function() {
   const span = createSpan("ellipsis", "Coming Soon");
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
			   game.classList.remove("hidden");
			   if(span.parentElement === modal.body)
				  modal.body.removeChild(span);
			   /*********/
			   switch(game) {
				  case gameDisplay.firstElementChild : {
					 const board = game.children.namedItem("board");
					 const ttt = new TTT(board);
					 ttt.setMarks();
				  }
			   }
			   /*********/
			} else {
			   game.classList.add("hidden");
			   modal.body.appendChild(span);
			}
		 }
		 modal.open();
		 window.scrollTo(0, 0);
	  });
   }
});
