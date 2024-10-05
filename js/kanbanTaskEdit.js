function getElementEdit(targetElement,query) {
    let father=targetElement.closest(".task-edit-card");
    return father.querySelector(query);     
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
                        <input class="edit-title" type="text"  required placeholder="Title" value="${json.title}">
                        <span class="error-msg visible"></span>
                    </div>
                </div>
                
                <div>
                    <strong>Description</strong>
                    <div class="input-container invalid">
                        <textarea class="edit-description" type="text" required rows="4"  placeholder="Description">${json.description}</textarea>
                        <span class="error-msg visible"></span>
                    </div>
                </div>
                
                <div>
                    <strong>Due date</strong>
                    <div class="input-container invalid">
                        <input class="edit-date" type="date"  required placeholder="Title" width="100%" value="${json.dueDate}" min="${mindate}">
                        <span class="error-msg visible"></span>
                    </div>
                </div>

                <div>
                    <strong>Priority</strong>
                    <div class="flex-row gap16 priority">
                        <label>
                            <input type="radio" name="edit-prio" value="urgent" ${json.prio=="urgent"?"checked":""}>
                            <div class="button-label urgent">
                                Urgent
                                <img src="./assets/img/desktop/prio_urgent_red.svg">
                            </div>
                        </label>

                        <label>
                            <input type="radio" id="edit-medium" name="edit-prio" value="medium" ${json.prio=="medium"?"checked":""}>
                            <div class="button-label medium">
                                Medium
                                <img src="./assets/img/desktop/prio_medium_yellow.svg">
                            </div>
                        </label>

                        <label>
                            <input type="radio" id="edit-low" name="edit-prio" value="low" ${json.prio=="low"?"checked":""}>
                            <div for="edit-low" class="button-label low">
                                Low 
                                <img src="./assets/img/desktop/prio_low_green.svg">
                            </div>
                        </label>
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
                            onclick="clearSubtaskInput(event)" class="add-subtask-clear d-none"
                            src="./assets/img/desktop/add-subtask-clear.svg" alt="">
                        <div class="h-line24"></div>    
                        <img onclick="addSubtasks(event)" class="subtask-icon"
                            src="./assets/img/desktop/add_subtask.svg">
                    </button>
                    
                    <ul class="subtask-list">
                    </ul>

                    <div class="edit-input-con d-none">
                        <input type="text" class="subtask-edit-input">
                        <div>
                            <img class="edit-delete" onclick="deleteSubtask(event)"
                                src="./assets/img/desktop/subtask-delete.svg" alt="">
                            
                            <div class="h-line24"></div>    
                            
                            <img class="edit-check" onclick="saveEditedSubtask(event)"
                                src="./assets/img/desktop/add-subtask-check.svg" alt="">
                    
                        </div>
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
    let card=document.getElementById("task-edit-card");
    subtasks=json[0].subtasks;

    card.innerHTML=kanbanEditRenderTask(json[0]);
    card.classList.add(json[0].category);
    card.classList.remove("d-none");
    // document.getElementById("task-view").classList.add("go")   
    // hier die  Event Listener aufrufen  für Selecor
    // oder den EventListener global gestzalten aber nicht sinnvol
    // await new Promise(e => setTimeout(e,1000));
    initSelector();
    addFormListener("#task-edit-card");

    let subtaskElement=card.querySelector(".subtask-list");
    renderSubtasks(subtaskElement);

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

function getRadioValue(element,name) {
    radio = element.querySelectorAll(`input[name='${name}']`);
    for (let i=0;i<radio.length;i++) {
        if (radio[i].checked) return radio[i].value;
    }
    return "";
}

function taskToObj(event,task) {
    let father=event.target.closest(".task-edit-card");
    console.log(tasks);
    console.log(subtasks);
    console.log(father.getElementEdit(event,target,".edit-title"));
    console.log(father.getElementEdit(event.target,".edit-description"));
    console.log(father.getElementEdit(event.target,".edit-date"));
    
    console.log(getRadioValue(father,"edit-prio"));
    console.log(subtasks);

}
