class Matrix {
   #mat = [];

   constructor(N) {
	   for(let i = 0; i < N; i++) {
		   this.#mat = [...this.#mat, Array(N).fill(0)];
	   }
   }

   get mat() {
	   return this.#mat;
   }

   setElement(val, row, col) {
	   this.#mat[row][col] = val;
   }

   getRow(which) {
	   return this.#mat.map(row => row[which]);
   }
   getCol(which) {
       return this.#mat.map(row => row[which]);
   }
   
   get diagonal() {
	   let pivot = 0;
	   return this.#mat.map((row, index) => {
		   if(index == pivot) {
			  pivot++;
			  return row[index];
		   }
	   });
   }
   get counterDiagonal() {
	   let pivot = 0;
	   return this.#mat.map((row, index) => {
		   const revRow = row.reverse();
		   if(index == pivot) {
			  pivot++;
			  return revRow[index];
		   }
	   });
   }
}

export default Matrix;
