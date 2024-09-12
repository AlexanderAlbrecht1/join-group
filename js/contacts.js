let contacts = [];

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
      document.getElementById('showContacts').innerHTML += generateGroupLetterHTML(letter) ;
      for (let i = 0; i < contacts.length; i++) {
         let contact = contacts[i];
         let contactArray = createContactArray(contact,i);
         document.getElementById('showContacts').innerHTML += generateDisplayContactsHTML(contactArray);
      }
   }
}

function createContactArray(contact,i) {
   let contactArray = {
      ID: contact.id,
      name: contact.name,
      lastname: contact.lastname,
      mail: contact.email,
      initial1: Array.from(contacts[i].name)[0].toUpperCase(),
      initial2: Array.from(contacts[i].lastname)[0].toUpperCase(),
      backgroundColor: contact.color,
   }
   return contactArray;
}


function getCurrentContact(id) {
   let index = findContact(id);
   return index;
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

/**
 * Neuen Kontakt erstellen
 */
async function addNewContact() {
   let id = await getIncrementedId("contact");

   await loadContacts();
   let newName = document.getElementById("name");
   let newEmail = document.getElementById("email");
   let newPhone = document.getElementById("phone");
   let fullname = newName.value;
   let splittedName = fullname.split(' ');
   let newFirstname = splittedName[0];
   let newLastname = splittedName[1];
   let color = generateDarkColor();
   // let newID = getNewId(contacts);
   console.log('Generated ID:', id);
   let newContact = {
      id: id,
      name: newFirstname,
      lastname: newLastname,
      email: newEmail.value,
      phone: newPhone.value,
      color: color,
   };
   contacts.push(newContact);
   await saveContacts();
   // saveContacts(id,newContact);

   clearInput(newName, newEmail, newPhone);
   closeContactCreation();
   await displayContacts();
   document.getElementById(`contact${id}`).click();
   await msgfly();
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

function clearInput(newName, newEmail, newPhone) {
   newName.value = '';
   newEmail.value = '';
   newPhone.value = '';
}

function changeBgColor(id) {
   let elements = document.querySelectorAll(".contact");
   elements.forEach(function (element) {
      element.classList.remove('contactActive');
   })
   document.getElementById(`contact${id}`).classList.add('contactActive');
}


function showSingleContact(id) {
   changeBgColor(id);
   let index = getCurrentContact(id);
   let singleContactArray = createSingleContactArray(index)
   document.getElementById('contactDetail').innerHTML = '';
   document.getElementById('contactDetail').innerHTML = createSingleContactHTML(singleContactArray, index) ;
   console.log(id);
}

function createSingleContactArray(index) {
   let singleContactArray = {
      name : contacts[index].name,
      lastname : contacts[index].lastname,
      mail : contacts[index].email,
      phone : contacts[index].phone,
      initial1 : Array.from(contacts[index].name)[0].toUpperCase(),
      initial2 : Array.from(contacts[index].lastname)[0].toUpperCase(),
      backgroundColor : contacts[index].color,
   }  
   return singleContactArray;
}

async function deleteContact(id) {
   let index = getCurrentContact(id);
   // await loadContacts();
   contacts.splice(index, 1);
   await saveContacts();
   displayContacts();
   closeContactCreation();
}

//return contacts.findIndex(e => e.email === name); sollte auch gehen :), dann ist der NOT Found wert -1  (Jörg)

function findContact(id) {
   for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
         return i;
      }
   }
   return null;
}

/**
 *
 * creates a contact form to add a new contact
 */
function openCreateContactDialog() {
   let dialogBackground = document.getElementById('dialogBackground');
   let addContactContainer = document.getElementById('addContactContainer');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.classList.add('displayFlex');
   addContactContainer.innerHTML = '';
   addContactContainer.innerHTML = addContactHTML();
   addContactContainer.style.cssText = 'animation: slideIn .3s ease-out ; animation-fill-mode: forwards;';
}

/**
 * 
 * abort add new contact and close dialog window
 */
