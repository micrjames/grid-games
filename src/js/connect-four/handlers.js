import { data, board, winningMessageText, CLASS, mat } from "./game_incs.js";
import { swapTurn } from "./utils.js";
import { range } from "../utils/range.js";

let whichBoardChild;
let yellowTurn = true;
let currentClass = "yellow";

const handleClick = function() {
    whichBoardChild.classList.add("covered");
 
    swapTurn();  
    currentClass = yellowTurn ? CLASS.YELLOW : CLASS.RED;
};

const handleHover = function() {
    const capID = +this.id;
 
    const theBoardChildren = board.children;
 
    for(const whichRow of [...range(data.numRows + 1)].reverse()) {
        let childIndex = capID + whichRow * data.numCols; 
        whichBoardChild = theBoardChildren.item(childIndex);
        if(!whichBoardChild.classList.contains("covered")) break;
    }
    whichBoardChild.classList.add("try");
    whichBoardChild.classList.add(currentClass);
};
 
const handleOut = function() {
    const theBoardChildren = board.children;
    for(const child of theBoardChildren) {
        if(child.classList.contains("try")) child.classList.remove("try");
    }
};

export { handleClick, handleHover, handleOut };
