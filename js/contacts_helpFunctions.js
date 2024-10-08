let contacts = [];
let taskStorage = [];

function getInput() {
    let newName = document.getElementById("name");
    let newEmail = document.getElementById("email");
    let newPhone = document.getElementById("phone");
    return newName, newEmail, newPhone
}

/**
 * 
 * changes the way the phone number ist displayed on detail view
 * 
 * @param {string} replacedPhone 
 * @returns styled telephon number
 */
function formatPhoneNumber(replacedPhone) {
    if (replacedPhone.startsWith("+491")) {
        return replacedPhone.slice(0, 3) + ' ' + replacedPhone.slice(3, 6) + ' ' + replacedPhone.slice(6);
    }
    if (replacedPhone.startsWith("+4930") ||
        replacedPhone.startsWith("+4940") ||
        replacedPhone.startsWith("+4969") ||
        replacedPhone.startsWith("+4989")) {
        return replacedPhone.slice(0, 3) + ' ' + replacedPhone.slice(3, 5) + ' ' + replacedPhone.slice(5);
    } else {
        return replacedPhone.slice(0, 3) + ' ' + replacedPhone.slice(3);
    }
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
 * save contact array to Firebase
 * 
 * @param {object} table 
 * @returns 
 */
async function saveContacts(table = 'Contacts') {
    return await saveData(table, contacts);
}

/**
 * 
 * generate the background color for new user monogram
 * 
 * @returns a color code
 */
function generateDarkColor() {
    const r = Math.floor(Math.random() * 129);
    const g = Math.floor(Math.random() * 129);
    const b = Math.floor(Math.random() * 129);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * 
 * clears the input fields
 */
function clearInput() {
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("phone").value = '';
}

/**
 * 
 * remove hover effect from a per click selected contact in the contactbook
 * 
 * @param {number} id 
 */
function changeBgColor(id) {
    let elements = document.querySelectorAll(".contact");
    elements.forEach(function (element) {
        element.classList.remove('contactActive');
    })
    document.getElementById(`contact${id}`).classList.add('contactActive');
}

/**
 * 
 * genearte an array of contact details and hand over the genaerate HTML code
 * 
 * @param {Object} contact 
 * @param {Number} i 
 * @returns 
 */
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

/**
 * 
 * takes the unique ID from contact and search the position at the contact array
 * 
 * @param {Number} id 
 * @returns 
 */
function getCurrentContact(id) {
    for (let index = 0; index < contacts.length; index++) {
        if (contacts[index].id === id) {
            return index;
        }
    }
    return null;
}

/**
 * 
 * @param {object} userList - list of all registed users
 * @param {number} id - a unique number for every person in Join
 * @returns 
 */
function getIndexUser(userList, id) {
    for (let index = 0; index < userList.length; index++) {
        if (userList[index].id === id) {
            return index;
        }
    }
    return null;
}

/**
 * 
 * load contact array from Firebase
 * 
 */
async function loadContacts(table = 'Contacts') {
    let loadedContacts = await loadData(table);
    if (!loadedContacts) {
        return [];
    }
    if (Array.isArray(loadedContacts)) {
        return loadedContacts.filter((contact) => contact !== null);
    } else if (typeof loadedContacts === 'object' && loadedContacts !== null) {
        return Object.values(loadedContacts).filter(
            (contact) => contact !== null
        );
    }
    return [];
}

/**
 *
 * creates a contact form to add a new contact
 */
function openCreateContactDialogMobile() {
    document.getElementById('mobileDialogBackground').style.display = 'flex';
    let editContactContainer = document.getElementById('mobileWorkContactContainer');
    editContactContainer.innerHTML = '';
    editContactContainer.innerHTML = addContactHTML();
    editContactContainer.style.cssText = 'animation: slideIn .3s ease-out; animation-fill-mode: forwards;';
    document.getElementById('contactBook').style.overflowY = "hidden";
}

function openMobileContactDetail(singleContactArray, id) {
    document.getElementById('contactBook').style.display = 'none';
    document.getElementById('workingArea').style.display = 'none';
    document.getElementById('contactDetail').innerHTML = '';
    document.getElementById('contactDetail').innerHTML = createSingleContactMobileHTML(singleContactArray, id);
}

/**
  * 
  * close dialog window
  */
function closeContactCreation() {
    document.getElementById('dialogBackground').classList.add('displayNone');
    document.getElementById('dialogBackground').classList.remove('displayFlex');
    document.getElementById('body').classList.remove('overflowHidden');
}

/**
 * 
 * open a dialog window with pre filled input fields, so you can edit the contact data and save
 * 
 * @param {number} id - unique number for every person on Join
 */
function openEditContactDialogMobile(id) {
    let index = getCurrentContact(id);
    let inventoryData = generateInventoryDataArray(index);
    let array = generateArray(id, index);
    document.getElementById('mobileDialogBackground').style.display = 'flex';
    let editContactContainer = document.getElementById('mobileWorkContactContainer');
    editContactContainer.innerHTML = '';
    editContactContainer.innerHTML = createEditContactDialogMobileHTML(array); // <from> bis fertigstellung der eigntlichen funktion entfernt, wird später hinzugefügt für edit funktion
    preFilledInputs(inventoryData);
    editContactContainer.style.cssText = 'animation: slideIn .3s ease-out; animation-fill-mode: forwards;';
}

/**
 * close mobile dialog window
 * 
 */
function closeMobileDialogBackground() {
    document.getElementById('mobileDialogBackground').style.display = 'none';
    document.getElementById('contactBook').style.overflowY = "scroll";
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
 * takes the user back from contact detail to contac book on mobile
 * 
 */
function backToContactBook() {
    document.getElementById('contactBook').style.display = 'flex';
    document.getElementById('workingArea').style.display = 'flex';
    document.getElementById('mobileButton').style.display = 'none';
}

/**
 * opens a little pop up on mobile view
 */
function openPopUpEdit() {
    document.getElementById('popUpWarpper').style.display = 'flex';
}

/**
 * closes the little pop up on mobile view
 */
function closeMobileEditPopUp() {
    document.getElementById('popUpWarpper').style.display = 'none';
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
 * prevent close dialog by click buttons or input fields
 * 
 * @param {click} event 
 */
function dontClose(event) {
    event.stopPropagation();
}

/**
 * 
 * serches the deleted contact in tasks and remove it
 * 
 * @param {object} tasks 
 * @param {number} id 
 */
async function deleteContactFromTask(tasks, id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].assignedTo == null) continue;
        for (let x = 0; x < tasks[i].assignedTo.length; x++) {
            if (tasks[i].assignedTo[x] == Number(`${id}`)) {
                console.log(i, x);
                tasks[i].assignedTo.splice(x, 1);
            }
        }
    }
}


async function confirmDelete(id) {
    let userList = await getUserList();
    let indexUserlist = getIndexUser(userList, id);
    let indexTaskList = getCurrentContact(id);
    tasks = await loadData("taskstorage");
    contacts.splice(indexTaskList, 1);
    await deleteContactFromTask(tasks, id);
    await saveContacts();
    await saveData("taskstorage", tasks);
    await removeUser(userList, indexUserlist);
    localStorage.removeItem(PROJECT);
    sessionStorage.removeItem(PROJECT);
    isLogged();
}

async function removeUser(userList, index) {
    userList.splice(index, 1); // Remove User self 
    saveData("user", userList);
    clearLocalStorage();
    sessionDestroy();
}