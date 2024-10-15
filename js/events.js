/**
 * Design the Submit button 
 * and give it the possiblility of Press or not (enable/disable)
 * 
 * @param {bool} submit - input is changed to false or tru (elemnt form interface)
 */
function disableCheck(submit, id = "submit") {
    let button = document.getElementById(id)
    if (button == null) return
    if (submit) {
        enableButton(button);
    } else
        if (!button.disabled) {
            disableButton(button);
        }
}


/**
 * 
 * PUBLIC 
 * 
 * Disables the Button
 * 
 * @param {element} button - elementof the button to disable/enable
 */
function disableButton(button) {
    button.disabled = true;
    button.classList.add("disable");
    button.style.cursor = "not-allowed";
    button.style.backgroundColor = "#A0A0A0";
}


/**
 * 
 * PUBLIC 
 * 
 * Enable the Button
 * 
 * @param {element} button - elementof the button to disable/enable
 */
function enableButton(button) {
    button.disabled = false;
    button.classList.remove("disable");
    button.style.color = "";
    button.style.filter = "";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "";
}


/**
 * Check fields if they could be sent, 
 * so all flields ust be valid
 * 
 * @param {array} list - List of ids of the interface 
 * @returns - true if all fields are valid and ready to work width
 */
function inputFilled(list) {
    for (let item of list) {
        let d = document.getElementById(item);
        if (d.type == "checkbox" && d.checked == false) {
            return false;
        }
        if (!d.validity.valid) {
            return false;
        }
    }

    return true;
}


/**
 * 1. check if all fields are valid
 * 2. if valid Submit Button is enabled otherwise disabled an greyed out
 * 
 * @param {array} list - List of ids in the interface 
 */
function sendButton(event, list) {
    let submit = inputFilled(list);
    disableCheck(submit);
    addValidationMessage(event.target);
}


/**
 * 
 * Pust out message that the field iis invalid
 * 
 * @param {element} element - from inputfield the message
 */
function addValidationMessage(element) {
    let msg = document.getElementById(element.id + "-msg");
    if (msg) {
        if (!element.checkValidity()) {
            msg.innerHTML = element.validationMessage;
        } else {
            msg.innerHTML = "";
        }
    }
}


/**
 * 
 * PUBLIC
 * 
 * Disable some FormEvents
 * 
 * @param {text} formid - the name ginven th the FORM Tag
 */
function disableFormEvents(formid) {
    let form = document.getElementById(formid);
    inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(element => {
        element.addEventListener("invalid", e => e.preventDefault());
        element.addEventListener("submit", e => e.preventDefault());
    });
}


/**
* 
* PUBLIC
* 
* Add some Listeners for the input
* 
* @param {element} formSelector - The FORM we want to analyse
* @param {object} styleObject   - givin style for the Errors
*/
function addFormListener(formSelector, styleObject) {
    let form = document.querySelector(formSelector);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        styleElement(input, styleObject);
        input.addEventListener('input', eventErrorMsg);
        input.addEventListener("focusin", e => removeCustomErrorCode(input)); // to be able te re Submit ohne ALL
        input.addEventListener("blur", e => removeCustomMsg(input)); // to be able te re Submit ohne ALL
    });
}


/**
 * 
 * exchanges the standart Errormessages for pattern check
 * later add more and use an array 
 * 
 * @param {event} e - Element of the inputfield that has trieggerded
 *  
 * @returns - nothing
 */
function customMessage(element) {
    if (!element.validity.patternMismatch) {
        element.setCustomValidity(``);
        return;
    }
    let cl = element.parentElement.classList;
    if (cl.contains("new")) {
        element.setCustomValidity(`Minimum: 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 special char`);
    } else if (cl.contains("name")) {
        element.setCustomValidity(`no special chars, names has to begin width letters`);
    } else {
        element.setCustomValidity(``);
    }
}


/**
 * PUBLIC
 * 
 * Style an Elemet wid an Object
 * 
 * @param {element} node - Element that should be styleds
 * @param {*} styles - Object of Styles
 * @returns - nothing
 */
function styleElement(node, styles) {
    if (styles == null) return;
    for (let [key, value] of Object.entries(styles)) {
        node.style[key] = value;
    }
}


