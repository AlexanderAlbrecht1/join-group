
/**
 * Init the Eventlistener for doing input checks for the Login
 */
function XinitEventListenerLogin() {
    let list=["email","password"];
    initEventListener(list);
}

/*
         ACHTUNG wird in LOGIN.js überschrieben
*/
function initOLD() {
    loadUserFromLocalStorage();
    // initEventListenerLogin();
    addFormListener('#login-card');
}
