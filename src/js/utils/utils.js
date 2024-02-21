// Convert a string to spinal case. Spinal case in all-lowercase-words-joined-by-dashes.
const spinalCase = str => {
   const strArr = str.toLowerCase().split(' ');
   const spinaled = strArr.join('-');
   return spinaled;
};
const titleCase = str => {
	const strArr = str.split(' ');
    const titled = strArr.map(word => {
	    const upperStart = word[0].toUpperCase();
	    const restWord = word.slice(1, str.length);
	    return upperStart + restWord.toLowerCase();
	});
    const titledStr = titled.join(' ');
    return titledStr;
};
const getRandomIdx = function(size) {                                      
    const iconIndex = Math.floor(Math.random() * size);                     
    return iconIndex;                                                       
};

export { spinalCase, titleCase, getRandomIdx };
