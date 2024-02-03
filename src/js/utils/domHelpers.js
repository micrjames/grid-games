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

exports.createSpan = createSpan;
