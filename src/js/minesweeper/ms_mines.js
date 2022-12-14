import Matrix from "../utils/Matrix.js";                                                                
import { shuffle } from "../utils/shuffle.js";
import { range } from "../utils/range.js";
import { mineNumRange, numRows, numCols } from "./game_incs.js";

const placeMines = function() { 
    let minesMat = new Matrix(numCols);

    const matIdxArr = [...range(numRows * numCols)];                                                                   
    const shuffledArray = shuffle(matIdxArr);
    const slicedAndShuffledArray = shuffledArray.slice(0, mineNumRange.length);
                                 
    slicedAndShuffledArray.forEach(place => { 
        const mineRow = Math.floor(place / numRows);
        const mineCol = place % numCols;

        minesMat.setElement(1, mineRow, mineCol);
    });
                                 
    return minesMat;
};

const minesNearby = function(j, i, minesMat) {
    let checkEls = [];
 
    getMinesNearby(j, i, (nextRow, nextCol) => {
	   checkEls = [...checkEls, minesMat.getElement(nextRow, nextCol)];
    }); 
    return checkEls;
};
const numMinesNear = function(j, i, minesMat) {
    const checkEls = minesNearby(j, i, minesMat); 
    return checkEls.reduce((totalMines, isMine) => totalMines + isMine);
};
const getMinesNearby = function(j, i, cb) {
    const row = j-1;
    const col = i-1;
    let nextRow;
    let nextCol;
   
    for(let rowIt = 0; rowIt < 3; rowIt++) {
        for(let colIt = 0; colIt < 3; colIt++) {
            nextRow = row + rowIt;
            nextCol = col + colIt;
            if(nextRow >= 0 && nextRow < numRows && nextCol >= 0 && nextCol < numCols)
                cb(nextRow, nextCol);
            else continue;
        }
    }
}; 

export { placeMines, minesNearby, numMinesNear, getMinesNearby };
