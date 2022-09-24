import { createSelection, createResults } from "./rps.js";
import { rps, iconClassNames } from "./game_incs.js";

const startRPS = function() {
    createResults(rps, iconClassNames);
    createSelection(rps, iconClassNames);
};

export { startRPS };
