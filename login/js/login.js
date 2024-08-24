const PROJECT="join2024-326";

let msg="";
/**
 * run this after given user and password
 * 
 * login()
 * input form HTML input field
 * output err to HTML output field 
 */
async function login() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");

    if (await isLoginCorrect(user.value,password.value)) {
        sessionSave(PROJECT,{user:user,password:password});
        rememberMe();
        openDashboard();
    }
}

/**
 * Logout user
 * reset inputfields
 * destry the session info
 */
function logout() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    user.value="";
    password.value="";
    sessionDestroy(PROJECT);
}

/**
 * load next HTML, login success
 */
function openDashboard() {
    openPage("../dashboard/dashboard.html");
}

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
    let msg="User and password is correct";
    let focus=null;  
    let found=-1;
    if (userList != null) found=userList.findIndex((element) => element.user == user);
    
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
        document.getElementById("msg-box").innerHTML=msg;
    }
    return focus == null;
}

/**
 * Alias to have better reading to get the Userlist
 * 
 * @returns JSON array wth all user information
 */
async function getUserList() {
    return await loadData("user");
}

/**
 * run this before we enter user and passowrd
 * 
 * - Load User and Passwort from Local Stroage if remembered
 * - Compare width Database if still available
 * - if everything OK Open next HTML 
 * @returns - false if User was not loaded
 */
async function loadUserFromLocalStorage() {
    let userRow=loadFromLocalStorage(PROJECT);
    if (userRow != null) {
        if (await isLoginCorrect(userRow.user, userRow.password,false)) {
    
            putLoginToValue(userRow.user,userRow.password);
            openDashboard(); // Exit from here
            return true;
        }
    }
    return false;
}

/** 
 * put in Mask to have it later again, do we need it ?
 * 
 * @param {string} user 
 * @param {password} pw 
 */
function putLoginToValue(user,pw) {
    document.getElementById("password").value=pw;
    document.getElementById("user").value=user;
}

/**
 * run this after login
 * 
 * prepare user / password and to save to local storage
 */
function saveUserToLocalStorage() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    saveToLocalStorage(PROJECT,{user:user.value, password:password.value});
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
        clearLocalStorage();
    };
}

/**
 * Guest Login no need to enter user or Password
 * Some Data is also prepared
 */
function guestLogin() {
    putLoginToValue("guest","");
    document.getElementById("remember-me").checked=false;
    login();
}