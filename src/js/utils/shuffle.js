import Random from "./Random.js";

const shuffle = function(array) {
    const randNum = new Random(0);
    let j;
    for(let i = array.length-1; i > 0; i--) {
		randNum.maximum = i;
		j = randNum.integer;
	    
	    [array[i], array[j]] = [array[j], array[i]];
	}

    return array;
};

export { shuffle };
