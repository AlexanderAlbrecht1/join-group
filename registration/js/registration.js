/**
 * msgBox Send a messag to the Interface
 * 
 * @param {string} msg - Display message in the Password Box 
 */
function msgBox(msg) {
    document.getElementById("msg-box").innerHTML=msg;
}

/**
 * Register new User 
 * input: password, user, email
 */
async function register() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    let email=document.getElementById("email");    
    let userList=await getUserList();
    if (userList.findIndex(element =>  element.user == user.value)  == -1) {
        userList.add({user:user.value,password: password.value,email: email.value});
        await saveData("user",userList);
        openDashboard(); // autologin move to the page we need to go and exit here
    } else {
        msgBox(`User already exist. Please choose another name. <br>{user.value}, <a href="../login/login.html">login at your existing account ?`);
    }
}
/**
 * removeUser
 * Remove all information of a user
 * - in database, localstorage, session
 * 
 * @param {*} userList 
 * @param {*} index 
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
        msgBox("The user-password validation failed !");
    }
}

/**
 * Remove User from all permanent
 * given Information from Interface
 * redirect to Login at least
 */
async function unregister() {
    let user=document.getElementById("user");
    let userList=await getUserList();
    let index= userList.findIndex(element =>  element.user == user.value);
    if (index != -1) {
        if (passwordValidationOK(userList[index].password)) {
            removeTasksOf(user.value);    // Remove all Tasks of the user
            removeUser(userList,index);   // remove all Userinformation and cleanup
            openPage("../login/login.html");
        }
    } else {
        msgBox(`User doesn't exist`);
    }
}

