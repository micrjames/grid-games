class Timer {
    protected timerID: ReturnType<typeof setInterval>;
    protected interval: number;

    constructor(interval: number) {
	   this.interval = interval;
	}

    start(cb: () => void) {
	    this.timerID = setInterval(cb, this.interval);
	}

    cancel() {
	    clearInterval(this.timerID);
	}
}

export class Countdown extends Timer {
   private secsRemaining: number;

   constructor(secsRemaining: number, doEachSec?: (remainingTime: number) => void, doAtEnd?: () => void) {
	  super(1000);
	  this.secsRemaining = secsRemaining;
	  super.start(() => {
		 this.secsRemaining--;
		 if(doEachSec) doEachSec(this.secsRemaining);
		 if(this.secsRemaining == 0) {
			super.cancel();
				 
			// countdown is over when the timer clock runs out
			if(doAtEnd) doAtEnd();
		 }
	  });
   }
   get seconds(): number {
	  return this.secsRemaining;
   }
}


export class MS {                                                                                       
	private countdownDisplay: Element;
	private minesDisplay: Element;
	private boardResetBtn: Element;
	private boardResetBtnIcon: Element;
	private winningMsg: Element;
	private instructionsMsg: Element;
	private countdown: Countdown;
    constructor(game: HTMLElement) {
	   const gameInterface = game.firstElementChild;                                      
	   this.countdownDisplay = gameInterface.children[2];
	   this.minesDisplay = gameInterface.children[0];

	   const btnGroup = gameInterface.children[1];
	   this.boardResetBtn = btnGroup.firstElementChild;
	   this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;

	   this.winningMsg = game.children.namedItem("winning-message");
	   this.instructionsMsg = this.winningMsg.nextElementSibling;
	   let seconds = "10";
	   this.countdownDisplay.textContent = seconds;

	   this.start(seconds);
    }
	
	start(seconds: string) {
	   this.countdown = new Countdown(10, remainingTime => {
           if(this.countdown.seconds < 10) seconds = `0${remainingTime}`;                       
           else seconds = remainingTime.toString();
           this.countdownDisplay.textContent = seconds;
       }, () => {
		   switchIcons(this.boardResetBtnIcon, ["fa", "fa-smile-o"], ["far", "fa-dizzy"]);

           this.instructionsMsg.classList.add("hidden");
           const resetHandler = () => {
			  this.countdownDisplay.textContent = seconds.toString();
			  switchIcons(this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);

			  this.boardResetBtn.removeEventListener("click", resetHandler);
			  this.instructionsMsg.classList.remove("hidden");
		   };
		   this.boardResetBtn.addEventListener("click", resetHandler);
	   });
	}
} 

const switchIcons = (context: Element, iconClassName1: string[], iconClassName2: string[]) => {
	context.classList.remove(iconClassName1[0]);
	context.classList.remove(iconClassName1[1]);
	context.classList.add(iconClassName2[0]);
	context.classList.add(iconClassName2[1]);
};
