import { switchIcons, addIcon } from "./utils.js";
export class Cell {
    constructor(...classNames) {
        this.cell = document.createElement("div");
        const gameOverEvent = new Event("gameover", { bubbles: true });
        for (const className of classNames) {
            this.cell.classList.add(className);
            this.cell.addEventListener("click", () => {
                if (this.cell.classList.contains("covered")) {
                    switchIcons(this.cell, ["covered"], ["uncovered"]);
                    if (this.cell.classList.contains("mine")) {
                        switchIcons(this.cell, ["mine"], ["burst"]);
                        addIcon(this.cell, "burst", true, "solid");
                        this.cell.dispatchEvent(gameOverEvent);
                    }
                }
            });
        }
    }
    add(context) {
        context.appendChild(this.cell);
    }
}
