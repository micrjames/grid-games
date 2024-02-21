const body = document.body;
const main = body.children.namedItem("main");

const games_grid = main.children.namedItem("games-grid");
const figures = games_grid.children;

const modalEl = main.children.namedItem("modal");

export { figures, modalEl };
