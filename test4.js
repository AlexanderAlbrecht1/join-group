/**
 * 
 * sets Styles from Object to a given Elemen
 * 
 * example:
 *      let node=document.getElementId("element");
 *      let obj={color: red, border: 1px solid grey}
 *      formatStyle(node,obj);
 * 
 * @param {element} node 
 * @param {object} styles 
 * @returns - nothing
 */
function styleFormInputs(formSelector, styleObject) {
    let form = document.querySelector(formSelector);
    if (!form) return false;

    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        formatStyles(input,styleObject); // some extra formats

        input.addEventListener("invalid",e => {
            e.preventDefault();
            e.target.nextSibling
        });

    });
    return true;
}

/**
 * 
 * sets Styles from Object to a given Elemen
 * 
 * example:
 *      let node=document.getElementId("element");
 *      let obj={color: red, border: 1px solid grey}
 *      formatStyle(node,obj);
 * 
 * @param {element} node 
 * @param {object} styles 
 * @returns - nothing
 */
function formatStyles(node,styles) {
    if (styles == null) return;
    for (let [key, value] of Object.entries(styles)) {
        node.style[key] = value;
    }
}