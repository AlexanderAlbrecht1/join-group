
/**
 * Init the Eventlistener for doing input checks for the Login
 */
function initEventListenerLogin() {
    let list=["email","password"];
    initEventListener(list);
}

function init() {
    loadUserFromLocalStorage();
    initEventListenerLogin();
}
