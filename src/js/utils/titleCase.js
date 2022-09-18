const titleCase = (str, uned) => {
	const strArr = str.split(' ');
    const titled = strArr.map(word => {
	    let upperStart;
	    if(uned) upperStart = word[0].toLowerCase(); 
	    else upperStart = word[0].toUpperCase();
	   	const restWord = word.slice(1, word.length);
	    return upperStart + restWord.toLowerCase();
	}); 
    const titledStr = titled.join(' ');
    return titledStr;
};

export { titleCase };
