const buildEl = function(el: string, className:string=null, idName:string=null): Element {
    const element = document.createElement(el);                              
    if(className != null) element.setAttribute("class", className);          
    if(idName != null) element.setAttribute("id", idName);                   
                                                                             
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

export class RPS {
   private icons: ICON[];
   private playerScore: string;
   private computerScore: string;
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
	  this.playerScore = "0";
	  this.computerScore = "0";
   }

   start() {
	  this.createResults();
	  this.createSelection();
   };

   createSelection() {
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

	  // Get the values for the icon
      const whichSelectionBtnIconID = selectionBtnIcon.id;
      const whichSelectionBtnIcon = selectionBtnIcon.className;

	  console.log(whichSelectionBtnIcon, whichSelectionBtnIconID);
   }
  
   private createResults() {
	  const div = buildEl("div", "results", "results");
 
      const playerSpan = this.createResult("plyr-result", "You", "result-score", this.playerScore, this.icons[0].icon, "plyr-selection");
      div.appendChild(playerSpan);
    
      const computerSpan = this.createResult("cmptr-result", "Computer", "result-score", this.computerScore, this.icons[2].icon, "cmptr-selection");
      div.appendChild(computerSpan);
   
      this.context.insertBefore(div, this.context.firstChild);
   }
   private createResult = function(name: string, msg: string, resultClass: string, resultMsg: string, resultIcon: string, iconID: string) {
      const spanOuter = buildEl("div", null, name);
       
      const textMsg = document.createTextNode(msg);
      spanOuter.appendChild(textMsg);
   
      const spanScore = buildEl("span", resultClass);
      const textScore = document.createTextNode(resultMsg);
      spanScore.appendChild(textScore);
   
      spanOuter.appendChild(spanScore); 
   
      const icon = addIcon(spanOuter, resultIcon);
      icon.setAttribute("id", iconID);
      spanOuter.appendChild(icon);
   
      return spanOuter;
   }
}
