export class Figure {
   private figCaption: Element;
   constructor(figure: Element, cb: (text: string) => void) {
	  this.figCaption = figure.children[1];
	  this.btn.addEventListener("click", () => {
		 cb(this.btnText);
	  });
   }
   private get btn(): Element {
	  return this.figCaption.children[0];
   }
   private get btnText(): string {
	  return this.btn.textContent.trim();
   }
}