/**
 * 
 * PRIVATE 
 * 
 * Finds the element for the custom message and sets the Message+
 * 
 * @param {string} id 
 * @param {string} customMsg 
 * @returns - nothing
 */
function customErrorMsg(id = null, customMsg = null) {
    if (typeof (id) !== "string" || typeof (customMsg) !== "string") return;
    let sibling = document.getElementById(id);
    sibling.setCustomValidity(customMsg);
    setErrorMsg(sibling);
}


/**
 * 
 * Find the Form TAG of the inputfield we are in
 * private - called from:
 * -  eventErrorMsg
 * 
 * @param {elment} element - inputfield we use  
 * @returns - false if no FORM Tag is found, otherwise the tagName of the Forrm
 * 
 */
function getFormId(element) {
    let e = element;
    while ((e = e.parentElement) !== null) {
        if (e.tagName == "FORM") return e.id;
    }
    return false;
}


/**
 * 
 * PUBLIC
 * 
 * Finds the Form ID of Code starting by the given element
 * Returns the found element as ID QUERY TAG
 * 
 * @param {element} element 
 * @returns -id as Queryselöector
 */
function getFormQs(element) {
    return "#" + (getFormId(element) || "login-card");
}


/**
 * 
 * PUBLIC EVENT
 * 
 * Checks if the Form is allowed to send an error to each field
 * 
 * @param {event} event - input event 
 */
function eventErrorMsg(event) {
    let formquery = getFormQs(event.target);
    customMessage(event.target);
    setErrorMsg(event.target);
    let valid = isFormValid(formquery);
    disableCheck(valid);
    event.preventDefault();
}


/**
 * 
 * PRIVATE
 * 
 * Displays the error message
 * 
 * @param {element} element - set the Errormessage to the nearest SPAN TAG 
 * @returns element we search for
 */
function setErrorMsg(element) {
    sibling = element;
    while (sibling.nextElementSibling && sibling.nextElementSibling.tagName == 'SPAN') {
        sibling = sibling.nextElementSibling;
    }
    sibling.innerHTML = element.validity.valid ? "" : element.validationMessage;
    return sibling;
}


/**
 * 
 * shows the ser waht Password ist entered
 * 
 * @param {*} event - mouse event that triggered
 * @param {*} container  - No fnuction
 * @returns - nothing
 */
function togglePasswordView(event, container) {
    let passwordContainer = event.target.parentElement;
    let passwordInput = event.target.previousElementSibling;
    if (document.activeElement !== passwordInput) {
        return;
    }
    let isVisible = passwordContainer.classList.toggle("visible");
    passwordInput.type = isVisible ? "text" : "password";
    passwordInput.focus();

    event.preventDefault();
    event.stopPropagation();
}


/**
 * 
 * PUBLIC 
 * 
 * Clears error status 
 *  
 * @param {element} input - input element that has to clear the error 
 */
function removeCustomErrorCode(input) {
    input.setCustomValidity('');
}


/**
 * 
 * PRIVATE 
 * 
 * Clears the custom Error state
 * Triggert on Focus Lost
 * @param {element} input - error message element
 */
function removeCustomMsg(input) {
    input.setCustomValidity('');
    if (input.checkValidity()) {
        setErrorMsg(input);
    }
    let valid = isFormValid(getFormQs(input));
    disableCheck(valid);
}


/**
 * 
 * PUBLIC 
 * 
 * Clears all custom Error states in the form
 * @param {element} input - error message element
 */
function removeAllCustomMsg(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.setCustomValidity('');
    })
}


/**
 * 
 * PUBLIC
 * 
 * Marks all Fields text or input 
 * 
 * @param {string} formid - id for the FORM tag 
 * @returns -nothing
 */
function markAllFieds(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        customMessage(input);
        setErrorMsg(input);
    })
}


/**
 * 
 * PUBLIC
 * 
 * Checks if all Fields in the form are valid
 * 
 * @param {string} formqs - gets the nearest TAG / ID / Class
 * 
 * @returns - elemet of the form
 */
function isFormValid(formqs) {
    let form = document.querySelector(formqs);
    if (!form) return false;

    let inputs = form.querySelectorAll('input, textarea');
    let status = Array.from(inputs).findIndex(input => !input.checkValidity()) == -1;
    return status;
} 