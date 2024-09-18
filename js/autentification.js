let msg = "";
let user ="" ;

/**
 * Logout user
 * reset inputfields
 * destry the session info
 */
function logout() {
   let password = document.getElementById("password");
   let email = document.getElementById("email");
   email.value = "";
   password.value = "";
   sessionDestroy(PROJECT);
}


/**
 * 
 * @public - from HTML
 * 
 * load next HTML, login success
 * 
 */
function openDashboard() {
   openPage("./dashboard.html");
}

function openSignup() {
   openPage("./registration.html");
}

function openLogin() {
   openPage("./index.html");
}


/**
 * load next HTML, geneerell alias
 * 
 * @public - called from any js
 *
 * @param {url} url - open a HTML and exit from here
 */
function openPage(url) {
   window.location = url;
}


/**
 * 
 * Check if given Login has success
 * 
 * @private - called fom login
 *
 * @param {string} email     - email from the user who tries to login
 * @param {string} password  - the password that belongs to the user
 * @param {bool} showmsg   - true if user should get information, false = no feedbak
 * @returns - true if user and password are OK otherwise false
 */
async function isLoginCorrect(email, password, showmsg = true) {
   let userList = await getUserList();
   let { err, msg, focus } = validateUser(userList, email, password);

   if (showmsg && err) handleErrors(msg, focus);

   if (!err) return userList.find(e => e.email==email);

   return !err;
}


/**
 * 
 * Checks if the current Password ist correct
 * 
 * @private - used from: isLoginCorrect
 * 
 * @param {object} userList - the whole Userlist of the db
 * @param {string} email    - the login mail to check
 * @param {string} password - the password that must be valid
 * @returns - true if user found and password ist valid otherwise false
 */
function isPasswordCorrect(userList, email, password) {
   let user = userList.find(user => user.email == email);
   return user && user.password === password;
}


/**
 * 
 * add some customised Messages to the board and sets the focus
 * 
 * @private - used from isLoginCorrect
 * 
 * @param {text} msg   - Message to display
 * @param {text} focus - id of the focused field 
 */
function handleErrors(msg, focus) {
   customErrorMsg("password", msg);
   customErrorMsg("email", msg);
   activateFormErrors('login-card'); // Line
   if (focus) document.getElementById(focus)?.focus(); 
}


/**
 * 
 * Gives Back the Errormessage as invalid Field
 * 
 * @private - called from isLoginCorrect
 * 
 * @param {object} userList - the whole Userlist of the db
 * @param {string} email    - the login mail to check
 * @param {string} password - the password that must be valid
 * @returns 
 * - err: true if user found and password ist valid otherwise false
 * - focus: returns the filed to focus if we have an error
 * - msg: Returns a msg Failed or OK
 */
function validateUser(userList, email, password) {
   let focus = null, msg = "Email and Password are correct", err = false;
   
   if (!userExists(userList, email)) { // wrong Mail
       msg = "Combination of Email and Password  is not valid";
       focus = "email";
       err = true;
   } else if (!isPasswordCorrect(userList, email, password)) { // wrong password
       msg = "Combination of Email and Password  is not valid";
       focus = "email"; 
       err = true;
   }
   
   return { err, msg, focus };
}


/**
 * 
 * Checks if mail is found in userlist
 * 
 * @private - called from isLoginCorrect
 * 
 * @param {object} userList - the whole Userlist of the db
 * @param {string} email    - the login mail to check
 * @returns -true if email found otherwise false
 */
function userExists(userList, email) {
   return userList?.findIndex(user => user.email == email) !== -1;
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
   let userRow = loadFromLocalStorage(PROJECT);
   if (userRow != null) {
      if (await isLoginCorrect(userRow.email, userRow.password, false)) {
         putLoginToValue(userRow.email, userRow.password);
         openDashboard(); // Exit from here
         return true;
      }
   }
   return false;
}


/**
 * run this after login
 *
 * prepare user / password and to save to local storage
 */
function saveUserToLocalStorage() {
   let password = document.getElementById("password");
   let email = document.getElementById("email");
   saveToLocalStorage(PROJECT, {
      email: email.value,
      password: password.value,
   });
}


/**
 * clear  user / password in storage
 */
function clearLocalStorage() {
   removeKeyInLocalStorage(PROJECT);
}


/**
 * 
 * changes the password field to text so we can see the password
 * also displays an eye or strikethrough eye
 * 
 * @param {event} event - the event = of the icon
 * @returns 
 */
function togglePasswordView(event) {
   let passwordContainer=event.target.parentElement;
   let passwordInput=event.target.previousElementSibling;
   if (document.activeElement !== passwordInput) {
      return;
   }
   let isVisible = passwordContainer.classList.toggle("visible");   
   passwordInput.type = isVisible ? "text" : "password";
   passwordInput.focus();

   event.preventDefault();
   event.stopPropagation();
}


/**
 * 
 * Activates Errors while in input field and red border
 * 
 * @private - called form handleErrors
 * @param {*} formid - the id of the form we want no to errors and border live 
 */
function activateFormErrors(formid) {
   let form=document.getElementById(formid);
   inputs = form.querySelectorAll('input');
   inputs.forEach(element => {
      element.parentElement.classList.add("invalid");
      // customMessage(element);
      // setErrorMsg(element); // mit dem prevent ?

   });
   disableFormEvents(formid);
}
