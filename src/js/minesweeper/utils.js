import { Timer } from "../utils/Timer.js";

const setRandNumsArr = (numRandNums, gridSize) => {
   let randNumsArr = [];
   for(let i = 0; i <= numRandNums-1; i++) {
	  const randNum = Math.floor(Math.random() * gridSize);
	  if(randNumsArr.length) {
		 if(randNumsArr.some(num => num == randNum)) {
			i--;
			continue;
		 }
	  }
	  randNumsArr.push(randNum);
   }
   return randNumsArr;
};

const createIcon = function(iconClasses) {
   const icon = document.createElement("i");
	
   const classes = iconClasses.split(" ");
   classes.forEach(item => {
	  icon.classList.add(item);
   });
	
   return icon;
};

const addIcon = function(context, name, className = false) {
   const icon = createIcon(`fa-solid fa-${name}`);
   context.appendChild(icon);
   if(className) context.classList.add(`${name}`);
};

const removeIcon = function(context, name) {
   context.classList.remove(`${name}`);                                                            
   context.removeChild(context.lastChild);
};

const switchClasses = function(context, before, after) {
   context.classList.remove(before);
   context.classList.add(after);
};

const createTimer = function(timerEl, secsRemaining) {                                                  
   let secsRemainingText;
   let timer = new Timer(1000);
   timer.startTimer(() => {
	  secsRemaining--;
	  if(secsRemaining >= 10) {
		 secsRemainingText = secsRemaining;
	  } else {
		 if(secsRemaining < 1) {
			clearInterval(countdownID);

			// game is over when the timer clock runs out.
		 }
		 secsRemainingText = `0${secsRemaining}`;
	  }
	  timerEl.textContent = secsRemainingText;
   });

   return timer;
};

export { setRandNumsArr, addIcon, removeIcon, createTimer, switchClasses };
