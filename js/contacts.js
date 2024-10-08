/**
 * 
 * checks if the a user is logged in, geneartes the user mongram, laods the contact book
 * 
 */
async function initContacts() {
   isLogged();
   logedUserMonogram();
   await displayContacts();
}

/**
 * 
 * load contacts from Firebase an renders the contact book
 * 
 */
async function displayContacts() {
   try {
      // contacts = filterValidContacts(await tryLoadCatchErr());
      contacts = await loadContacts();
      contacts = filterValidContacts(contacts);
      document.getElementById('showContacts').innerHTML = '';
      document.getElementById('contactDetail').innerHTML = '';
      contacts = sortContactsByName(contacts);
      let groupedContacts = groupContactsByFirstLetter(contacts);
      renderContacts(groupedContacts);
   } catch (error) {
      console.error("Fehler beim Laden der Kontakte:", error);
   }
}

/**
 * 
 * load, filter and display contacts
 * 
 * @param {object} groupedContacts 
 */
function renderContacts(groupedContacts) {
   for (let [letter, contacts] of Object.entries(groupedContacts)) {
      document.getElementById('showContacts').innerHTML += generateGroupLetterHTML(letter);
      for (let i = 0; i < contacts.length; i++) {
         let contact = contacts[i];
         let initial1 = Array.from(contacts[i].name)[0].toUpperCase();
         let initial2 = Array.from(contacts[i].lastname)[0].toUpperCase();
         let contactArray = createContactArray(contact, i);
         document.getElementById('showContacts').innerHTML += generateDisplayContactsHTML(contactArray, initial1, initial2);
      }
   }
}

/**
 * 
 * groups the sorted contacts according to the first letter of the first name
 * 
 * @param {*} contacts 
 * @returns 
 */
function groupContactsByFirstLetter(contacts) {
   return contacts.reduce((groups, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
         groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
      return groups;
   }, {});
}

/**
 * 
 * sorts the contacts alphabetically
 * 
 * @param {object} contacts 
 * @returns sorted object
 */
function sortContactsByName(contacts) {
   return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 
 * filters the contacts with the specified characteristics
 * 
 * @param {object} contacts 
 * @returns filtered object
 */
function filterValidContacts(contacts) {
   return contacts.filter(
      (contact) =>
         contact &&
         contact.id &&
         contact.name &&
         contact.lastname &&
         contact.email
      // contact.phone
   );
}

/**
 * 
 * add new contact to contactbook
 */
async function addNewContact() {
   await loadContacts();
   let id = await getIncrementedId("contact");
   let newContact = getNewContactData(id);
   contacts.push(newContact);
   await saveData("Contacts", contacts);
   clearInput();
   closeContactCreation();
   await displayContacts();
   document.getElementById(`contact${id}`).click();
   closeMobileDialogBackground();
   await msgfly();
}



/**
 * 
 * creates a detailed contact view of the contact, clicked in the contactbook
 * 
 * @param {number} id - 
 */
function showSingleContact(id) {
   let width = window.innerWidth;
   changeBgColor(id);
   let index = getCurrentContact(id);
   let singleContactArray = createSingleContactArray(index);
   if (width > 841) {
      document.getElementById('contactDetail').innerHTML = '';
      document.getElementById('contactDetail').innerHTML = createSingleContactHTML(singleContactArray, id);
      // console.log(id);
   } else {
      openMobileContactDetail(singleContactArray, id);
   }
}

/**
 * 
 * generates an array with detailed contact infos and hand over to generate HTML code
 * 
 * @param {number} index 
 * @returns an array with detailed contact infos
 */
function createSingleContactArray(index) {
   let replacedPhone = contacts[index].phone.replace(/^0+/, '+49');
   let singleContactArray = {
      name: contacts[index].name,
      lastname: contacts[index].lastname,
      mail: contacts[index].email,
      phone: formatPhoneNumber(replacedPhone),
      initial1: Array.from(contacts[index].name)[0].toUpperCase(),
      initial2: Array.from(contacts[index].lastname)[0].toUpperCase(),
      backgroundColor: contacts[index].color,
   }
   return singleContactArray;
}

/**
 * 
 * deletes choosen user from contactbook and tasks
 * 
 * @param {Number} id 
 */

async function deleteContact(id) {
   let currentSession = sessionLoad(PROJECT);
   let index = getCurrentContact(id);
   tasks = await loadData("taskstorage");
   if (id == currentSession.id) {
      createWarningPopUp(id, index);
   } else {
      deleteSafeReload(index, id, tasks);
   }
}

/**
 * det´lete contact, safe to firebase, relode contactbook
 * 
 */
async function deleteSafeReload(index, id, tasks) {
   contacts.splice(index, 1);
   await deleteContactFromTask(tasks, id);
   await saveContacts();
   await saveData("taskstorage", tasks);
   displayContacts();
   document.getElementById('mobileDialogBackground').style.display = 'none';
}

/**
 * 
 * creates and shows an html wanring pop up to confirm delete sessionuser
 * 
 * @param {number} id 
 * @param {number} index 
 */
function createWarningPopUp(id, index) {
   let array = generateArray(id, index);
   document.getElementById('mobileDialogBackground').style.display = 'flex';
   let ContactContainer = document.getElementById('mobileWorkContactContainer');
   ContactContainer.innerHTML = '';
   ContactContainer.innerHTML = warningHTML(array);
   ContactContainer.style.cssText = 'animation: slideIn .3s ease-out; animation-fill-mode: forwards;';
   document.getElementById('contactBook').style.overflowY = "hidden";
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
   if (na.length == 1) {
      return na[0][0];
   } else {
      return na[0][0] + na[1][0];
   }
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
// async function initContactList() {
//    isLogged();
//    let contacts = await loadSortedContactList();
//    renderContactList(contacts);
// }

/**
 * 
 * saves the edited contact
 * 
 * @param {number} id - it's a unique number, generated by add a new contact
 */
async function saveEditedContact(id) {
   let index = getCurrentContact(id);
   let newContact = createNewContactObject(id);
   contacts.splice(index, 1);
   await saveContacts();
   contacts.push(newContact);
   await saveContacts();
   clearInput();
   closeContactCreation();
   await displayContacts();
   document.getElementById(`contact${id}`).click();
   closeMobileDialogBackground();
}