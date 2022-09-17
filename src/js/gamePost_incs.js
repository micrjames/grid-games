const gameValues = [                                                                                   
   {
	  "id": "1",
	  "name": "Game 1",
	  "image": "../images/cityscape.jpg"
   },
   {
	  "id": "2",
	  "name": "Game 2",
	  "image": "../images/cityscape.jpg"
   },
   {
	  "id": 3,
	  "name": "Game 3",
	  "image": "../images/cityscape.jpg"
   }
];
 
const gameFigures = document.querySelectorAll("figure");
 
const gameBtnPrev = document.querySelector("#games-btn-group-prev");
const gameBtnNext = document.querySelector("#games-btn-group-next");

export { gameValues, gameFigures, gameBtnPrev, gameBtnNext };
