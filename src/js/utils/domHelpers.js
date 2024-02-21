const createSpan = (className = "", text = "", id = "") => {
   const span = document.createElement("span");
   if(id)                         
	  span.setAttribute("id", id);
   if(className)                            
	  span.setAttribute("class", className);
   if(text) {
	  const modalBodyTxt = document.createTextNode(text);
	  span.appendChild(modalBodyTxt);
   }           
   return span;
};
const changeSectionVisibility = function(context1, context2) {                                        
    context1.classList.remove("hidden");
    context2.classList.add("hidden");
};

export { createSpan, changeSectionVisibility };
