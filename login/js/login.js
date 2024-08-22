const PROJECT="join2024-326";

let msg="";
/**
 * login()
 * input form HTML input field
 * output err to HTML output field 
 */
function login() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");

    if (isLoginCorrect(user,password)) openDashboard();
}

/**
 * load next HTML, login success
 */
function openDashboard() {
    openPage("./dashbord/index.html");
}

/**
 */
/**
 * load next HTML, geneerell alias
 * 
 * @param {url} url - open a HTML and exit from here
 */
function openPage(url) {
    window.location = url;
}

/**
 * Check if given Login has success
 * 
 * @param {string} user      - user that tries to login
 * @param {string} password  - the password that belongs to the user
 * @param {bool} showmsg   - true if user should get information, false = no feedbak
 * @returns - true if user and password are OK otherwise false
 */
// Jörg regelt JS
async function isLoginCorrect(user,password,showmsg=true) {
    let userList=await getUserList();
    let found=userList.findIndex((element) => element.user == user);
    let msg="User and password is correct";
    let focus=null;  
    
    if (found == -1) {
        msg="User not found";
        focus="user";
    } else 
    if (userList[found].password != password) {
        msg="You chose a wrong password";
        focus="password";
    } 

    if (showmsg) {
        if (focus != null) document.getElementById(focus).focus();
        document.getElementById("login-msg").innerHTML=msg;
    }
    return focus == null;
}


/**
 * - Load User and Passwort from Local Stroage if remembered
 * - Compare width Database if still available
 * - if everything OK Open next HTML 
 * @returns - false if User was not loaded
 */
async function loadUserFromLocalStorage() {
    let userRow=await getSavedUserFromLocalStorage(PROJECT);
    if (userRow != null) {
        if (isLoginCorrect(userRow.user, userRow.password,false)) {
            openDashboard(); // Exit from here
            return true;
        }
    }
    return false;
}

/**
 * prepare user / password and to save to local storage
 */
function saveUserToLocalStorage() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    saveToLocalStorage(PROJECT,{user,password});
}

/**
 * clear  user / password in storage
 */
function clearLocalStorage() {
    removeKeyInLocalStorage(PROJECT);
}


/**
 * if checked save user data to the local storage, get it back later
 * else we clear the loclstorage 
 */    
function rememberMe() {
    if (document.getElementById("remember-me").checked) {
        saveUserToLocalStorage();
    } else {
        emptyLocalStorage();
    };
}




function register() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    // let email

}