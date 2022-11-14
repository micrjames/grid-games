import { createSelection, createResults, resetScore } from "./rps.js";
import { rps, iconClassNames } from "./game_incs.js";

const startRPS = function() {
    resetScore();
    createResults(rps, iconClassNames[2].icon, iconClassNames[0].icon, "0", "0");
    createSelection(rps, iconClassNames);
};

const resetRPS = function() {
    rps.removeChild(rps.firstChild);
    rps.removeChild(rps.firstChild);

    startRPS();
};

export { startRPS, resetRPS };
