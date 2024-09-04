
/**
 * Init the Eventlistener for doing input checks for the Login
 */
function initEventListenerLogin() {
    let list=["email","password"];
    initEventListener(list);
}

/*
         ACHTUNG wird in LOGIN.js überschrieben
*/
function init() {
    loadUserFromLocalStorage();
    // initEventListenerLogin();
    addFormListener('#login-card');
}
