export class Figure {
   private figCaption: Element;
   private buttonText: string;
   constructor(figure: Element, cb: () => void) {
	  this.figCaption = figure.children[1];
	  this.btn.addEventListener("click", () => {
		 cb();
	  });
   }
   private get btn(): Element {
	  return this.figCaption.children[0];
   }
   get btnText(): string {
	  return this.btn.textContent.trim();
   }
}
