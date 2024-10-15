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
    // document.getElementById("msg-box").innerHTML=msg;
}


/**
 * Checks if 2 passwords of the interface are equal
 * 
 * @returns - true if passwords are the same otherwise false
 */
function isEqualPassword() {
    let password = document.getElementById("sign-password");
    let confirmPassword = document.getElementById("confirm-password");;
    if (password.value != confirmPassword.value) {
        customErrorMsg("confirm-password", "passwords are different");
    }
    return password.value == confirmPassword.value;
}


/**
 * Look if the User already exist
 * 
 * @param {object} userList - The List of the user
 * @param {string} email    - The Login email
 * @returns - true if user exist, otherwise false
 */
function existUser(userList) {
    let email = document.getElementById("email").value;
    let index = userList.findIndex(element => element.email == email);
    if (index != -1) {
        customErrorMsg("email", `E-mail already exist. Please choose another e-mail. <br>${email}, <a href="./index.html">login at your existing account ?`);
    }
    return index != -1;
}


/**
 * Add a User width all information to the table
 * 
 * @param {object} userList  List of Users 
 */
async function addUserToList(userList) {
    let password = document.getElementById("sign-password");
    let email = document.getElementById("email");
    let user = document.getElementById("user");

    // this part saves the new user to contacts -> contact book - start (Alex)
    contacts = await loadContacts();
    let id = await getIncrementedId("contact");
    let fullname = user.value;
    let splittedName = fullname.split(' ');
    let newFirstname = splittedName[0];
    let newLastname = [];
    if (splittedName.length == 1) {
        newLastname = ' ';
     } else {
        newLastname = splittedName[1]; 
     }
    let color = generateDarkColor();
    let newContact = {
        id: id,
        name: newFirstname,
        lastname: newLastname,
        email: email.value,
        phone: '0000000',
        color: color,
    };
    contacts.push(newContact);
    await saveData("Contacts",contacts);
    // await saveContacts();
    // - end
    userList.push({ user: user.value, password: password.value, email: email.value, id: id, });
    await saveData("user", userList);
}


/**
 * Register new User 
 * input: password, user, email
 */
async function register() {
    if (!isFormValid) return;
    if (!isEqualPassword()) return;

    let userList = await getUserList();

    console.log(userList);
    

    if (existUser(userList)) return;
    await msgfly();
    await addUserToList(userList);
    openLogin(); // autologin move to the page we need to go and exit here
}


/**
 * removeUser
 * Remove all information of a user
 * - in database, localstorage, session
 * 
 * @param {object} userList - List aof all Users
 * @param {integer} index    - the found index from index search
 */
async function removeUser(userList, index) {
    userList.splice(index, 1); // Remove User self 
    saveData("user", userList);
    clearLocalStorage();
    sessionDestroy();
    clearLoginFields();
    msgBox(`Your data is completely deleted! Sorry to loose you !`);
}


/**
 * passwordValidationOK
 * validate the interface with the given Password
 * 
 * @param {array} passwordOfList 
 */
function passwordValidationOK(passwordOfList) {
    let password = document.getElementById("sign-password");
    if (passwordOfList != password.value) {
        customErrorMsg("confirm-password", "The mail-password validation failed !");
    }
}


/**
 * Remove User from all permanent
 * given Information from Interface
 * redirect to Login at least
 */
async function unregister() {
    let email = document.getElementById("email");
    let userList = await getUserList();
    let index = userList.findIndex(element => element.email == email.value);
    if (index != -1) {
        if (passwordValidationOK(userList[index].password)) {
            removeTasksOf(email.value);    // Remove all Tasks of the user
            removeUser(userList, index);    // remove all Userinformation and cleanup
            openPage("./index.html");
        }
    } else {
        msgBox(`User doesn't exist`);
    }
}


function isFormValid(formqs) {
    let form = document.querySelector(formqs);
    if (!form) return false;
    let inputs = form.querySelectorAll('input');
    let status = Array.from(inputs).findIndex(input => !input.checkValidity()) == -1;
    let cb = form.querySelector("#remember-me").checked;
    return status && cb;
}


function init() {
    loadUserFromLocalStorage();
    addFormListener('#login-card');
}
