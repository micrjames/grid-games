import { Countdown } from "../libs/countdown.min.js";
import { Matrix } from "../libs/matrix.min.js";
import { Board } from "./Board.js";
import { switchIcons, addIcon } from "./utils.js";
export class MS {
    constructor(game, n) {
        const gameInterface = game.firstElementChild;
        this.gameBoard = gameInterface.nextElementSibling;
        this.countdownDisplay = gameInterface.children[2];
        this.totalSeconds = 10;
        this.minesDisplay = gameInterface.children[0];
        const btnGroup = gameInterface.children[1];
        this.boardResetBtn = btnGroup.firstElementChild;
        this.boardResetBtnIcon = this.boardResetBtn.firstElementChild;
        this.winningMsg = game.children.namedItem("winning-message");
        this.instructionsMsg = this.winningMsg.nextElementSibling;
        this.minesMat = new Matrix(n);
        this.board = new Board(this.gameBoard, n * n);
        this.resetHandler = this.resetHandler.bind(this);
        this.start(this.totalSeconds.toString(), "10");
    }
    start(seconds, numMines) {
        this.board.create();
        this.board.setMines(this.minesMat, 10);
        console.log(this.minesMat.toString());
        this.minesDisplay.textContent = numMines;
        this.countdownDisplay.textContent = seconds;
        this.countdown = new Countdown(this.totalSeconds, remainingTime => {
            if (this.countdown.seconds < 10)
                seconds = `0${remainingTime}`;
            else
                seconds = remainingTime.toString();
            this.countdownDisplay.textContent = seconds;
        }, () => {
            this.gameBoard.dispatchEvent(new Event("gameover"));
        });
        this.gameBoard.addEventListener("gameover", () => {
            this.countdown.end();
            this.setGameover();
            const cells = this.gameBoard.children;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].classList.contains("covered"))
                    switchIcons(cells[i], ["covered"], ["uncovered"]);
                if (cells[i].classList.contains("mine"))
                    addIcon(cells[i], "bomb", true, "solid");
            }
        }, { once: true });
    }
    setGameover() {
        switchIcons(this.boardResetBtnIcon, ["fa", "fa-smile-o"], ["far", "fa-dizzy"]);
        this.instructionsMsg.classList.add("hidden");
        this.boardResetBtn.addEventListener("click", this.resetHandler);
    }
    resetHandler() {
        switchIcons(this.boardResetBtnIcon, ["far", "fa-dizzy"], ["fa", "fa-smile-o"]);
        this.board.reset();
        this.minesMat.clear();
        this.boardResetBtn.removeEventListener("click", this.resetHandler);
        this.instructionsMsg.classList.remove("hidden");
        this.start(this.totalSeconds.toString(), "10");
        //this.board.setMines(this.minesMat, 10);
    }
}
