import { modalBody } from "../modal.js";

const gameDisplay = modalBody.children[0];
const rps = gameDisplay.children.namedItem("rps");
const winningMsg = rps.children[0];
const rpsBtnGroup = winningMsg.children[1];
const rpsRestartBtn = rpsBtnGroup.children.namedItem("restart-rps");

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

export { rps, rpsRestartBtn, iconClassNames };
