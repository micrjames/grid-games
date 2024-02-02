requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js'], function() {
   for(const figure of figures) {
	  new Figure(figure, text => {
		 const modal = new Modal(modalEl);
		 modal.hdrText = text;
		 modal.open();
		 modal.doOnClose();
		 window.scrollTo(0, 0);
	  });
   }
});
