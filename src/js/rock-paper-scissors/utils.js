const buildEl = function(el, className=null, idName=null) {                  
    const element = document.createElement(el);                              
    if(className != null) element.setAttribute("class", className);          
    if(idName != null) element.setAttribute("id", idName);                   
                                                                             
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

const addIcon = function(context, name) {
   const icon = createIcon(`fa-regular fa-${name}`);
   context.appendChild(icon);

   return icon;
};

const removeIcon = function(context, name) {
   context.classList.remove(`${name}`);                                                            
   context.removeChild(context.lastChild);
};

const switchClasses = function(context, before, after) {
   context.classList.remove(before);
   context.classList.add(after);
};

export { buildEl, addIcon, removeIcon, switchClasses };
