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