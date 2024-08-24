/*
    REQUIRES: 
    events.js
    login.js
    
*/

/**
 * msgBox Send a messag to the Interface
 * 
 * @param {string} msg - Display message in the Password Box 
 */
function msgBox(msg) {
    document.getElementById("msg-box").innerHTML=msg;
}

/**
 * Checks if 2 passwords of the interface are equal
 * 
 * @returns - true if passwords are the same otherwise false
 */
function isEqualPassword() {
    let password=document.getElementById("password");
    let confirmPassword=getElementById("confirm-password");
    if (password != confirmPassword) {
        msgBox("passwords are different");
    }
    return password == confirmPassword;   
}

/**
 * Look if the User already exist
 * 
 * @param {object} userList - The List of the user
 * @param {string} email    - The Login email
 * @returns - true if user exist, otherwise false
 */
function existUser(userList) {
    let email=document.getElementById("email").value;
    let index=userList.findIndex(element =>  element.email == email);
    if (index == -1) {
        msgBox(`E-mail already exist. Please choose another e-mail. <br>${email}, <a href="../login/login.html">login at your existing account ?`);
    }
    return index != -1;
}

/**
 * Add a User width all information to the table
 * 
 * @param {object} userList  List of Users 
 */
async function addUserToList(userList) {
    let password=document.getElementById("password");
    let email=document.getElementById("email"); 
    let user=document.getElementById("user");
    userList.add({user:user.value,password: password.value,email: email.value});
    await saveData("user",userList);
}

/**
 * Register new User 
 * input: password, user, email
 */
async function register() {
    if (!isEqualPassword()) return;

    let userList=await getUserList();
    if (!existUser(userList)) return;

    await addUserToList(userList);
    openDashboard(); // autologin move to the page we need to go and exit here
}

/**
 * removeUser
 * Remove all information of a user
 * - in database, localstorage, session
 * 
 * @param {object} userList - List aof all Users
 * @param {integer} index    - the found index from index search
 */
async function removeUser(userList,index) {
    userList.splice(index,1); // Remove User self 
    saveData("user",userList);
    clearLocalStorage();
    sessionDestroy();
    clearLoginFields();
    msgBox(`Your data is completely deleted! Sorry to loose you !`);
}

/**
 * passwordValidationOK
 * validate the interface with the given Password
 * 
 * @param {*} passwordOfList 
 */
function passwordValidationOK(passwordOfList)  {
    let password=document.getElementById("password");
    if (passwordOfList != password.value) {
        msgBox("The mail-password validation failed !");
    }
}

/**
 * Remove User from all permanent
 * given Information from Interface
 * redirect to Login at least
 */
async function unregister() {
    let email=document.getElementById("email");
    let userList=await getUserList();
    let index= userList.findIndex(element =>  element.email == email.value);
    if (index != -1) {
        if (passwordValidationOK(userList[index].password)) {
            removeTasksOf(email.value);    // Remove all Tasks of the user
            removeUser(userList,index);    // remove all Userinformation and cleanup
            openPage("../login/login.html");
        }
    } else {
        msgBox(`User doesn't exist`);
    }
}

/**
 * Init the Eventlistener for doing input checks for the registration
 */
function initEventListenerRegister() {
    let list=["email","user","password","confirm-password","privacy-policy"];
    initEventListener(list);

}

/**
 * First initialation of document
 */
function init() {
    initEventListenerRegister() ;
    //isLogged();
}
