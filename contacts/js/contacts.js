let contacts = [
    { id:1, name: "Zoe", lastname: "Zimmerman", email: "zoe.zimmerman@example.com", phone: "+49 143 679 865 34" },
    { id:2, name: "Anna", lastname: "Anderson", email: "anna.anderson@example.com", phone: "+49 143 679 865 34"},
    { id:3, name: "Ben", lastname: "Baker", email: "ben.baker@example.com", phone: "+49 143 679 865 34" },
    { id:4, name: "Clara", lastname: "Carter", email: "clara.carter@example.com", phone: "+49 143 679 865 34" },
    { id:5, name: "David", lastname: "Dawson", email: "david.dawson@example.com", phone: "+49 143 679 865 34" },
    { id:6, name: "Emma", lastname: "Evans", email: "emma.evans@example.com", phone: "+49 143 679 865 34" },
    { id:7, name: "Felix", lastname: "Foster", email: "felix.foster@example.com", phone: "+49 143 679 865 34" },
    { id:8, name: "Greta", lastname: "Gibson", email: "greta.gibson@example.com", phone: "+49 143 679 865 34" },
    { id:9, name: "Hans", lastname: "Hansen", email: "hans.hansen@example.com", phone: "+49 143 679 865 34" },
    { id:10, name: "Iris", lastname: "Irving", email: "iris.irving@example.com", phone: "+49 143 679 865 34" },
    { id:11, name: "Julia", lastname: "Jones", email: "julia.jones@example.com", phone: "+49 143 679 865 34" },
    { id:12, name: "Karl", lastname: "King", email: "karl.king@example.com", phone: "+49 143 679 865 34" },
    { id:13, name: "Lena", lastname: "Lewis", email: "lena.lewis@example.com", phone: "+49 143 679 865 34" },
    { id:14, name: "Max", lastname: "Miller", email: "max.miller@example.com", phone: "+49 143 679 865 34" },
    { id:15, name: "Nina", lastname: "Nelson", email: "nina.nelson@example.com", phone: "+49 143 679 865 34" },
    { id:16, name: "Oliver", lastname: "Owen", email: "oliver.owen@example.com", phone: "+49 143 679 865 34" },
    { id:17, name: "Paula", lastname: "Parker", email: "paula.parker@example.com", phone: "+49 143 679 865 34" },
    { id:18, name: "Yara", lastname: "Young", email: "yara.young@example.com", phone: "+49 143 679 865 34" },
    { id:19, name: "Quinn", lastname: "Quincy", email: "quinn.quincy@example.com", phone: "+49 143 679 865 34" },
    { id:20, name: "Rita", lastname: "Roberts", email: "rita.roberts@example.com", phone: "+49 143 679 865 34" },
    { id:21, name: "Sam", lastname: "Smith", email: "sam.smith@example.com", phone: "+49 143 679 865 34" },
    { id:22, name: "Tina", lastname: "Thompson", email: "tina.thompson@example.com", phone: "+49 143 679 865 34" },
    { id:23, name: "Uwe", lastname: "Ulrich", email: "uwe.ulrich@example.com", phone: "+49 143 679 865 34" },
    { id:24, name: "Vera", lastname: "Vaughn", email: "vera.vaughn@example.com", phone: "+49 143 679 865 34" },
    { id:25, name: "Walter", lastname: "Wilson", email: "walter.wilson@example.com", phone: "+49 143 679 865 34" },
    { id:26, name: "Xenia", lastname: "Xander", email: "xenia.xander@example.com", phone: "+49 143 679 865 34" },
  ];

  let splittedName = [];

  function loadContacts() {
    document.getElementById('showContacts').innerHTML = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let name = contact.name;
        let lastname = contact.lastname;
        let mail = contact.email
        let initial1 = Array.from(name)[0];
        let initial2 = Array.from(lastname)[0];
        
        document.getElementById('showContacts').innerHTML += `
        <div class="contact" id="contact${i}">
            <div class="icon${i}">
                <span>${initial1}${initial2}</span>
            </div>
            <div class="nameAndMail" id=""nameAndMail{i}"">
                <span>${name} ${lastname}</span>
                <span>${mail}</span>
            </div>
        </div>
        `;
    }
  }

  function sortContacts(){
    contacts.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
  }

 function addToContact() {
    let newName = document.getElementById('name');
    let newEmail = document.getElementById('email').value;
    let newPhone = document.getElementById('phone').value;
    splitName(newName.value);
    let newFirstname = splittedName[0];
    let newLastname = splittedName[1];
    let newContact = {
        name: newFirstname,
        lastname: newLastname,
        email: newEmail,
        phone: newPhone
    };
    contacts.push(newContact);
    document.getElementById('name').value = "";
    newEmail = "";
    saveData('Contacts',contacts);
    // load contacts nur zur testzwecken um push zu überprüfen
    loadContacts();
 }

 function splitName(name) {
    let fullname = name;
    splittedName = fullname.split(" ")
    
    
 }



