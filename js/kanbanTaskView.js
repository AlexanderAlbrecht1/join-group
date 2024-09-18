function getFullNameInContact(contact) {
    let name=getFullName(contact.name + " " + contact.lastname);
    if (name == loginname) name+=" (You)";
    return name;
}

function getTaskViewAssign(a) {
    let contact=contacts.find(e => e.id == a);
    let name=getFullNameInContact(contact);

    return /*html*/ `
    <div onclick="toggleActiveKanbanTask(event)">
        <div>
            <div style="background-color: ${contact.color}">${getMonogram(name)}</div>
            <span>${name}</span>
        </div>
        <div><!--"checkbox"-->
        </div>
    </div>
    `;
}

function getTaskViewAssigns(assigns) {
    let html="";
    for (let assign of assigns) {
        html+=getTaskViewAssign(assign);
    }
    return html;
}


function getTaskViewSubtasks(json) {
    for (subtask of subtasks,json)    
}
<div>
<img onclick="toggleSubtaskStateEvent(event,4,1)" src="./assets/img/desktop/checked.svg">
<span>Establish CSS Methodology</span>
</div>


function displayTaskView(json) {
    return /*html*/ `
        <div class="top">
            <div>User Story</div>
            <img class="exit" onclick="closeTaskView()" src="./assets/img/desktop/close.svg">
        </div>
        <h1>CSS Architecture Planning</h1>
        <p>Define CSS naming conventions and structure</p>
        <p><strong>Due Date:</strong>02/09/2023</p>
        <p><strong>Priority:</strong>02/09/2023<img class="icon-prio-urgent"></p>
        <div class="assign">
            <strong>Assigned to:</strong>
            ${getTaskViewAssigns(json.assignedTo)}            
        </div>
        
        <div class="subtasks"><strong>Subtasks</strong>
            ${getTaskViewSubtasks(json.subtasks)}
            <div>
                <img onclick="toggleSubtaskStateEvent(event,4,1)" src="./assets/img/desktop/checked.svg">
                <span>Establish CSS Methodology</span>
            </div>
            <div>
                <img onclick="toggleSubtaskStateEvent(event)" src="./assets/img/desktop/unchecked.svg">
                <span>Setup Base Styles</span>
            </div>
        </div>

        <div class="bottom">
            <a>
                <img class="trash" src="./assets/img/desktop/trash.svg">
                <span>Delete</span>
            </a>
            <div></div>
            <a>
                <img class="pencil" src="./assets/img/desktop/pencil.svg">
                <span>edit</span>
            </a>
        </div>



    `;

}

async function openTask(event,id) {
    console.log(event.type);

    if (event.type === "dragleave") {
        return
    }
    // here the code
    console.log(event.currentTarget.id);
    let saveId=event.currentTarget.id.split("-")[1];
    let json = await loadObjectDataById("taskstorage",id);

    displayTaskView(json[0]);

    document.getElementById("task-view").classList.add("go")
}

function closeTaskView() {
    document.getElementById("task-view").classList.remove("go")
}

function toggleActiveKanbanTask(event) {
    event.currentTarget.classList.toggle("dark-selection");
}


function toggleSubtaskState(element,state=null) {
    if (state === null) {
        return element.classList.toggle("checked");
    } else {
        return element.classList.toggle("checked",state);
    }
}


async function toggleSubtaskStateEvent(event,id,subId) {
    let state = toggleSubtaskState(event.currentTarget);
    let json = await loadObjectDataById("taskstorage",id);
    json[0].subtasks[subId].done=state;
    saveObjectDataById("taskstorage",json);

    // load Dataset
    // change dataset with new Information
    // save Dataset

}