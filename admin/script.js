
function reset() {
    document.getElementById("msg").innerHTML=`        
        <li>Create a new User List (overwrite the old one) ... done</li>
        <li>Create a new Tasklist for the Guest User ... done</li>
        <li>Create a ContactList for the Guest User ...done</li>
    `
    saveUser();
    saveContacts();
    //saveTasks();
}

function saveUser() {
    let ul = [
        {user:"guest",password:"",email:"donotrespond@nodomain.tld"},
        {user:"Joerg",password:"abc",email:"mail@joergdeymann.de"}
    ]; // Create Guest User 1
    saveData("user",ul); //Create Userlist
}

function saveContacts() {
    let contacts = [
        { color : "rgb(255,122,0)" , id: 1, name: "Zoe", lastname: "Zimmerman", email: "zoe.zimmerman@gmail.com", phone: "+4916167986534" },
        { color : "rgb(255,94,179)" , id: 2, name: "Anna", lastname: "Anderson", email: "anna.anderson@example.com", phone: "+4914367986534" },
        { color : "rgb(110,82,255)" , id: 3, name: "Zora", lastname: "Baker", email: "zora.baker@example.com", phone: "+4915867986534" },
        { color : "rgb(147,39,255)" , id: 4, name: "Firat", lastname: "Carter", email: "firat.carter@web.de", phone: "+4955567986534" },
        { color : "rgb(0,190,232)" , id: 5, name: "Carl", lastname: "Dawson", email: "carl.dawson@example.com", phone: "+4956967986534" },
        { color : "rgb(31,215,193)" , id: 6, name: "Alwin", lastname: "Evans", email: "emma.evans@example.com", phone: "+4914767986534" },
        { color : "rgb(255,116,94)" , id: 7, name: "Joerg", lastname: "Foster", email: "joerg.foster@example.com", phone: "+4914967986534" },
        { color : "rgb(0,56,255)" , id: 8, name: "Greta", lastname: "Gibson", email: "greta.gibson@example.com", phone: "+49 357 679 865 34" },
        { color : "rgb(255,187,43)" , id: 9, name: "Karlotta", lastname: "Hansen", email: "hans.hansen@example.com", phone: "+494067986534" },
        { color : "rgb(255,70,70)" , id: 10, name: "Alex", lastname: "Irving", email: "alex.irving@example.com", phone: "+4914367988934" },
        { color : "rgb(255,199,1)" , id: 11, name: "Julia", lastname: "Jones", email: "julia.jones@example.com", phone: "+4914367986534" },
    ];
    
    saveData("Contacts",contacts); //Create Userlist
}

function saveTasks() {
    let tasks = [
    ];
    
    saveData("Tasks",tasks); //Create Userlist
}