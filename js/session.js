/*
    global variables for all 
*/
const PROJECT="join2024-326";

/**
 * Remove the content of a key in the session
 * 
 * @param {string} key 
 */
function sessionDestroy(key = null) {
    if (key == null) sessionStorage.clear()
    else sessionStorage.removeItem(key);
}

/**
 * load a key from session
 * 
 * @param {string} key - key to load from
 * @returns - JSON array 
 */
function sessionLoad(key) {
    return JSON.parse(sessionStorage.getItem(key)); 
}

/**
 * saves a JSON array to the key to the session
 * @param {string} key    - key
 * @param {object} value  - JSON array
 */
function sessionSave(key,value={}) {
    sessionStorage.setItem(key,JSON.stringify(value));
}

/**
 * Redirect to login, if not Logged
 * add it to every init() {isLogged()} 
 * or body onload="isLogged()"
 */
function isLogged() {
    if(sessionLoad(PROJECT) == null) {
        openPage('../login.html');  // or as Pop Up
    };
}