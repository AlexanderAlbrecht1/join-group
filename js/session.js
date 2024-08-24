/**
 * Remove the content of a key in the session
 * 
 * @param {string} key 
 */
function sessionDestroy(key) {
    sessionStorage.removeItem(key);
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
