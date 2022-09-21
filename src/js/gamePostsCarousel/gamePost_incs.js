const gameValues = [                                                                                   
   {
	  "id": "1",
	  "name": "Tic-Tac-Toe",
	  "image": "../images/ttt.png"
   },
   {
	  "id": "2",
	  "name": "Rock-paper-scissors",
	  "image": "../images/rps.png"
   },
   {
	  "id": 3,
	  "name": "Connect-four",
	  "image": "../images/cf.png"
   },
   {
	  "id": 4,
	  "name": "Minesweeper",
	  "image": "../images/ms.png"
   }
];
 
const gameFigures = document.querySelectorAll("figure");
 
const gameBtnPrev = document.querySelector("#games-btn-group-prev");
const gameBtnNext = document.querySelector("#games-btn-group-next");

const gameDisplay = document.querySelector(".game-display");

export { gameValues, gameFigures, gameBtnPrev, gameBtnNext, gameDisplay };
