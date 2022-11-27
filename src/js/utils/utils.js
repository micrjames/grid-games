import { Timer } from "../utils/Timer.js";

// Convert a string to spinal case. Spinal case in all-lowercase-words-joined-by-dashes.
const spinalCase = str => {
   const strArr = str.toLowerCase().split(' ');
   const spinaled = strArr.join('-');
   return spinaled;
};

// Return the provided string with the first letter of each word capitalized. Make sure the rest
// of the word is in lower case. For the purpose of this exercise, you should also capitalize connecting
// words like the and of.

const titleCase = str => {
	const strArr = str.split(' ');
    const titled = strArr.map(word => {
	    const upperStart = word[0].toUpperCase();
	   	const restWord = word.slice(1, word.length);
	    return upperStart + restWord.toLowerCase();
	}); 
    const titledStr = titled.join(' ');
    return titledStr;
};

const buildEl = function(el, className=null, idName=null) {                  
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

const removeIcon = function(context, name) {
   context.classList.remove(`${name}`);                                                            
   context.removeChild(context.lastChild);
};

const removeChildren = function(context) {
   while(context.firstChild) {
       context.removeChild(context.lastChild);
   }
};

const switchClasses = function(context, before, after) {
   context.classList.remove(before);
   context.classList.add(after);
};

const createTimer = function(timerEl, secsRemaining, doEnd) {
   let secsRemainingText;
   let timer = new Timer(1000);
   timer.start(() => {
	   secsRemaining--;
	   if(secsRemaining >= 10) {
		  secsRemainingText = secsRemaining;
	   } else {
		  if(secsRemaining < 1) {
			 timer.cancel();
			 
			 // game is over when the timer clock runs out
			 doEnd();
		  }
		  secsRemainingText = `0${secsRemaining}`;
	   }
	   timerEl.textContent = secsRemainingText;
   });

   return timer;
};

const changeBtnIcon = function(btn, name) {
   removeChildren(btn);
   addIcon(btn, name);
};

export { spinalCase, titleCase, buildEl, addIcon, removeIcon, switchClasses, removeChildren, createTimer, changeBtnIcon };
