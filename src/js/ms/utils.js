const switchIcons = (context, iconClassName1, iconClassName2) => {
    context.classList.remove(iconClassName1[0]);
    context.classList.remove(iconClassName1[1]);
    context.classList.add(iconClassName2[0]);
    context.classList.add(iconClassName2[1]);
};
const createIcon = function (iconClasses) {
    const icon = document.createElement("i");
    const classes = iconClasses.split(" ");
    classes.forEach(item => {
        icon.classList.add(item);
    });
    return icon;
};
const addIcon = function (context, name, className = false, type = 'regular') {
    const icon = createIcon(`fa-${type} fa-${name}`);
    context.appendChild(icon);
    if (className)
        context.classList.add(`${name}`);
    return icon;
};
export { switchIcons, createIcon, addIcon };
