export class Matrix {
    constructor(N) {
        this.N = N;
        this.clear();
    }
    static fromArray(array) {
        const N = array.length;
        const arrMat = new Matrix(N);
        arrMat._mat = array;
        return arrMat;
    }
    set() {
        for (let i = 0; i < this.N; i++) {
            this._mat = [...this._mat, Array(this.N).fill(0)];
        }
    }
    clear() {
        this._mat = [];
        this.set();
    }
    get size() {
        return this.N;
    }
    get mat() {
        return this._mat;
    }
    setElement(val, j, i) {
        this._mat[j][i] = val;
    }
    getElement(j, i) {
        return this._mat[j][i];
    }
    setRow(val, which) {
        this._mat[which] = val;
    }
    getRow(which) {
        return this._mat.filter((_, index) => index == which).flat();
    }
    getCol(which) {
        return this._mat.map(row => row[which]);
    }
    getDiagonal(k) {
        let diagonal = [];
        let pivot = Math.abs(k);
        if (k >= 0) {
            for (let rowIndex = 0; rowIndex < this.N; rowIndex++) {
                for (let colIndex = 0; colIndex < this.N; colIndex++) {
                    if (colIndex == pivot) {
                        pivot++;
                        diagonal = [...diagonal, this._mat[rowIndex][colIndex]];
                        break;
                    }
                }
            }
        }
        else {
            for (let colIndex = 0; colIndex < this.N; colIndex++) {
                for (let rowIndex = 0; rowIndex < this.N; rowIndex++) {
                    if (rowIndex == pivot) {
                        pivot++;
                        diagonal = [...diagonal, this._mat[rowIndex][colIndex]];
                        break;
                    }
                }
            }
        }
        return diagonal;
    }
    getCounterDiagonal(k) {
        const counterMatrix = new Matrix(this.N);
        this._mat.forEach((row, index) => {
            const revRow = row.reverse();
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
    transpose() {
        const tMat = new Matrix(this.N);
        for (let j = 0; j < this.N; j++) {
            for (let i = 0; i < this.N; i++) {
                tMat.mat[j][i] = this._mat[i][j];
            }
        }
        return tMat;
    }
    add(thatMat) {
        const addedArray = this._mat.map((row, rowIndex) => {
            return row.map((el, elIndex) => {
                return el + thatMat.mat[rowIndex][elIndex];
            });
        });
        return Matrix.fromArray(addedArray);
    }
    multiply(thatMat) {
        const multArray = this._mat.map((row, rowIndex) => row.map((_, colIndex) => {
            const row = this.getRow(rowIndex);
            const col = thatMat.getCol(colIndex);
            return row.reduce((accumulator, currentValue, currentIndex) => {
                return currentValue * col[currentIndex] + accumulator;
            }, 0);
        }));
        return Matrix.fromArray(multArray);
    }
    multiply_scalar(scalar) {
        return Matrix.fromArray(this._mat.map(row => row.map(el => scalar * el)));
    }
    toString() {
        let mstring = '';
        this._mat.forEach((row, rowIndex) => {
            mstring += '[\t';
            row.forEach((_, colIndex) => {
                mstring += this._mat[rowIndex][colIndex] + '\t';
            });
            mstring += ']\n';
        });
        return mstring;
    }
}
