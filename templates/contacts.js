/**
 * 
 * generates HTML code to display the group letter
 * 
 * @param {string} letter 
 * @returns HTML Code
 */
function generateGroupLetterHTML(letter) {
   return /*html*/ `
      <div class="groupLetter">
         <span>\n${letter}</span>
      </div>
      <div class="breakingLineContainer">
         <div class ="breakingLine">   
         </div>
      </div>
      `
}


/**
 * 
 * generates HTML code to display the single contact in the contact book
 * 
 * @param {object} contactArray - contact details
 * @param {string} initial1 - first letter firstname
 * @param {string} initial2 - first letter lastname
 * @returns HTML Code
 */
function generateDisplayContactsHTML(contactArray, initial1, initial2) {
   return /*html*/ `
            <div onclick="showSingleContact(${contactArray.ID})" class="contact" id="contact${contactArray.ID}">
                 <div class="monogrammicon" style="background-color: ${contactArray.backgroundColor}">
                    <span>${initial1}${initial2}</span>
                </div>
                <div class="nameAndMail">
                    <span class="nameOverviev">${contactArray.name} ${contactArray.lastname}</span>
                     <div class="mailOverviewContainer">
                        <span class="mailOverview">${contactArray.mail}</span>
                     </div>
                </div>
            </div>
            `
}

/**
 * 
 * Generates HTML code to display the details of a selected contact in the desktop view
 * 
 * @param {object} singleContactArray - object contains details of selected contact
 * @param {number} id - it's a unique number for every person on Join, generated by add a new contact
 * @returns HTML code
 */
function createSingleContactHTML(singleContactArray, id) {
   return /*html*/ `
      <div class="name">
         <div class="detailMonogramContainer">
            <span class="detailMonogramSpan" style="background-color: ${singleContactArray.backgroundColor}">${singleContactArray.initial1}${singleContactArray.initial2}</span>
         </div>
         <div class="fullNameAndButtons">
            <div class="fullname">
               <span>${singleContactArray.name} ${singleContactArray.lastname}</span>
            </div>
            <div class="editButtons">
               <div onclick="openEditContactDialogMobile(${id})" class="editButton">
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
         <div class="emailAdressContainer">
            <span class="spanHeading">Email</span>
            <a href="mailto:${singleContactArray.mail}? &subject=Hello from the other side ...">
               <span class="emailSpan">${singleContactArray.mail}</span>
            </a>
         </div>
         <div class="phoneNumberContainer">
            <span class="spanHeading">Phone</span>
            <a href="tel:${singleContactArray.phone}">
               <span class="phoneSpan">${singleContactArray.phone}</span>
            </a>
         </div>
      </div>
    `
}

/**
 * 
 * Generates HTML code to display the details of a selected contact in the mobile view
 * 
 * @param {object} singleContactArray - object contains details of selected contact
 * @param {number} id - it's a unique number for every person on Join, generated by add a new contact
 * @returns HTML code
 */
function createSingleContactMobileHTML(singleContactArray, id) {
   return /*html*/ `
   <div class="name">
      <div class="detailMonogramContainer">
         <span class="detailMonogramSpan" style="background-color: ${singleContactArray.backgroundColor}">${singleContactArray.initial1}${singleContactArray.initial2}</span>
      </div>
      <div class="fullNameAndButtons">
         <div class="fullname">
            <span>${singleContactArray.name} ${singleContactArray.lastname}</span>
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
      <div class="emailAdressContainer">
         <span class="spanHeading">Email</span>
         <a href="mailto:${singleContactArray.mail}? &subject=Hello from the other side ...">
            <span class="emailSpan">${singleContactArray.mail}</span>
         </a>
      </div>
      <div class="phoneNumberContainer">
         <span class="spanHeading">Phone</span>
         <a href="tel:${singleContactArray.phone}">
            <span class="phoneSpan">${singleContactArray.phone}</span>
         </a>
      </div>
   </div>
   <div class="wrapperMobileButton">
      <div class="mobileButton" id="mobileButton" onclick="openPopUpEdit()">
      </div>
   </div>
   <div class="popUpWrapper" id="popUpWarpper" onclick="closeMobileEditPopUp()">
      <div class="popUpEdit" id="popUpEdit">
         <div onclick="openEditContactDialogMobile(${id})" class="editButtonMobile">
            <div></div>
            <span>Edit</span>
         </div>
         <div onclick="deleteContact(${id})" class="trashButtonMobile">
            <div></div>
            <span>Delete</span>
         </div>
      </div>
   </div>
    `
}