function closeContactCreation() {
   document.getElementById('dialogBackground').classList.add('displayNone');
   document.getElementById('dialogBackground').classList.remove('displayFlex');
   document.getElementById('body').classList.remove('overflowHidden');
}

/**
 * 
 * prevent close dialog by click buttons or input fields
 * 
 * @param {click} event 
 */
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
         <div class="contact-checkbox">
         <div>
            <div class="monogrammicon" style="background-color: ${contact.color}">
            ${getMonogram(name)}
            </div>
             ${name}</div>
    <label class="custom-checkbox"><input type="checkbox" name="assign" value="${contact.id
      }" /><span class="checkbox-image"></span></label></div>
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
function openEditContactDialog(id) {
   let index = getCurrentContact(id);
   let name = contacts[index].name;
   let lastname = contacts[index].lastname;
   let mail = contacts[index].email;
   let phone = contacts[index].phone;

   let initial1 = Array.from(name)[0].toUpperCase();
   let initial2 = Array.from(lastname)[0].toUpperCase();
   let backgroundColor = contacts[index].color;

   let dialogBackground = document.getElementById('dialogBackground');
   let editContactContainer = document.getElementById('addContactContainer');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.classList.add('displayFlex');

   editContactContainer.innerHTML = '';
   editContactContainer.innerHTML = /*html*/ `
        
   <div class="editContactLogoContainer" onclick="dontClose(event)">

      <div>
         <img class="contactLogo" src="/assets/img/desktop/join-logo_navbar.svg" alt="">
         <div class="flexColumn">
            <h1>Edit contact</h1>
            <div class="vector5EditContact"></div>
         </div>
         <div class="contactLogo"></div>
      </div>
   </div>

<div class="addContactInputContainer">
      <div class="detailMonogramContainer">
            <span class="detailMonogramSpan" style="background-color: ${backgroundColor}">${initial1}${initial2}</span>
      </div>

    <div class="addContactInputContainer2">
        <div class="close" onclick="closeContactCreation()">
            <img src="/assets/img/desktop/close.svg" alt="">
        </div>

        <div id="input-field-container" class="input-container">
            <input id="name" type="text" required placeholder="Name">
            <span class="icon"><img src="./assets/img/desktop/person.svg"></span>
        </div>

        <div id="input-field-container" class="input-container">
            <input id="email" type="email" required placeholder="Email">
            <span class="icon"><img src="./assets/img/desktop/letter.svg"></span>
        </div>

        <div id="input-field-container" class="input-container">
            <input id="phone" type="number" required placeholder="Phone">
            <span class="icon"><img src="./assets/img/desktop/phone.svg"></span>
        </div>

        <div class="editContactbuttons ">
            <div class="deleteButton" onclick="deleteContact(${id})">
                <span>Delete </span>
            </div>

            <button class="safeEditContactButton" onclick="saveEditedContact(${id})">
                <span>Safe</span>
                <div class="checkSVGContainer">
                </div>
            </button>
        </div>
    </div>
</div>
</div>
   `; // <from> bis fertigstellung der eigntlichen funktion entfernt, wird später hinzugefügt für edit funktion

   document.getElementById('name').value = name + ' ' + lastname;
   document.getElementById('email').value = mail;
   document.getElementById('phone').value = phone;

   editContactContainer.style.cssText = 'animation: slideIn .3s ease-out; animation-fill-mode: forwards;';

   console.log(findContact(mail));
}

async function saveEditedContact(id) {
   let index = getCurrentContact(id);
   let color = contacts[index].color;
   contacts.splice(index, 1);
   await saveContacts();
   let newName = document.getElementById("name");
   let newEmail = document.getElementById("email");
   let newPhone = document.getElementById("phone");
   let fullname = newName.value;
   let splittedName = fullname.split(' ');
   let newFirstname = splittedName[0];
   let newLastname = splittedName[1];
   let newContact = {
      id: id,
      name: newFirstname,
      lastname: newLastname,
      email: newEmail.value,
      phone: newPhone.value,
      color: color,
   };
   contacts.push(newContact);
   await saveContacts();
   clearInput(newName, newEmail, newPhone);
   closeContactCreation();
   displayContacts();
}
