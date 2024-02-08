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

const changeIcon = function(thisResults: Element, whichSelectionBtnIconClass: string) {
   // Get the current player class
   const thisResultsIcon = thisResults?.lastElementChild;
   const thisResultsIconClass = thisResultsIcon?.classList[1];

   thisResultsIcon?.classList.remove(<string>thisResultsIconClass);
   thisResultsIcon?.classList.add(whichSelectionBtnIconClass);
};

const setScore = function(thisResults: Element, score: number) {
   // Get the current player score
   const thisResultsScore = thisResults?.firstElementChild;
   console.log(thisResultsScore?.parentElement);
   thisResultsScore.textContent = "1";
};

const getRandomIdx = function(size: number) {
   const iconIndex = Math.floor(Math.random() * size);  
   return iconIndex;
};

const switchVisibility = function(context1: Element, context2: Element) {
   if(context1?.classList.contains("hidden")) {
      context1.classList.remove("hidden"); 
      context2?.classList.add("hidden");
   }
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
       computer: "0"
     };
   }

   private resetScore() {
      this.score.player = "0";
      this.score.computer = "0";
   }

   start() {
     this.resetScore();
	  this.createResults();
	  this.createSelection();
   };

   reset() {
      this.context.removeChild(this.context.firstChild);
      this.context.removeChild(this.context.firstChild);

      const winningMsg = this.context.firstElementChild;
      const instructionsEl = winningMsg?.nextElementSibling;

      switchVisibility(instructionsEl, winningMsg);

      this.start();
   }

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

      // Get the winning message element
      const winningMsg = results?.nextElementSibling;

      // Get the instructions element
      const instructionsEl = winningMsg?.nextElementSibling;

      const plyrResults = results?.firstElementChild;
      const cmptrResults = results?.lastElementChild;

      changeIcon(plyrResults, whichSelectionBtnIconClass);

      const icons = [
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
      const randIdx = getRandomIdx(icons.length);
      changeIcon(cmptrResults, `fa-${icons[randIdx].icon}`);

      const splitSelClass = whichSelectionBtnIconClass.split('-');
      splitSelClass.shift();
      const joinedSelClass = splitSelClass.join('-');
      console.log(`player: ${joinedSelClass}`, `computer: ${icons[randIdx].icon}`);
      console.log(winningMsg, instructionsEl);

      // check if joinedSelClass beats icons[randIdx]
      const joinedSelClassIdx = icons.findIndex(icon => joinedSelClass == icon.icon);
      const joinedSelClassBeats = icons[joinedSelClassIdx].beats;
      const joinedSelClassBeatsIdx = icons.findIndex(icon => joinedSelClassBeats == icon.type);

      const computerClassBeats = icons[randIdx].beats;
      const computerClassBeatsIdx = icons.findIndex(icon => computerClassBeats == icon.type);
         
      let winning_msg_text;
      if(icons[joinedSelClassBeatsIdx].icon == icons[randIdx].icon) {
         winning_msg_text = 'Player wins!';
         endGame();
         setScore(plyrResults, 1);
      }
      if(icons[computerClassBeatsIdx].icon == icons[joinedSelClassIdx].icon) {
         winning_msg_text = 'Computer wins!';
         endGame();
         setScore(cmptrResults, 1);
      }
      if(icons[joinedSelClassIdx].icon == icons[randIdx].icon) {
         winning_msg_text = 'There is a draw!';
         endGame();
      }

      function endGame() {
         winningMsg.firstElementChild.textContent = winning_msg_text;

         for(let i = 0; i < selections?.children.length; i++) {
            const selBtn = <HTMLButtonElement>selections.children[i];
            selBtn.disabled = true;
         }
         switchVisibility(winningMsg, instructionsEl);
      }
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
