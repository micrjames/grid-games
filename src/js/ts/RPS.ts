const buildEl = function(el: string, className:string=null, idName:string=null, text: string=null): Element {
    const element = document.createElement(el);                              
    if(className != null) element.setAttribute("class", className);          
    if(idName != null) element.setAttribute("id", idName);     
    if(text) {
      const elTxt = document.createTextNode(text);
	   element.appendChild(elTxt);
    }   
                                                                             
    return element;                                                          
}; 
const createIcon = function(iconClasses) {
   const icon = document.createElement("i");
	
   const classes = iconClasses.split(" ");
   classes.forEach(item => {
	  icon.classList.add(item);
   });
	
   return icon;
};

const addIcon = function(context, name, className=false, type='regular') {
   const icon = createIcon(`fa-${type} fa-${name}`);
   context.appendChild(icon);
   if(className) context.classList.add(`${name}`);

   return icon;
};
interface ICON {
   [prop: string]: string;
}
interface SCORE {
   [prop: string]: string;
}

export class RPS {
   private icons: ICON[];
   private score: SCORE;
   private context: HTMLElement;
   constructor(context: HTMLElement) {
	  this.context = context;
	  this.icons = [
		 {
			"icon": "hand-back-fist",
			"type": "rock",
			"beats": "scissors"
		 },
		 {
			"icon": "hand",
			"type": "paper",
			"beats": "rock"
		 },
		 {
			"icon": "hand-scissors",
			"type": "scissors",
			"beats": "paper"
		 }
	  ];
     this.score = {
       player: "0",
       compputer: "0"
     };
   }

   start() {
	  this.createResults();
	  this.createSelection();
   };

   private createSelection() {
	  const div = buildEl("div", "selections", "selections");
	  this.icons.forEach(buttonValue => {
		 const button = buildEl("button", "selection"); 
		 button.addEventListener("click", this.handleSelectionClick);

		 const icon = addIcon(button, buttonValue.icon);
		 icon.setAttribute("id", buttonValue.type);
		 div.appendChild(button);
	 });                                                                                                       
	 this.context.insertBefore(div, this.context.firstChild);
   }
   private handleSelectionClick(event: Event) {
	  const selectionBtnIcon = <Element>event.target;

	   // Get the selected class
      const whichSelectionBtnIconClass = selectionBtnIcon.classList[1];

      // Get the results element
      const selectionBtn = selectionBtnIcon.parentElement;
      const selections = selectionBtn?.parentElement;
      const results = selections?.nextElementSibling;

      const plyrResults = results?.firstElementChild;

      // Get the current player class
      const plyrResultsIcon = plyrResults?.lastElementChild;
      const plyrResultsIconClass = plyrResultsIcon?.classList[1];

      // Get the current player score
      const plyrResultsScore = plyrResults?.firstElementChild;
      const plyrResultsScoreText = plyrResultsScore?.textContent;

      plyrResultsIcon?.classList.remove(<string>plyrResultsIconClass);
      plyrResultsIcon?.classList.add(whichSelectionBtnIconClass);

      console.log(plyrResultsScoreText);
   }
  
   private createResults() {
	  const div = buildEl("div", "results", "results");
 
      const playerSpan = this.createResult("plyr-result", "You", "result-score", this.score.player, this.icons[0].icon, "plyr-selection");
      div.appendChild(playerSpan);
    
      const computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.score.player, this.icons[2].icon, "cmptr-selection");
      div.appendChild(computerSpan);
   
      this.context.insertBefore(div, this.context.firstChild);
   }
   private createResult = function(name: string, msg: string, resultClass: string, resultMsg: string, resultIcon: string, iconID: string) {
      const outerEl = buildEl("div", null, name);
       
      const textMsg = document.createTextNode(msg);
      outerEl.appendChild(textMsg);
   
      const spanScore = buildEl("span", resultClass, null, resultMsg);
      outerEl.appendChild(spanScore); 
   
      const icon = addIcon(outerEl, resultIcon);
      icon.setAttribute("id", iconID);
      outerEl.appendChild(icon);
   
      return outerEl;
   }
}
