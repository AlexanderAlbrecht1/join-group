function initAssignSelector() {
    // contacts= loadContacts(table = 'Contacts');

    // ${kanbanEditSelectors(json.assignedTo)}
    let list=document.getElementById("add-task-assignToList")
    list.innerHTML=kanbanEditSelectors();
    
    let monograms=document.getElementById("addtask-monogramlist");
    monograms.innerHTML=""; // getTaskEditAssigns(json.assignedTo);

    addToggleSelectListener();
}



/**
 * 
 * PRIVATE 
 * 
 * Creates HTML: One monogram 
 * 
 * @param {*} a - assigned contact
 * @returns - the generatetd HTML for one contact 
 */
function getTaskEditAssign(a) {
    let contact=contacts.find(e => e.id == a);
    if (contact == null) return "";
    let name=getFullNameInContact(contact);

    return /*html*/ `
       <span class="circle-monogram" style="background-color:${contact.color}">${getMonogram(name)}</span>`;
}

/**
 * 
 * PUBLIC 
 * 
 * Creates HTML: a row of contacts
 * 
 * @param {*} assigns  - contact.assignedTo List of assigned Contacts
 * @returns - a row of contacts in HTML  
 */
function getTaskEditAssigns(assigns) {
    if (assigns == null) return "";
    let html="";
    for (let assign of assigns) {
        html+=getTaskEditAssign(assign);
    }
    return html;
}


function kanbanEditSelectors(assignedList) {
    let html="";    

    for (let i=0;i<contacts.length;i++) {
        let checked="";
        if (assignedList != null) {

            if (assignedList.indexOf(contacts[i].id) != -1) {
                checked="checked";
            }
        }

        html+=kanbanEditSelector(contacts[i],checked);
    };
    return html;
}



function kanbanEditSelector(contact,checked) {
    if (contact == null) return "";
    let name=getFullNameInContact(contact);


    return /*html*/ `
        <label class="selector">
            <input type="checkbox" class="custom-checkbox" name="assign" value="${contact.id}" ${checked}>
            <div class="checkbox-design">
                <div>
                    <span class="circle-monogram" style="background-color:${contact.color}">${getMonogram(name)}</span>  
                    <span class="selector-name">${name}</span>
                </div>
                <img>
            </div>
        </label>`;
}
