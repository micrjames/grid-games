import { titleCase } from "../../js/utils/utils.js";
import { changeSectionVisibility } from "../../js/utils/domHelpers.js";
import { Cell } from "./Cell.js";
import { Matrix } from "../matrix.min.js";
export class TTT {
    constructor(board) {
        this.cells = [];
        this.circleTurn = true;
        this.gameOver = false;
        this._board = board;
        this.cellEls = board.children;
        for (let i = 0; i < this.cellEls.length; i++) {
            this.cells.push(new Cell(this.cellEls[i]));
        }
        this.CLASS = {
            X: "x",
            CIRCLE: "circle"
        };
        this.MAT = {
            X: new Matrix(3),
            CIRCLE: new Matrix(3)
        };
        this.start();
    }
    setMarks() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].handleClick(() => {
                if (!this.gameOver) {
                    const currentClass = this.circleTurn ? this.CLASS.CIRCLE : this.CLASS.X;
                    this.cells[i].pos = this.cells[i].pos;
                    console.log(this.cells[i].pos);
                    console.log('circle turn?', this.circleTurn);
                    this.setMark(i, currentClass);
                    if (this.checkWin(currentClass, this.cells[i].pos)) {
                        const titledClass = titleCase(currentClass);
                        this.endGame(`${titledClass} wins!`);
                    }
                    else if (this.checkDraw()) {
                        console.log("There is a draw!");
                        this.endGame("There is a draw!");
                    }
                    this.circleTurn = !this.circleTurn;
                    this.setBoardHoverClass();
                }
            });
        }
    }
    setMark(which, className) {
        this.MAT[className.toUpperCase()].setElement(1, this.cells[which].pos.row, this.cells[which].pos.col);
        console.log(this.MAT.X.toString());
        console.log(this.MAT.CIRCLE.toString());
        console.log('circle turn?', this.circleTurn);
        this.cells[which].cell.classList.add(className);
    }
    setup() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].cell.classList.contains(this.CLASS.X))
                this.cells[i].cell.classList.remove(this.CLASS.X);
            else if (this.cells[i].cell.classList.contains(this.CLASS.CIRCLE))
                this.cells[i].cell.classList.remove(this.CLASS.CIRCLE);
        }
        this.toggleUIEls(this._board.nextElementSibling);
    }
    setBoardHoverClass() {
        this._board.classList.remove(this.CLASS.X);
        this._board.classList.remove(this.CLASS.CIRCLE);
        if (this.circleTurn)
            this._board.classList.add(this.CLASS.CIRCLE);
        else
            this._board.classList.add(this.CLASS.X);
    }
    start() {
        this.setup();
        this.setBoardHoverClass();
    }
    checkWin(currentClass, pos) {
        const matrix = this.MAT[`${currentClass.toUpperCase()}`];
        // pos always intersects with some row and some column
        if (matrix.getRow(pos.row).every(el => el == 1))
            return true;
        if (matrix.getCol(pos.col).every(el => el == 1))
            return true;
        // does pos intersect with diagonal?
        // pos.col == pos.row
        if (pos.col == pos.row) {
            if (matrix.main_diagonal.every(el => el == 1))
                return true;
        }
        // does pos intersect with counter diagonal?
        // pos.row == matrix_size - pos.col
        if (pos.row == ((matrix.size - 1) - pos.col)) {
            if (matrix.main_counterDiagonal.every(el => el == 1)) {
                return true;
            }
        }
        return false;
    }
    checkDraw() {
        const circleMat = this.MAT.CIRCLE.mat;
        const xMat = this.MAT.X.mat;
        const flatCircleMat = circleMat.flat();
        const flatXMat = xMat.flat();
        const addedFlatMats = flatCircleMat.map((el, index) => el + flatXMat[index]);
        return addedFlatMats.every(el => el == 1);
    }
    endGame(msg) {
        this.gameOver = !this.gameOver;
        this.toggleUIEls(this._board.nextElementSibling, msg);
    }
    toggleUIEls(winningMsg, msg) {
        const instructionsMsg = winningMsg === null || winningMsg === void 0 ? void 0 : winningMsg.nextElementSibling;
        if (this.gameOver) {
            const winningMsgText = winningMsg === null || winningMsg === void 0 ? void 0 : winningMsg.children[0];
            if (winningMsgText)
                winningMsgText.textContent = msg;
            changeSectionVisibility(winningMsg, instructionsMsg);
        }
        else {
            changeSectionVisibility(instructionsMsg, winningMsg);
        }
    }
}
