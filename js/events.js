/**
 * Design the Submit button 
 * and give it the possiblility of Press or not (enable/disable)
 * 
 * @param {bool} submit - input is changed to false or tru (elemnt form interface)
 */
function disableCheck(submit,id="submit") {
    let button=document.getElementById(id)
    if (submit) {
        button.disabled=false;
        button.classList.remove("disable");
        button.style.color="";
        button.style.filter="";
        button.style.cursor="pointer";
        button.style.backgroundColor="";
    } else 
    if (!button.disabled) {
        button.disabled=true;
        button.classList.add("disable");
        // button.style.filter="grayscale(100%) brightness(1.6)";
        button.style.cursor="not-allowed";
        button.style.backgroundColor="#A0A0A0";

    }

}

/**
 * Check fields if they could be sent, 
 * so all flields ust be valid
 * 
 * @param {array} list - List of ids of the interface 
 * @returns -true if all fields are valid and ready to work width
 */
function inputFilled(list) {
    for (let item of list) {
        let d=document.getElementById(item);
        if (d.type == "checkbox" && d.checked == false) {
            return false;
        }
        if (!d.validity.valid ) {
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
function sendButton(event,list) {
    let submit = inputFilled(list);
    disableCheck(submit);
    addValidationMessage(event.target);
}

function addValidationMessage(element) {
    let msg=document.getElementById(element.id+"-msg");
    if (msg) {
        if (!element.checkValidity()) {
            msg.innerHTML = element.validationMessage;
        } else {
            msg.innerHTML = "";
        }    
    }
}    

/*
    Das soll die Eventlistener Killen von Formms 
    
*/
function disableFormEvents(formid) {
    let form=document.getElementById(formid);
    inputs = form.querySelectorAll('input');
    inputs.forEach(element => {
        element.addEventListener("invalid", e => e.preventDefault());
        element.addEventListener("submit", e => e.preventDefault());
    });
 }

/* -------------------------------- */
/* 
    Neu
*/
function addFormListener(formSelector, styleObject) {
    let form = document.querySelector(formSelector);
    if (!form) return false;

    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        styleElement(input, styleObject);
        input.addEventListener('input', eventErrorMsg);
        input.addEventListener("focusin",e => removeCustomErrorCode(input)); // to be able te re Submit ohne ALL
        input.addEventListener("blur",e => removeCustomMsg(input)); // to be able te re Submit ohne ALL
        // input.addEventListener("focusin",e => removeAllCustomMsg(formSelector)); // to be able te re Submit ohne ALL
        // input.addEventListener("blur",e => removeAllCustomMsg(formSelector)); // to be able te re Submit ohne ALL
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
    if (!element.validity.patternMismatch){
        element.setCustomValidity(``);
        return;
    }
    let cl=element.parentElement.classList;
    if (cl.contains("new")) {
        element.setCustomValidity(`Mindestens: 8 Zeichen, 1 Kleinbuchstabe, 1 Großbuchstabe, 1 Zahl, 1 Sonderzeichen`);
    } else if (cl.contains("name")) {
        element.setCustomValidity(`Kein Sonderzeichen, Namen müssen mit Buchtsaben anfangen`);    
    } else {
        element.setCustomValidity(``);
    }
}

function styleElement(node, styles) {
    if (styles == null) return;
    for (let [key, value] of Object.entries(styles)) {
        node.style[key] = value;
    }
}

function customErrorMsg(id=null,customMsg=null) {
    if (typeof(id) !== "string" || typeof(customMsg) !== "string") return;
    let sibling=document.getElementById(id);
    sibling.setCustomValidity(customMsg);
    setErrorMsg(sibling);
}

/**
 * 
 * Find the Form TAG of the inputfield we are in
 * @private - called from:
 * -  eventErrorMsg
 * 
 * @param {elment} element - inputfield we use  
 * @returns 
 * - false if no FORM Tag is found, otherwise the tagName of the Forrm
 */
function getFormId(element) {
    let e=element;
    while ((e=e.parentElement) !== null) {
        if (e.tagName == "FORM") return e.id;
    }
    return false;
}

function getFormQs(element) {
    return "#" + (getFormId(element) || "login-card");
}


function eventErrorMsg(event) {
    let formquery=getFormQs(event.target);
    customMessage(event.target);
    setErrorMsg(event.target);
    let valid=isFormValid(formquery); 
    disableCheck(valid);
    event.preventDefault();
    // if (!valid) event.preventDefault();
}

function setErrorMsg(element) {
    sibling=element;
    while (sibling.nextElementSibling && sibling.nextElementSibling.tagName == 'SPAN') {
        sibling = sibling.nextElementSibling;
    }
    sibling.innerHTML=element.validity.valid?"":element.validationMessage;
    return sibling;
}

function togglePasswordView(event,container) {
    let passwordContainer=event.target.parentElement;
    let passwordInput=event.target.previousElementSibling;
    if (document.activeElement !== passwordInput) {
       return;
    }
    let isVisible = passwordContainer.classList.toggle("visible");   
    passwordInput.type = isVisible ? "text" : "password";
    passwordInput.focus();
 
    event.preventDefault();
    event.stopPropagation();
 }

function removeCustomErrorCode(input) {
    input.setCustomValidity('');
} 

function removeCustomMsg(input) { // on Focus lost
        input.setCustomValidity('');
    if (input.checkValidity()) {
        setErrorMsg(input);
    }
    let valid=isFormValid(getFormQs(input)); 
    disableCheck(valid);
}

function removeAllCustomMsg(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.setCustomValidity('');
    })
}

function markAllFieds(formid) {
    let form = document.querySelector(formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        customMessage(input);
        setErrorMsg(input);
    })
}
