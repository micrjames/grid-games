const rps = document.querySelector(".game-rock-paper-scissors");
const restartRPSBtn = document.querySelector("#restart-rps");

const iconClassNames = [
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

export { rps, iconClassNames, restartRPSBtn };
