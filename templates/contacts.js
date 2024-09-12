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

function generateDisplayContactsHTML(contact) {
    return /*html*/ `
            <div onclick="showSingleContact(${contact.ID})" class="contact" id="contact${contact.ID}">
                 <div class="monogrammicon" style="background-color: ${contact.backgroundColor}">
                    <span>${contact.initial1}${contact.initial2}</span>
                </div>
                <div class="nameAndMail">
                    <span class="nameOverviev">${contact.name} ${contact.lastname}</span>
                     <div class="mailOverviewContainer">
                        <span class="mailOverview">${contact.mail}</span>
                     </div>
                </div>
            </div>
            `
}

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
            <span class="emailSpan">${singleContactArray.mail}</span>
         </div>
         <div class="phoneNumberContainer">
            <span class="spanHeading">Phone</span>
            <span class="phoneSpan">${singleContactArray.phone}</span>
         </div>
      </div>

    </div>
    `
}

function addContactHTML() {
   return /*html*/ `
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
    `
}

function createEditContactDialogHTML(id,initial1, initial2,backgroundColor) {
   return /*html*/ `
        
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
   `
}