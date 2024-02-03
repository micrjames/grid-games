requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js', 'js/utils/utils.js', 'js/utils/domHelpers.js'], function() {
   const CLASS = {
	  X: "x",
	  CIRCLE: "circle"
   };
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
			   let circleTurn = true;
			   const board = game.children.namedItem("board");
			   board.classList.add("circle");
			   const cellEls = board.children;
			   for(const cellEl of cellEls) {
				  cellEl.addEventListener("click", () => {
					 const currentClass = circleTurn ? CLASS.CIRCLE : CLASS.X;
					 cellEl.classList.add(currentClass);

					 circleTurn = !circleTurn;
					 board.classList.remove(CLASS.X);
					 board.classList.remove(CLASS.CIRCLE);

					 if(circleTurn) board.classList.add(CLASS.CIRCLE);
					 else board.classList.add(CLASS.X);
				  });
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
