let msg="";
/**
 * @login()
 * input form HTML input field
 * output err to HTML output field 
 */
function login() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");

    if (isLoginCorrect()) openPage("./dashbord/index.html");
}

function openPage(url) {
    window.location = url;
}

async function isLoginCorrect(user,password) {
    let userList=await getUserList();
    let found=userList.findIndex((element) => element.user == user);
    let msg="User and password is correct";

    if (found == -1) {
        msg="User not found";
        document.getElementById("user").focus();
        return false;
    }

    if (userList[found].password != password) {
        msg="You chose a wrong password";
        document.getElementById("password").focus();
        
        return false;
    }

    document.getElementById("login-msg").innerHTML=msg;
}


function rememberMe() {
    if (document.getElementById("remember-me").checked) {
        console.log("has checked");
    };
}

function register() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    // let email

}