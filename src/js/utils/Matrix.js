class Matrix {
   #mat = [];
   #N;

   constructor(N) {
	   this.#N = N;
	   this.set(N);
   }

   set() {
	   for(let i = 0; i < this.#N; i++) {
		   this.#mat = [...this.#mat, Array(this.#N).fill(0)];
	   }
   }

   clear() {
	   this.#mat = [];
	   this.set();
   }

   get size() {
	   return this.#N;
   }

   get mat() {
	   return this.#mat;
   }

   setElement(val, j, i) {
	   // since matrix is built from an array of rows,
	  //  this order is necessary
	   this.#mat[j][i] = val;
   }
   getElement(j, i) {
	   return this.#mat[j][i];
   }

   setRow(val, which) {
	   this.#mat[which] = val;
   }

   getRow(which) {
	   return this.#mat.filter((_, index) => index == which).flat();
   }
   getCol(which) {
       return this.#mat.map(row => row[which]);
   }
   
   getDiagonal(k) {
	   let diagonal = [];
	   let pivot = k;
	   for(let rowIndex = 0; rowIndex < this.#N; rowIndex++) {
		   for(let colIndex = 0; colIndex < this.#N; colIndex++) {
			     if(colIndex == pivot) {
					pivot++;
					diagonal = [...diagonal, this.#mat[rowIndex][colIndex]];

					break;
				 }
		   }
	   }

	   return diagonal;
   }
   getCounterDiagonal(k) {
	   const counterMatrix = new Matrix(this.#N);
	   this.#mat.forEach((row, index) => {
		   const revRow = row.reduce((acc, item) => [item].concat(acc), []);
		   counterMatrix.setRow(revRow, index);
	   });

	   const reverseCounterDiagonal = counterMatrix.getDiagonal(k);
	   const counterDiagonal = reverseCounterDiagonal.reverse();
	   return counterDiagonal;
   }
   get main_diagonal() {
	   return this.getDiagonal(0);
   }
   get main_counterDiagonal() {
	   return this.getCounterDiagonal(0);
   }

   add(thatMat) {
	   const matsArr = this.#mat.concat(thatMat.mat);
	   const flatMats = matsArr.flat();
	   const size = this.#mat.flat().length;
	   const addedMats = flatMats.map((currentValue, currentIndex) => {
		   if(currentIndex < size) return currentValue + flatMats[currentIndex + size]; 
	   }).filter(el => el);
	   const unFlatMats = addedMats.reduce((accumulator, _, currentIndex) => {
		   return currentIndex % this.#N == 0 ? accumulator.concat([addedMats.slice(currentIndex, currentIndex + 2)]) : accumulator
	   }, []);
	   return unFlatMats;
   }
   multiply(thatMat) {
	   return this.#mat.map((row, rowIndex) => row.map((_, colIndex) => {
		  const row = this.getRow(rowIndex);
		  const col = thatMat.getCol(colIndex);
		  return row.reduce((accumulator, currentValue, currentIndex) => {
			 return currentValue * col[currentIndex] + accumulator;
		  }, 0);
	   }));
   }
   multiply_scalar(scalar) {
	   return this.#mat.map(row => row.map(el => scalar * el));
   }
}

export default Matrix;
