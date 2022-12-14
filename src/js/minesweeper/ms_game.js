import { buildEl, addClasses, addIcon, removeIcon, switchClasses, idxToRC, rcToIdx } from "../utils/utils.js";
import { getMinesNearby, numMinesNear } from "./ms_mines.js";
import { numRows, numCols } from "./game_incs.js";
import Matrix from "../utils/Matrix.js";

const createCell = function() {
    const cell = buildEl("div");
    addClasses(cell, "cell", "covered");
 
    return cell;
};

const createBoard = function(size, minesMat) {
    const placementArr = minesMat.mat.flat()
    const cellFragment = buildCellFragment(size, placementArr, "mine");
    return cellFragment;
};

const buildCellFragment = function(size, placementArr, className) {
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < size; i++) {
        const cell = createCell();
        if(placementArr[i] == 1) cell.classList.add(className);
 
        fragment.appendChild(cell);
    }
    return fragment;
};

const manageFlag = function(cell, minesDisplay, numMines) {
    let totalNumMines = numMines;
    if(cell.children.length) {
        if(cell.classList.contains("flag")) {
            removeIcon(cell, "flag");
            totalNumMines++;
        }
    } else {
        addIcon(cell, "flag", true);
        totalNumMines--;
    }
    if(totalNumMines < 10) totalNumMines = `0${totalNumMines}`;
    minesDisplay.textContent = totalNumMines;

    return totalNumMines;
};

const manageCellState = function(cell) {
    switchClasses(cell, "covered", "uncovered");
    if(cell.classList.contains("mine")) {
        if(cell.classList.contains("flag")) {
            removeIcon(cell, "flag");
        }
        addIcon(cell, "bomb");
    } else if(cell.classList.contains("burst")) {
        if(cell.classList.contains("flag")) {
            removeIcon(cell, "flag");
        }
        addIcon(cell, "burst");
    } else if(cell.classList.contains("flag")) {
        removeIcon(cell, "flag");
    }
};

const enumCells = function(cells, cell) {
    for(let i = 0; i < cells.length; i++) {
        if(cells[i] === cell) {
		    return [...idxToRC(i, numRows, numCols)];
        }
    }
};

const deleteCells = function(cells, row, col, minesMat) {
    let delsMat = new Matrix(minesMat.size);
    getMinesNearby(row, col, (nextRow, nextCol) => {
        delsMat.setElement({ row: nextRow, col: nextCol }, nextRow, nextCol);
    }); 
    delsMat.mat.forEach(delsRow => {
	   delsRow.forEach(del => {
           if(del) {
               const cellIndex = rcToIdx(del.row, del.col, numCols);
               switchClasses(cells[cellIndex], "covered", "uncovered");
           }
       });
    });
};

const addNumOnCell = function(cells, row, col, minesMat) {
    getMinesNearby(row, col, (nextRow, nextCol) => {
	   const numMinesNearPeriph = numMinesNear(nextRow, nextCol, minesMat);
	   const cellIndex = rcToIdx(nextRow, nextCol, numCols);
	   if(!cells[cellIndex].children.length)
		   addIcon(cells[cellIndex], `${numMinesNearPeriph}`, false, "solid");
	   cells[cellIndex].classList.add("numbers");
    }); 
};

export { createBoard, manageFlag, manageCellState, enumCells, deleteCells, addNumOnCell };
