import Matrix from "./utils/Matrix.js";

const body = document.body;
const main = body.children.namedItem("main");
const modal = main.children.namedItem("modal");

const games = main.children.namedItem("games-grid");

const mat = {};
mat.circle = new Matrix(3);
mat.x = new Matrix(3);

export { modal, games, mat };
