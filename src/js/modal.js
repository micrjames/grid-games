const closeBtn = getElement(".modal-header-close");  
const modal = getElement(".modal");
const modalTrigger = getElement("#modal-trigger");                        
const modalHdrText = getElement(".modal-header-text");
 
closeBtn.addEventListener("click", closeModal);
function closeModal() {
   modal.classList.add("hidden");
}
 
modalTrigger.addEventListener("click", triggerModal);
function triggerModal() {
   modal.classList.remove("hidden");
}

function getElement(selector) {
   return document.querySelector(selector);
}

export { modalTrigger, modalHdrText, closeBtn };
