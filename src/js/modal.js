import { modal } from "./incs.js";

const modalHdr = modal.children.namedItem("modal-header");
const modalHdrCloseBtn = modalHdr.children.namedItem("modal-header-close");
const modalHdrText = modalHdr.children.namedItem("modal-header-text");

const modalBody = modal.children.namedItem("modal-body");

export { modalHdrText, modalHdrCloseBtn, modalBody };
