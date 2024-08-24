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
    } else 
    if (!button.disabled) {
        button.disabled=true;
        button.classList.add("disable");
        button.style.color="yellow";
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
function sendButton(list) {
    let submit = inputFilled(list);
    disableCheck(submit);
}


/**
 * Init the Eventlistener for doing input checks 
 */
function initEventListener(list) {
    for (let item of list) {
        document.getElementById(item).addEventListener("input",() => sendButton(list));
    }
    sendButton(list);
}
