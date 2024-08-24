async function register() {
    let password=document.getElementById("password");
    let user=document.getElementById("user");
    let email=document.getElementById("email");    
    let userList=await getUserList();
    if (userList.findIndex(element =>  element.user == user.value)  == -1) {
        userList.add({
            user:user.value,
            password: password.value,
            email: email.value
        })
        await saveData("user",userList);
        openDashboard(); // autologin move to the page we need to go and exit here
    } else {
        msg=`User already exist. Please choose another name. <br>{user.value}, <a href="../login/login.html">login at your existing account ?`;
        document.getElementById("msg-box").innerHTML=msg;
    }
}