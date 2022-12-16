const remZeroes = function(arr) {                                                                       
    const idxArr = arr.map((el, index) => { if(el == 1) return index });
    // const idxNumsArr = idxArr.filter(el => el !== undefined); 
    
    return idxArr;
};
const removedZeroesIdx = function(arr) {
    return arr.map((idx, index) => {
        if(idx === undefined) {
            return index; 
       }
    }).filter(el => el !== undefined);
};
const getArrRuns = function(arr) {
    let runsArr = [];
    let runs = [];
 
    for(let i = 0; i <= arr.length; i++) {
        if(arr[i] === undefined || arr[i] == arr.length) {
            if(runs.length) {
                runsArr = [...runsArr, runs];
                runs = []; 
            }
        }
        else runs = [...runs, arr[i]];
   }
 
   return runsArr;
};
const matchRun = function(runsArr, targetRun, value) {                                                    
    for(let i = 0; i < runsArr.length; i++) {
        if(runsArr[i].length == targetRun && runsArr[i].includes(value)) return true;
    }
    return false;
};

export { remZeroes, removedZeroesIdx, getArrRuns, matchRun };
