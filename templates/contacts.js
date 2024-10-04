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
            <a href="mailto:${singleContactArray.mail}?
                           &subject=Hello from the other side ...">
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

    </div>
    `
}

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
            <a href="mailto:${singleContactArray.mail}?
                           &subject=Hello from the other side ...">
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
                  <input id="phone" type="tel" pattern="[0-9]*" maxlength="20" placeholder="Phone">
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

function createEditContactDialogHTML(array) {
   return /*html*/ `
        
   <div class="editContactLogoContainer" onclick="dontClose(event)">
   <div class="closeMobile" onclick="closeContactCreation()">
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
            <input id="phone" type="tel" pattern="[0-9]*" maxlength="20" required placeholder="Phone">
            <span class="icon"><img src="./assets/img/desktop/phone.svg"></span>
        </div>

        <div class="editContactbuttons ">
            <div class="deleteButton" onclick="deleteContact(${array.id})">
                <span>Delete </span>
            </div>

            <button class="safeEditContactButton" onclick="saveEditedContact(${array.id})">
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
        <div class="close" onclick="closeContactCreation()">
            <img src="/assets/img/desktop/close.svg" alt="">
        </div>
        <form class="form-input">
        <div id="input-field-container" class="input-container">
            <input id="name" type="text" required placeholder="Name">
            <span class="icon"><img src="./assets/img/desktop/person.svg"></span>
        </div>

        <div id="input-field-container" class="input-container">
            <input id="email" type="email" required placeholder="Email">
            <span class="icon"><img src="./assets/img/desktop/letter.svg"></span>
        </div>

        <div id="input-field-container" class="input-container">
            <input id="phone" type="tel" pattern="[0-9]*" maxlength="20" required placeholder="Phone">
            <span class="icon"><img src="./assets/img/desktop/phone.svg"></span>
        </div>

        <div class="editContactbuttons ">
            <div class="deleteButton" onclick="deleteContact(${array.id})">
                <span>Delete </span>
            </div>

            <button class="safeEditContactButton" onclick="saveEditedContact(${array.id})">
                <span>Safe</span>
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
  <div class="close" onclick="closeContactCreation()">
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

      <button class="safeEditContactButton" onclick="closeContactCreation()">
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