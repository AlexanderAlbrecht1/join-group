function generateGroupLetterHTML(letter) {
    return `
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
    return `
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