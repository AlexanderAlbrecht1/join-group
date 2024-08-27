let contacts = [];
let splittedName = [];
let currentContact = [];

async function displayContacts() {
   contacts = await loadContacts();
   contacts = contacts.filter(
      (contact) =>
         contact &&
         contact.id &&
         contact.name &&
         contact.lastname &&
         contact.email &&
         contact.phone
   );
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
         let ID = contact.id;
         let name = contact.name;
         let lastname = contact.lastname;
         let mail = contact.email;
         let phone = contact.phone;
         let initial1 = Array.from(name)[0].toUpperCase();
         let initial2 = Array.from(lastname)[0].toUpperCase();

         document.getElementById('showContacts').innerHTML += `
            <div onclick="getId(${ID}), getCurrentContact(${i}), openContact(${i},'${initial1}','${initial2}','${name}','${lastname}','${mail}','${phone}')" class="contact" id="contact${i} style="background-color: ${contact.color};">
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
}

function getId(ID) {
   console.log(ID);
}

function getCurrentContact(i) {
   let contact = contacts[i];
   currentContact = [];
   currentContact = {
      id: contact.id,
      name: contact.name,
      lastname: contact.lastname,
      email: contact.email,
      phone: contact.phone,
   };
}

async function loadContacts(table = 'Contacts') {
   let loadedContacts = await loadData(table);

   // Überprüfen, ob die Antwort null oder undefined ist
   if (!loadedContacts) {
      return []; // Gibt ein leeres Array zurück, wenn keine Kontakte vorhanden sind
   }

   // Wenn die Daten als Array oder Objekt vorliegen, konvertiere sie in ein Array
   if (Array.isArray(loadedContacts)) {
      return loadedContacts.filter((contact) => contact !== null); // Null-Werte entfernen
   } else if (typeof loadedContacts === 'object' && loadedContacts !== null) {
      return Object.values(loadedContacts).filter(
         (contact) => contact !== null
      );
   }

   return []; // Falls nichts geladen wurde, leeres Array zurückgeben
}

async function saveContacts(table = 'Contacts') {
   return await saveData(table, contacts); // push to Firebase}
}

function generateDarkColor() {
   const r = Math.floor(Math.random() * 129); // R=0-128
   const g = Math.floor(Math.random() * 129); // G=0-128
   const b = Math.floor(Math.random() * 129); // B=0-128
   return `rgb(${r}, ${g}, ${b})`;
}

/*
contcat = []

contact[5]=alsfjslkjf
contcat[1]=Was anderes

for (i=0;i<blur.len; i++) ;
for (contact of contacts) {

}

saveContacts("Contacts/" + id)
contacts=loadContacts("Contacts/" + id)
*/

/**
 * Neuen Kontakt erstellen
 */
async function addNewContact() {
   contacts = await loadContacts();
   console.log('Loaded contacts:', contacts);
   contacts.forEach((contact, index) => {
      console.log(`Contact ${index}:`, contact);
   });
   let newName = document.getElementById('name');
   let newEmail = document.getElementById('email');
   let newPhone = document.getElementById('phone');
   splitName(newName.value);
   let newFirstname = splittedName[0];
   let newLastname = splittedName[1];
   let color = generateDarkColor();
   let newID = getNewId(contacts);
   console.log('Generated ID:', newID);
   let newContact = {
      id: newID,
      name: newFirstname,
      lastname: newLastname,
      email: newEmail.value,
      phone: newPhone.value,
      color: color,
   };
   contacts.push(newContact);
   saveContacts();

   clearInput(newName, newEmail, newPhone);
   closeContactCreation();
   displayContacts();
}

function getNewId(contacts) {
   if (contacts.length === 0) {
      return 1; // Startet bei 1, wenn keine Kontakte vorhanden sind
   }

   let maxId = contacts.reduce((max, contact) => {
      // Prüfe, ob die ID gültig ist und größer als der aktuelle maxId
      if (contact && typeof contact.id === 'number' && contact.id > max) {
         return contact.id;
      }
      return max;
   }, 0);

   return maxId + 1; // Erhöhe die höchste ID um 1
}

function splitName(name) {
   let fullname = name;
   splittedName = fullname.split(' ');
}

function clearInput(newName, newEmail, newPhone) {
   newName.value = '';
   newEmail.value = '';
   newPhone.value = '';
}

// Das werden die anmeckern mit sovielen Parametern
// Meine Idee die Variabelen all in ein JSON zu packen (Jörg)
function openContact(i, initial1, initial2, name, lastname, mail, phone) {
   console.log();
   document.getElementById('contactDetail').innerHTML = '';
   document.getElementById('contactDetail').innerHTML = `
    <div class="name">
        <span>${initial1}${initial2}</span>
        <div class="fullName">
          <span>${name} ${lastname}</span>
          <div class="buttons">
            <button onclick="openEditContactDialog('${mail}')">Edit</button>
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

async function deleteContact(i) {
   // await loadContacts();
   contacts.splice(findContact(`${i}`), 1);
   saveContacts();
   displayContacts();
   closeContactCreation();
}

//return contacts.findIndex(e => e.email === name); sollte auch gehen :), dann ist der NOT Found wert -1  (Jörg)
function findContact(name) {
   for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].email === name) {
         return [i];
      }
   }
   return null;
}

