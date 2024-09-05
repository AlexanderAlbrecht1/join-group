/**
 * Design the Submit button 
 * and give it the possiblility of Press or not (enable/disable)
 * 
 * @param {bool} submit - element form interface
 */
function disableCheck(submit) {
    let button=document.getElementById("submit")
    if (submit) {
        button.disabled=false;
        button.classList.remove("disable");
        button.style.color="";
        button.style.filter="";
        button.style.cursor="pointer";
    } else 
    if (!button.disabled) {
        button.disabled=true;
        button.classList.add("disable");
        button.style.filter="greyscale(100%) brightness(1.5)";
        button.style.cursor="not-allowed";

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


/**
 * Init the Eventlistener for doing input checks 
 * 
 * @param {*} list - ist a list of the ids of the input-fields we use
 */
/*
function initEventListener(list) {
    for (let item of list) {
        document.getElementById(item).addEventListener("input",(event) => sendButton(event,list));
    }
    let submit = inputFilled(list);
    disableCheck(submit);
}
*

/*
    Das soll die Eventlistener Killen von Formms 
    funktioniert aber nicht
*/
function XremoveFormEvents() {
    
    forms=document.getElementsByTagName("form");
    for (form of forms) {
        form=document.getElementById("login-form");
        console.log(form);
        form.addEventListener("submit",event => {
            event.target.preventDefault();
            alert("Hier");
        });
    }
}


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
        // input.addEventListener("invalid", e => e.preventDefault());
        input.addEventListener("input", e => {  // focusout
            // console.log(document.activeElement);
            e.target.setCustomValidity(``);
            setErrorMsg(e.target);
            // eventErrorMsg(e);
            e.preventDefault();
        } ); // XX

        input.addEventListener("focusin",e => removeAllCustomMsg(formSelector)); // to be able te re Submit
        input.addEventListener("blur",e => removeAllCustomMsg(formSelector)); // to be able te re Submit
    });
}

function styleElement(node, styles) {
    if (styles == null) return;
    for (let [key, value] of Object.entries(styles)) {
        node.style[key] = value;
    }
}            // Beispiel: Anwendung der Funktion


function customErrorMsg(id=null,customMsg=null) {
    if (typeof(id) !== "string" || typeof(customMsg) !== "string") return;
    let sibling=document.getElementById(id);
    sibling.setCustomValidity(customMsg);
    // setErrorMsg(sibling);
}

function eventErrorMsg(event) {
//     // this.setCustomValidity(``);
//     setErrorMsg(this).setCustomValidity(``);
    setErrorMsg(this);
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


function removeAllCustomMsg(formid) {
    let form = document.querySelector(formid);
    // let form = document.getElementByIdquerySelector("#"+formid);
    if (!form) return false;

    let inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.setCustomValidity('');
    })
}