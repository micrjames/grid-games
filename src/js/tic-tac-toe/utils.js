const swapTurn = function(turn) {
    turn = !turn;
    return turn;                                                                                        
};

const getPos = function(cell) {
    const pos = cell.dataset.pos;
    const splitPos = pos.split("-");
    return { row: +splitPos[0], col: +splitPos[1] }; 
};

const setOver = function(done) {                                                                        
    const gameOver = done;
    return gameOver;
};

export { swapTurn, getPos, setOver };
