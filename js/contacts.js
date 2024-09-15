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
      document.getElementById('showContacts').innerHTML += generateGroupLetterHTML(letter);
      for (let i = 0; i < contacts.length; i++) {
         let contact = contacts[i];
         let initial1 = Array.from(contacts[i].name)[0].toUpperCase();
         let initial2 = Array.from(contacts[i].lastname)[0].toUpperCase();
         let contactArray = createContactArray(contact, i);
         document.getElementById('showContacts').innerHTML += generateDisplayContactsHTML(contactArray,initial1,initial2);
      }
   }
}

function createContactArray(contact, i) {
   let contactArray = {
      ID: contact.id,
      name: contact.name,
      lastname: contact.lastname,
      mail: contact.email,
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

   clearInput();
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

function clearInput() {
   document.getElementById("name").value = '';
   document.getElementById("email").value = '';
   document.getElementById("phone").value = '';
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
   document.getElementById('contactDetail').innerHTML = createSingleContactHTML(singleContactArray, id);
   console.log(id);
}

function createSingleContactArray(index) {
   let singleContactArray = {
      name: contacts[index].name,
      lastname: contacts[index].lastname,
      mail: contacts[index].email,
      phone: contacts[index].phone,
      initial1: Array.from(contacts[index].name)[0].toUpperCase(),
      initial2: Array.from(contacts[index].lastname)[0].toUpperCase(),
      backgroundColor: contacts[index].color,
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

async function deleteContactFromTask(id) {
  let taskStorage = await loadData("taskstorage");
  console.log(taskStorage);
  let sadUser = findContactInTasks(taskStorage,id);
  console.log(sadUser);

}

function findContactInTasks(taskStorage,id) {
   let testArray = [];
   for (let i = 0; i < taskStorage.length; i++) {
      for (let x = 0; x < taskStorage[i].assignedTo.length; x++) {
         if (taskStorage[i].assignedTo[x] == Number(`${id}`)) {
            // return [i, x];  
            console.log(i,x);
            testArray.push( { storage: i, assigned: x});
         }
      }
   }
   return testArray;
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
   <div class="contact-checkbox" onclick="toggleCheckbox(this)">
       <div>
           <div class="monogrammicon" style="background-color: ${contact.color}">
               ${getMonogram(name)}
           </div>
           ${name}
       </div>
       <label class="custom-checkbox">
           <input type="checkbox" name="assign" value="${contact.id}" />
           <span class="checkbox-image"></span>
       </label>
   </div>
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
   let inventoryData = generateInventoryDataArray(index);
   let array = generateArray(id, index);
   showHiddenDialog();
   let editContactContainer = document.getElementById('addContactContainer');
   editContactContainer.innerHTML = '';
   editContactContainer.innerHTML = createEditContactDialogHTML(array); // <from> bis fertigstellung der eigntlichen funktion entfernt, wird später hinzugefügt für edit funktion
   preFilledInputs(inventoryData);
   editContactContainer.style.cssText = 'animation: slideIn .3s ease-out; animation-fill-mode: forwards;';
}

/**
 * 
 * hidden dialog container becomes visible
 */

function showHiddenDialog() {
   let dialogBackground = document.getElementById('dialogBackground');
   document.getElementById('body').classList.add('overflowHidden');
   dialogBackground.classList.remove('displayNone');
   dialogBackground.classList.add('displayFlex');
}

/**
 * 
 * writes the loaded data into the input fields
 * 
 * @param {array} inventoryData 
 */
function preFilledInputs(inventoryData) {
   document.getElementById('name').value = inventoryData.name + ' ' + inventoryData.lastname;
   document.getElementById('email').value = inventoryData.mail;
   document.getElementById('phone').value = inventoryData.phone;
}

/**
 * 
 * creates an array with the existing data
 * 
 * @param {number} index - position in 'contacts'-object
 * @returns - array for pre-filled input fields
 */

function generateInventoryDataArray(index) {
   let inventoryData = {
      name: contacts[index].name,
      lastname: contacts[index].lastname,
      mail: contacts[index].email,
      phone: contacts[index].phone,
   }
   return inventoryData;
}

/**
 * 
 * creates an array to pass the variables into the createHTML function
 * 
 * @param {number} id - unique ID for each contact
 * @param {number} index - position in 'contacts'-object
 * @returns - array for generate HTML
 */
function generateArray(id, index) {
   let array = {
      id: id,
      initial1: Array.from(contacts[index].name)[0].toUpperCase(),
      initial2: Array.from(contacts[index].lastname)[0].toUpperCase(),
      backgroundColor: contacts[index].color,
   }
   return array;
}
/**
 * 
 * saves the edited contact
 * 
 * @param {number} id - it's a unique number, generated by add a new contact
 */
async function saveEditedContact(id) {
   let index = getCurrentContact(id);
   // let color = contacts[index].color;

   let newContact = createNewContactArray(id);

   contacts.splice(index, 1);
   await saveContacts();

   contacts.push(newContact);
   await saveContacts();
   clearInput();
   closeContactCreation();
   // renderContactList(contacts);
   await displayContacts();
   document.getElementById(`contact${id}`).click();
}

function createNewContactArray(id) {
   let newName = document.getElementById("name");
   let newEmail = document.getElementById("email");
   let newPhone = document.getElementById("phone");
   let fullname = newName.value;
   let splittedName = fullname.split(' ');
   let newFirstname = splittedName[0];
   let newLastname = splittedName[1];
   let index = getCurrentContact(id);
   let color = contacts[index].color
   let newContact = {
      id: id,
      name: newFirstname,
      lastname: newLastname,
      email: newEmail.value,
      phone: newPhone.value,
      color: color,
   }
   return newContact;
}
