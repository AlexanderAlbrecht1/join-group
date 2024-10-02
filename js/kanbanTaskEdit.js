function XkanbanEditSelectorsSelected(assignedList) {
    let html="";
    for (let i=0;i<assignedList.length;i++) {
        html+=kanbanEditSelector(assignedList[i]);
    };
    return html;
}

function kanbanEditSelectors(assignedList) {
    let html="";
    

    for (let i=0;i<contacts.length;i++) {
        let checked="";
        if (assignedList.indexOf(contacts[i].id) != -1) {
            checked="checked";
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

  
function kanbanEditRenderTask(json) {
    let cat = getCategoryText(json);
    let mindate=getTaskDateMin(json.dueDate);

    return /*html*/ `
        <div class="top">
            <div class="${json.category}">${cat}</div>
            <img class="exit" onclick="closeTaskView()" src="./assets/img/desktop/close.svg">
        </div>
            <div class="center">
                <div>
                    <strong>Title</strong>
                    <div class="input-container invalid">
                        <input id="edit-title" type="text"  required placeholder="Title" value="${json.title}">
                        <span class="error-msg visible"></span>
                    </div>
                </div>
                
                <div>
                    <strong>Description</strong>
                    <div class="input-container invalid">
                        <textarea id="edit-description" type="text" required rows="4"  placeholder="Description">${json.description}</textarea>
                        <span class="error-msg visible"></span>
                    </div>
                </div>
                
                <div>
                    <strong>Due date</strong>
                    <div class="input-container invalid">
                        <input id="edit-title" type="date"  required placeholder="Title" width="100%" value="${json.dueDate}" min="${mindate}">
                        <span class="error-msg visible"></span>
                    </div>
                </div>

                <div>
                    <strong>Priority</strong>
                    <div class="flex-row gap16 priority">
                        <input type="radio" id="urgent" name="prio" value="urgent" ${json.prio=="urgent"?"checked":""}>
                        <label for="urgent" class="button-label urgent">Urgent<img id="urgent-icon"
                                src="./assets/img/desktop/prio_urgent_red.svg"></label>

                        <input type="radio" id="medium" name="prio" value="medium" ${json.prio=="medium"?"checked":""}>
                        <label for="medium" class="button-label medium">Medium<img id="medium-icon"
                                src="./assets/img/desktop/prio_medium_yellow.svg"></label>

                        <input type="radio" id="low" name="prio" value="low" ${json.prio=="low"?"checked":""}>
                        <label for="low" class="button-label low">Low <img id="low-icon"
                                src="./assets/img/desktop/prio_low_green.svg"></label>
                    </div>
                </div>



                <div class="relative mb32" >
                    <details class="absolute" style="width:100%;">
                        <summary><input type="text"></summary>
                        <div class="selectors">
                            ${kanbanEditSelectors(json.assignedTo)}
                        </div>
                    </details>
                </div>
                <div class="monogramlist flex-row gap8">
                    ${getTaskEditAssigns(json.assignedTo)}
                </div>

                <div class="subtask-container label-input-con">
                    <label>Subtasks</label>
                    <input class="input-subtask" oninput="toggleSubtaskIcon(event)" type="text" id="subtasks" placeholder="Add new subtask">
                    
                    <button type="button" id="add-subtask" class="btn-add-subtask">
                        <img 
                            onclick="clearSubtaskInput(event)" class="add-subtask-clear opacity"
                            src="./assets/img/desktop/add-subtask-clear.svg" alt="">
                        <img onclick="addSubtasks(event)" class="subtask-icon"
                            src="./assets/img/desktop/add_subtask.svg">
                    </button>
                    
                    <ul class="subtask-list">
                    </ul>

                    <div class="edit-input-con d-none">
                        <input type="text" class="subtask-edit-input">
                            <img class="edit-delete" onclick="deleteSubtask(event)"
                                src="./assets/img/desktop/subtask-delete.svg" alt="">
                            <img class="edit-check" onclick="saveEditedSubtask(event)"
                                src="./assets/img/desktop/add-subtask-check.svg" alt="">
                    </div>
                </div>

            </div>
    
            <div class="bottom">
                <div class="darkbutton">
                    Ok
                    <img class="invert" src="./assets/img/desktop/add-subtask-check.svg">
                </div>
            </div>

    `;

}

async function editTask(id) {
    let json = await loadObjectDataById("taskstorage",id);


    document.getElementById("task-edit-card").innerHTML=kanbanEditRenderTask(json[0]);
    document.getElementById("task-edit-card").classList.add(json[0].category);
    document.getElementById("task-edit-card").classList.remove("d-none");
    // document.getElementById("task-view").classList.add("go")   
    // hier die  Event Listener aufrufen  für Selecor
    // oder den EventListener global gestzalten aber nicht sinnvol
    // await new Promise(e => setTimeout(e,1000));
    initSelector();
    addFormListener("#task-edit-card");
    
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
