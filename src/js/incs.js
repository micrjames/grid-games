const body = document.body;
const main = body.children.namedItem("main");
const modal = main.children.namedItem("modal");

const games = main.children.namedItem("games-grid");

export { modal, games };