/**
 * 
 * generates HTML code to display an overlay container for entering and saving a new contact
 * 
 * @returns HTML Code
 */
function addContactHTML() {
   return /*html*/ `
   <div class="addContactLogoContainer">
      <div class="closeMobile" onclick="closeContactCreation(), closeMobileDialogBackground()">
        <img src="/assets/img/desktop/close_white.svg" alt="">
      </div>
      <div>
        <img class="contactLogo" src="/assets/img/desktop/join-logo_navbar.svg" alt="">
        <h1>Add contact</h1>
        <span>Tasks are better with a team!</span>
        <div class="vector5"></div>
        <div class="contactLogoMirror"></div>
      </div>
   </div>
   <div class="addContactInputContainer">
      <div class="emptyMonogram">
        <img src="./assets/img/desktop/empty_user.svg" alt="">
      </div>
         <div class="addContactInputContainer2">
            <div class="close" onclick="closeContactCreation(), closeMobileDialogBackground()">
               <img src="/assets/img/desktop/close.svg" alt="">
            </div>
            <form id="add-contact-form" class="form-input" onsubmit="addNewContact();return false;" onload="removeEvent();return false" id="addContactCard" class="addContactCard">
               <div class="input-container">
                  <input id="name" type="text" required pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$" placeholder="Name">
                  <span class="icon"><img src="./assets/img/desktop/person.svg"></span>   
                  <span class="error-msg visible"></span>
               </div>
               <div  class="input-container email">
                  <input 
                     id="email" 
                     type="mail" 
                     required pattern="(?![._\\-])(?!.*\\.\\.)[\\-A-Za-z0-9_]*[\\-A-Za-z0-9_\\.]*[A-Za-z0-9]+@[\\-A-Za-z0-9][\\-A-Za-z0-9_]+\\.[A-Za-z]{2,4}" 
                     title="Format: user.name@domain.com" 
                     placeholder="Email">
                  <span class="icon"><img src="./assets/img/desktop/letter.svg"></span>
                  <span class="error-msg visible"></span>
               </div>
               <div  class="input-container">
                  <input id="phone" type="tel" required pattern="[0-9+]*" maxlength="20" placeholder="Phone">
                  <span class="icon"><img src="./assets/img/desktop/phone.svg"></span>
                  <span class="error-msg visible"></span>
               </div>
               <div class="buttons">
                  <div class="cancelButton" onclick="closeContactCreation(), closeMobileDialogBackground()">
                    <span>Cancel </span>
                    <div class="cancelSVGContainer">
                    </div>
                  </div>
                  <button onmousedown="validateForm('add-contact-form')"  class="createContactButton" type="submit">
                    <span>Create contact</span>
                    <div class="checkSVGContainer">
                    </div>
                  </button>
               </div>
            </form>
         </div>
      </div>
    `
}

/**
 * 
 * generates HTML code to display an overlay container in which the data of a selected contact can be edited and deleted
 * 
 * @param {object} array - data of selected contact
 * @returns HTMl code
 */
