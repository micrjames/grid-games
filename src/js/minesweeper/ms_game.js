import { buildEl, addClasses } from "../utils/utils.js";

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

export { createBoard };
