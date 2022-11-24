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

   getRow(which) {
	   return this.#mat.filter((row, index) => index == which).flat();
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
