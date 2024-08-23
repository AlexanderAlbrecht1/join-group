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

let splittedName = [];

function loadContacts() {
    document.getElementById('showContacts').innerHTML = '';
    document.getElementById('contactDetail').innerHTML = '';
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    let groupedContacts = contacts.reduce((groups, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
        
        
        return groups;
    }, {});

    for (let [letter, contacts] of Object.entries(groupedContacts)) {
        document.getElementById('showContacts').innerHTML += `\n${letter}`;
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i];
            let name = contact.name;
            let lastname = contact.lastname;
            let mail = contact.email;
            let phone = contact.phone;
            let initial1 = Array.from(name)[0];
            let initial2 = Array.from(lastname)[0];
    
            document.getElementById('showContacts').innerHTML += `
            <div onclick="openContact(${i},'${initial1}','${initial2}','${name}','${lastname}','${mail}','${phone}')" class="contact" id="contact${i}">
                <div class="icon${i}">
                    <span>${initial1}${initial2}</span>
                </div>
                <div class="nameAndMail" id=""nameAndMail{i}"">
                    <span>${name} ${lastname}</span>
                    <span>${mail}</span>
                </div>
            </div>
            `;
        };
    }
}

function addToContact() {
    let newName = document.getElementById('name');
    let newEmail = document.getElementById('email');
    let newPhone = document.getElementById('phone');
    splitName(newName.value);
    let newFirstname = splittedName[0];
    let newLastname = splittedName[1];
    let newContact = {
        name: newFirstname,
        lastname: newLastname,
        email: newEmail.value,
        phone: newPhone.value
    };
    contacts.push(newContact);
    clearInput(newName, newEmail, newPhone);
    /*saveData('Contacts',contacts); */ // push to Firebase
    loadContacts();
}

function splitName(name) {
    let fullname = name;
    splittedName = fullname.split(" ")
}

function clearInput(newName, newEmail, newPhone) {
    newName.value = "";
    newEmail.value = "";
    newPhone.value = "";
}

function openContact(i,initial1,initial2,name,lastname,mail,phone) {
    console.log()
    document.getElementById('contactDetail').innerHTML = '';
    document.getElementById('contactDetail').innerHTML += `
    <div class="name">
        <span>${initial1}${initial2}</span>
        <div class="fullName">
          <span>${name} ${lastname}</span>
          <div class="buttons">
            <button>Edit</button>
            <button onclick="deleteContact('${mail}')">Delete</button>
          </div>
        </div>
      </div>
      <h3>Contact Information</h3>
      <h3><strong>Email</strong></h3>
      <span>${mail}</span>
      <h3><strong>Phone</strong></h3>
      <span>${phone}</span>

    </div>
    `;
}

function deleteContact(i) {
    contacts.splice(findContact(`${i}`),1);
    loadContacts();
}

function findContact(name) {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].email  === name) {
        return [i]
      }
    }
    return null
  }