/**
 *
 * creates a contact form
 */
function openCreateContactDialog() {
   let dialogBackground = document.getElementById('dialogBackground');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.innerHTML = '';
   dialogBackground.innerHTML = `
            
    <div class="addContact" onclick="dontClose(event)">
        <form onsubmit="addNewContact();return false;">
            <input required id="name" type="text" placeholder="name" />
            <input required id="email" type="email" placeholder="e-mail" />
            <input id="phone" type="number" placeholder="phone number" />
            <button type="submit">Add new contact "icon"</button>
        </form>
    </div>

    `;
}

function closeContactCreation() {
   document.getElementById('dialogBackground').classList.add('displayNone');
   document.getElementById('body').classList.remove('overflowHidden');
}

function dontClose(event) {
   event.stopPropagation();
}

/**
 *
 * returns the monogram of a Name
 *
 * @param {string} name first name and last name split by " "
 * @returns the first characters of the 2 first Names in uppercase
 */
function getMonogram(name) {
   let na = name.toUpperCase().split(' ', 2);
   return na[0][0] + na[1][0];
}

/**
 *
 * Compare 2 Contacts by last name and name
 *
 * @param {string} a - first name to compare
 * @param {string} b - second name to compare
 * @returns - true if Contact 1 is earlier in alphabet than Contact 2
 */
function compareContactNames(a, b) {
   if (a == null) return 1;
   if (b == null) return -1;
   const c = a.name.localeCompare(b.name);
   if (c === 0) {
      return a.lastname.localeCompare(b.lastname);
   }
   return c;
}

/**
 *
 * Sorts the contact list by last name and name
 *
 * @param {object} contacts - object list of contacts
 * @returns - sorted object
 */
function sortContacts(contacts) {
   return contacts.sort((a, b) => compareContactNames(a, b));
}

/**
 *
 * put each line a contact for the add task
 *
 * @param {object} contact - put one contact to the dropdown
 * @returns - a line of contact in html
 */
function getHTMLContactSelection(contact) {
   let name = contact.name + ' ' + contact.lastname;
   return `
    <label>${getMonogram(
       name
    )} ${name}<input type="checkbox" name="assign" value="${
      contact.id
   }" /></label>    
    `;
}

/**
 *
 * load and Sort Contactlist
 *
 * @returns - contact list
 */
async function loadSortedContactList() {
   let c = await loadData('Contacts');
   if (c != null) {
      return sortContacts(c);
   }
   return null;
}

/**
 *
 * if contactlist has data load contactlist otherwise do nothing
 */
function renderContactList(contacts) {
   if (contacts == null) return;
   let html = '';
   for (let contact of contacts) {
      html += getHTMLContactSelection(contact);
   }
   document.getElementById('checkboxes').innerHTML = html;
}

/**
 * first initialisation of contact list
 */
async function initContactList() {
   // isLogged();
   let contacts = await loadSortedContactList();
   renderContactList(contacts);
}

function openEditContactDialog(mail) {
   let index = findContact(mail);
   let name = contacts[index].name;
   let lastname = contacts[index].lastname;
   let phone = contacts[index].phone;
   let dialogBackground = document.getElementById('dialogBackground');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.innerHTML = '';
   dialogBackground.innerHTML = /*html*/ `
        
   <div class="addContact" onclick="dontClose(event)">
   
           <input required id="name" type="text" placeholder="name" />
           <input required id="email" type="email" placeholder="e-mail" />
           <input id="phone" type="text" placeholder="phone number" />
           <button onclick="deleteContact('${mail}')">delete</button>
           <button>Save"icon"</button>
       
   </div>
   `; // <from> bis fertigstellung der eigntlichen funktion entfernt, wird später hinzugefügt für edit funktion

   document.getElementById('name').value = name + ' ' + lastname;
   document.getElementById('email').value = mail;
   document.getElementById('phone').value = phone;

   console.log(findContact(mail));
}
