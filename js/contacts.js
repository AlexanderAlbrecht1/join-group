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
      document.getElementById('showContacts').innerHTML += `
      <div class="groupLetter">
         <span>\n${letter}</span>
      </div>
      <div class="breakingLineContainer">
         <div class ="breakingLine">   
         </div>
      </div>
      `;
      for (let i = 0; i < contacts.length; i++) {
         let contact = contacts[i];
         let ID = contact.id;
         let name = contact.name;
         let lastname = contact.lastname;
         let mail = contact.email;
         let initial1 = Array.from(name)[0].toUpperCase();
         let initial2 = Array.from(lastname)[0].toUpperCase();
         let backgroundColor = contact.color;

         document.getElementById('showContacts').innerHTML += `
            <div onclick="showSingleContact(${ID})" class="contact">
                 <div class="monogrammicon" style="background-color: ${backgroundColor}">
                    <span>${initial1}${initial2}</span>
                </div>
                <div class="nameAndMail">
                    <span class="nameOverviev">${name} ${lastname}</span>
                    <span class="mailOverview">${mail}</span>
                </div>
            </div>
            `;
      }
   }
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
   saveContacts();
   // saveContacts(id,newContact);



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

function clearInput(newName, newEmail, newPhone) {
   newName.value = '';
   newEmail.value = '';
   newPhone.value = '';
}


function showSingleContact(id) {
   let index = getCurrentContact(id);
   let name = contacts[index].name;
   let lastname = contacts[index].lastname;
   let mail = contacts[index].email;
   let phone = contacts[index].phone;
   let initial1 = Array.from(name)[0].toUpperCase();
   let initial2 = Array.from(lastname)[0].toUpperCase();
   let backgroundColor = contacts[index].color;

   document.getElementById('contactDetail').innerHTML = '';
   document.getElementById('contactDetail').innerHTML = /*html*/ `
    <div class="name">
      <div class="detailMonogramContainer">
        <span class="detailMonogramSpan" style="background-color: ${backgroundColor}">${initial1}${initial2}</span>
      </div>
        <div class="fullNameAndButtons">
         	<div class="fullname">
               <span>${name} ${lastname}</span>
            </div>
          <div class="editButtons">
            <div onclick="openEditContactDialog(${id})" class="editButton">
               <div></div>
               <span>Edit</span>
            </div>
            <div onclick="deleteContact(${id})" class="trashButton">
               <div></div>
               <span>Delete</span>
            </div>
            
          </div>
        </div>
      </div>
      <div class="contactInformation">
         <span>Contact Information</span>
      </div>
      <div class="emailAndPhone">
         <span class="spanHeading">Email</span>
         <span>${mail}</span>
         <h3><strong>Phone</strong></h3>
         <span>${phone}</span>
      </div>

    </div>
    `;

   console.log(id);

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
 * creates a contact form
 */
function openCreateContactDialog() {
   let dialogBackground = document.getElementById('dialogBackground');
   let addContactContainer = document.getElementById('addContactContainer');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.classList.add('displayFlex');

   addContactContainer.innerHTML = '';
   addContactContainer.innerHTML = /*html*/ `
            
    
      <div class="addContactLogoContainer">
         <div>
            <img class="contactLogo" src="/assets/img/desktop/join-logo_navbar.svg" alt="">
            <h1>Add contact</h1>
            <span>Tasks are better with a team!</span>
            <div class="vector5"></div>
            <div class="contactLogo"></div>
         </div>
      </div>
      <div class="addContactInputContainer">
         <div class="emptyMonogram">
            <img src="./assets/img/desktop/empty_user.svg" alt="">
         </div>
         <div class="addContactInputContainer2">
            <div class="close" onclick="closeContactCreation()">
               <img src="/assets/img/desktop/close.svg" alt="">
            </div>

            <form class="form-input" onsubmit="addNewContact();return false;">

               <div id="input-field-container" class="input-container">
                  <input id="name" type="text" required placeholder="Name">
                  <span class="icon"  ><img src="./assets/img/desktop/person.svg"></span>
                  
               </div>

               <div id="input-field-container" class="input-container">
                  <input id="email" type="email" required placeholder="Email">
                  <span class="icon"  ><img src="./assets/img/desktop/letter.svg"></span>
                  
               </div>
            
               <div id="input-field-container" class="input-container">
                  <input id="phone" type="number" required placeholder="Phone">
                  <span class="icon"  ><img src="./assets/img/desktop/phone.svg"></span>
                  
               </div>

               <div class="buttons">
                  <div class="cancelButton" onclick="closeContactCreation()">
                     <span>Cancel </span>
                     <div class="cancelSVGContainer">
                     </div>    
                  </div>

                  <button class="createContactButton" type="submit">
                     <span>Create contact</span>
                     <div class="checkSVGContainer">
                     </div>
                  </button>
               </div>
            </form>
         </div>
      </div>


    `;
   addContactContainer.style.cssText = 'animation: slideIn .5s ease; animation-fill-mode: forwards;';
   //dialogBackground.style.cssText = 'animation: slideIn .5s ease; animation-fill-mode: forwards;';
}

function closeContactCreation() {
   addContactContainer.style.cssText = 'animation: slideOut .5s ease; animation-fill-mode: forwards;';
   setTimeout(() => {
      document.getElementById('dialogBackground').classList.add('displayNone');
      document.getElementById('dialogBackground').classList.remove('displayFlex');
      document.getElementById('body').classList.remove('overflowHidden');
   }, 500);

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

   editContactContainer.style.cssText = 'animation: slideIn .5s ease; animation-fill-mode: forwards;';

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
