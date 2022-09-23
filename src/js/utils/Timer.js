const Timer = function(interval) {
    let timerID;

    this.startTimer = function(callback) {
	    timerID = setInterval(callback, interval);
	};

    this.cancelTimer = function() {
	    clearInterval(timerID);
	};
};

export { Timer };
