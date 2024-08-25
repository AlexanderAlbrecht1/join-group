
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
        { id: 1, name: "Zoe", lastname: "Zimmerman", email: "zoe.zimmerman@example.com", phone: "+49 143 679 865 34" },
        { id: 2, name: "Anna", lastname: "Anderson", email: "anna.anderson@example.com", phone: "+49 143 679 865 34" },
        { id: 3, name: "Zora", lastname: "Baker", email: "ben.baker@example.com", phone: "+49 143 679 865 34" },
        { id: 4, name: "Clara", lastname: "Carter", email: "clara.carter@example.com", phone: "+49 143 679 865 34" },
        { id: 5, name: "Carl", lastname: "Dawson", email: "david.dawson@example.com", phone: "+49 143 679 865 34" },
        { id: 6, name: "Alwin", lastname: "Evans", email: "emma.evans@example.com", phone: "+49 143 679 865 34" },
        { id: 7, name: "Felix", lastname: "Foster", email: "felix.foster@example.com", phone: "+49 143 679 865 34" },
        { id: 8, name: "Greta", lastname: "Gibson", email: "greta.gibson@example.com", phone: "+49 143 679 865 34" },
        { id: 9, name: "Karlotta", lastname: "Hansen", email: "hans.hansen@example.com", phone: "+49 143 679 865 34" },
        { id: 10, name: "Alex", lastname: "Irving", email: "iris.irving@example.com", phone: "+49 143 679 865 34" },
        { id: 11, name: "Julia", lastname: "Jones", email: "julia.jones@example.com", phone: "+49 143 679 865 34" },
        { id: 12, name: "Karl", lastname: "King", email: "karl.king@example.com", phone: "+49 143 679 865 34" },
        { id: 13, name: "Lena", lastname: "Lewis", email: "lena.lewis@example.com", phone: "+49 143 679 865 34" },
        { id: 14, name: "Max", lastname: "Miller", email: "max.miller@example.com", phone: "+49 143 679 865 34" },
        { id: 15, name: "Nina", lastname: "Nelson", email: "nina.nelson@example.com", phone: "+49 143 679 865 34" },
        { id: 16, name: "Oliver", lastname: "Owen", email: "oliver.owen@example.com", phone: "+49 143 679 865 34" },
        { id: 17, name: "Paula", lastname: "Parker", email: "paula.parker@example.com", phone: "+49 143 679 865 34" },
        { id: 18, name: "Yara", lastname: "Young", email: "yara.young@example.com", phone: "+49 143 679 865 34" },
        { id: 19, name: "Jennifer", lastname: "Quincy", email: "quinn.quincy@example.com", phone: "+49 143 679 865 34" },
        { id: 20, name: "Rita", lastname: "Roberts", email: "rita.roberts@example.com", phone: "+49 143 679 865 34" },
        { id: 21, name: "Sam", lastname: "Bath", email: "sam.smith@example.com", phone: "+49 143 679 865 34" },
        { id: 22, name: "Ulrich", lastname: "Thompson", email: "tina.thompson@example.com", phone: "+49 143 679 865 34" },
        { id: 23, name: "Uwe", lastname: "Ulrich", email: "uwe.ulrich@example.com", phone: "+49 143 679 865 34" },
        { id: 24, name: "Uta", lastname: "Vaughn", email: "vera.vaughn@example.com", phone: "+49 143 679 865 34" },
        { id: 25, name: "Mathilda", lastname: "Wilson", email: "walter.wilson@example.com", phone: "+49 143 679 865 34" },
        { id: 26, name: "Claus", lastname: "Xander", email: "xenia.xander@example.com", phone: "+49 143 679 865 34" },
    ];
    
    saveData("Contacts",contacts); //Create Userlist
}

function saveTasks() {
    let tasks = [
    ];
    
    saveData("Tasks",tasks); //Create Userlist
}