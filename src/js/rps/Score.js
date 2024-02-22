export class Score {
    constructor() {
        this.reset();
    }
    reset() {
        this._score = {
            player: "0",
            computer: "0"
        };
    }
    incScore(which) {
        let score = parseInt(this._score[which]);
        score++;
        this._score[which] = score.toString();
    }
    getScore(which) {
        return this._score[which];
    }
}
