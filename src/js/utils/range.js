const range = (end, start=0, step=1) => {
	function *generateRange() {
	   let x = start - step;
	   while(x < end - step) yield x += step;
	}

    return {
	   [Symbol.iterator]: generateRange
	};
};

export { range };
