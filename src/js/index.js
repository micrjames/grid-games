requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js'], function() {
   const tttFigure = new Figure(figure, () => {
	  const modal = new Modal(modalEl);
	  const hdrText = modal.hdrText;
	  hdrText.textContent = tttFigure.btnText;
	  modal.open();
	  modal.doOnClose(() => {
	  });
   });
});
