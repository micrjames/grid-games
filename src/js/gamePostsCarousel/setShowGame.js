import { gameValues, gameDisplay } from "./gamePost_incs.js";
import { titleCase } from "../utils/titleCase.js";

const setShowGame = function(which) {                                                                  
   let currentGameName;
   let currentGameClassName;
    
   currentGameName = gameValues[which].name;  
   currentGameClassName = `game-${titleCase(currentGameName, true)}`;
    
   for (const child of gameDisplay.children) { 
      if(child.classList.contains(currentGameClassName)) { 
         child.classList.remove("hidden");
      } else {
         child.classList.add("hidden");
      }  
   }  
};

export { setShowGame };
