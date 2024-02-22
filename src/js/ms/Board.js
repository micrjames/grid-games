import { Cells } from "./Cells.js";
import { Range } from "../range.min.js";
import { shuffle } from "../shuffle.min.js";
export class Board {
    constructor(board, size) {
        this.board = board;
        this.size = size;
        this.cells = new Cells(size);
    }
    create() {
        this.cells.set();
        this.cells.add(this.board);
    }
    setMines(minesMat, num) {
        const numRows = Math.sqrt(this.size);
        const numCols = numRows;
        const mineNumRange = [...new Range(num)];
        const matIdxArr = [...new Range(this.size)];
        const shuffledArray = shuffle(matIdxArr);
        const slicedAndShuffledArray = shuffledArray.slice(0, mineNumRange.length);
        slicedAndShuffledArray.forEach(place => {
            const mineRow = Math.floor(place / numRows);
            const mineCol = place % numCols;
            minesMat.setElement(1, mineRow, mineCol);
            this.board.children[place].classList.add("mine");
        });
    }
    reset() {
        while (this.board.firstChild)
            this.board.removeChild(this.board.lastChild);
    }
}