function createEditContactDialogMobileHTML(array) {
   return /*html*/ `     
   <div class="editContactLogoContainer" onclick="dontClose(event)">
         <div class="closeMobile" onclick="closeMobileDialogBackground()">
            <img src="/assets/img/desktop/close_white.svg" alt="">
         </div>
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
            <span class="detailMonogramSpan" style="background-color: ${array.backgroundColor}">${array.initial1}${array.initial2}</span>
         </div>
         <div class="addContactInputContainer2">
            <div class="close" onclick="closeContactCreation(), closeMobileDialogBackground()">
               <img src="/assets/img/desktop/close.svg" alt="">
            </div>
            <form id:="edit-contact-form" class="edit-input" onsubmit="saveEditedContact(${array.id});return false;" onload="removeEvent();return false" id="editContactCard" class="editContactCard">
               <div class="input-container invalid">
                  <input id="name" type="text" required pattern="^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$" placeholder="Name">
                  <span class="icon"><img src="./assets/img/desktop/person.svg"></span>   
                  <span class="error-msg visible"></span>
               </div>
               <div class="input-container invalid email">
               <input 
                     id="email" 
                     type="mail" 
                     required pattern="(?![._\\-])(?!.*\\.\\.)[\\-A-Za-z0-9_]*[\\-A-Za-z0-9_\\.]*[A-Za-z0-9]+@[\\-A-Za-z0-9][\\-A-Za-z0-9_]+\\.[A-Za-z]{2,4}" 
                     title="Format: user.name@domain.com" 
                     placeholder="Email">
                  <span class="icon"><img src="./assets/img/desktop/letter.svg"></span>
                  <span class="error-msg visible"></span>
               </div>
               <div  class="input-container invalid">
                  <input id="phone" type="tel" required pattern="[0-9+]*" maxlength="20" placeholder="Phone">
                  <span class="icon"><img src="./assets/img/desktop/phone.svg"></span>
                  <span class="error-msg visible"></span>
               </div>
               <div class="editContactbuttons">
                  <div class="deleteButton" onclick="deleteContact(${array.id})">
                     <span>Delete </span>
                  </div>
                  <button onmousedown="validateForm('edit-contact-form')" class="safeEditContactButton" type="submit" >
                     <span>Save</span>
                     <div class="checkSVGContainer">
                     </div>
                  </button>
               </div>
            </form>
         </div>
      </div>
   </div>
   `
}

/**
 * 
 * generates HTML code to display an overlay container that indicates the deletion of the active user
 * 
 * @param {object} array 
 * @returns HTML code
 */
function warningHTML(array) {
   return /*html*/ `
   <div class="editContactLogoContainer" onclick="dontClose(event)">
      <div>
         <img class="contactLogo" src="/assets/img/desktop/join-logo_navbar.svg" alt="">
      <div class="flexColumn">
         <h1 class="warningHeadline">Warning!</h1>
         <div class="vector5EditContact"></div>
      </div>
        <div class="contactLogo"></div>
      </div>
   </div>
   <div class="addContactInputContainer">
      <div class="detailMonogramContainer">
         <span class="detailMonogramSpan" style="background-color: ${array.backgroundColor}">${array.initial1}${array.initial2}</span>
      </div>
         <div class="addContactInputContainer2">
            <div class="close" onclick="closeContactCreation(), closeMobileDialogBackground()">
               <img src="/assets/img/desktop/close.svg" alt="">
            </div>
            <div>
               <h2>Attention! <br><br>
               If you delete yourself, your account will be deleted an you will be logged out! <br><br>
               Do you realy want to go on?
               </h2>
            </div>
            <div class="editContactbuttons ">
               <div class="deleteAnywayButton" onclick="confirmDelete(${array.id})">
                  <span>Delete anyway!</span>
               </div>
               <button class="safeEditContactButton" onclick="closeMobileDialogBackground()">
                  <span>ABORT</span>
                  <div class="checkSVGContainer">
                  </div>
               </button>
            </div>
         </div>
      </div>
   </div>
   `
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
   return /*html*/`
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