const gameValues = [                                                                                   
   {
	  "id": "1",
	  "name": "Tic-Tac-Toe",
	  "image": "../images/cityscape.jpg"
   },
   {
	  "id": "2",
	  "name": "Rock-paper-scissors",
	  "image": "../images/cityscape.jpg"
   },
   {
	  "id": 3,
	  "name": "Connect-four",
	  "image": "../images/cityscape.jpg"
   }
];
 
const gameFigures = document.querySelectorAll("figure");
 
const gameBtnPrev = document.querySelector("#games-btn-group-prev");
const gameBtnNext = document.querySelector("#games-btn-group-next");

const gameDisplay = document.querySelector(".game-display");

export { gameValues, gameFigures, gameBtnPrev, gameBtnNext, gameDisplay };
