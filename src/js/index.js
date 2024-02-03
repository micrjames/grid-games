const modalBodyTxt = document.createTextNode("Coming Soon");
const span = document.createElement("span");
span.setAttribute("class", "ellipsis");
span.appendChild(modalBodyTxt);
requirejs(['js/figure.min.js', 'js/modal.min.js', 'js/incs.js'], function() {
   for(const figure of figures) {
	  new Figure(figure, text => {
		 const modal = new Modal(modalEl);
		 modal.doOnClose();
		 modal.hdrText = text;
		 modal.body.appendChild(span);
		 modal.open();
		 window.scrollTo(0, 0);
	  });
   }
});
