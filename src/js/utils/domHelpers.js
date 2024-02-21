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
const buildEl = function(el, className=null, idName=null, text=null) {
    const element = document.createElement(el);                              
    if(className != null) element.setAttribute("class", className);          
    if(idName != null) element.setAttribute("id", idName);     
    if(text) {
      const elTxt = document.createTextNode(text);
	   element.appendChild(elTxt);
    }   
                                                                             
    return element;                                                          
}; 
const createIcon = function(iconClasses) {
   const icon = document.createElement("i");
	
   const classes = iconClasses.split(" ");
   classes.forEach(item => {
	  icon.classList.add(item);
   });
	
   return icon;
};

const addIcon = function(context, name, className=false, type='regular') {
   const icon = createIcon(`fa-${type} fa-${name}`);
   context.appendChild(icon);
   if(className) context.classList.add(`${name}`);

   return icon;
};

const switchVisibility = function(context1, context2) {
   if(context1.classList.contains("hidden")) {
      context1.classList.remove("hidden"); 
      context2.classList.add("hidden");
   }
}

export { createSpan, changeSectionVisibility, buildEl, createIcon, addIcon, switchVisibility };
