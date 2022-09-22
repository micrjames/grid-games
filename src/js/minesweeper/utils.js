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

const createTimer = function(timerEl, secsRemaining) {                                                  
   let secsRemainingText;
   let countdownID = setInterval(() => {
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
   }, 1000);	

   return countdownID;
};

export { setRandNumsArr, createIcon, createTimer };
