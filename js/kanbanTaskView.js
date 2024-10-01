function getFullNameInContact(contact) {
    let name=contact.name + " " + contact.lastname;
    //if (name == getLoginname()) name+=" (You)";
    return name;
}

function getTaskViewAssign(a) {
    let contact=contacts.find(e => e.id == a);
    if (contact == null) return "";
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
    if (assigns == null) return "";
    let html="";
    for (let assign of assigns) {
        html+=getTaskViewAssign(assign);
    }
    return html;
}


function getTaskViewSubtasks(json) {
    if (json.subtasks == null) return "";
    let html="";
    let checked=""
    for (subId=0;subId<json.subtasks.length;subId++) {
        if (json.subtasks[subId].done == true) checked="checked";

        html+= /*html*/ `  
        <div>
            <img class="${checked}" onclick="toggleSubtaskStateEvent(event,${json.id},${subId})" src="./assets/img/desktop/checked.svg">
            <span>${json.subtasks[subId].name}</span>
        </div>
        `;
    } 
    return html;
}

function getCategoryText(json) {
    let cat = "User Story";
    if (json.category == "technical-task") {
        cat="Technical Task";
    }
    return cat;
}

function getTaskView(json) {
    let cat = getCategoryText(json);
    return /*html*/ `
        <div class="top">
            <div class="${json.category}">${cat}</div>
            <img class="exit" onclick="closeTaskView()" src="./assets/img/desktop/close.svg">
        </div>
        <div class="center">
            <h1>${json.title}</h1>
            <p>${json.description}</p>
            <p><strong>Due Date:</strong>${json.dueDate}</p>
            <p><strong>Priority:</strong>${json.prio}<img class="icon-prio-${json.prio}"></p>
            <div class="assign">
                <strong>Assigned to:</strong>
                ${getTaskViewAssigns(json.assignedTo)}            
            </div>
            
            <div class="subtasks"><strong>Subtasks</strong>
                ${getTaskViewSubtasks(json)}
            </div>
        </div>

        <div class="bottom">
            <a onclick="deleteTask(${json.id})">
                <img class="trash" src="./assets/img/desktop/trash.svg">
                <span>Delete</span>
            </a>
            <div></div>
            <a onclick="editTask(${json.id})">
                <img class="pencil" src="./assets/img/desktop/pencil.svg">
                <span>edit</span>
            </a>
        </div>



    `;

}

async function openTask(event) {
    if (event.type === "dragleave") {
        return
    }
    let id=event.currentTarget.id.split("-")[1];
    let json = await loadObjectDataById("taskstorage",id);
    document.getElementById("task-view-card").innerHTML=getTaskView(json[0]);
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

    index=tasks.findIndex(e => e.id==id);
    tasks[index]=json[0];  // .subtasks[subId].done=state;
    addContainerData(tasks,json[0].status);
    resizeContainer();
}

async function deleteTask(id) {
    await deleteData("taskstorage",id);
    let i=tasks.findIndex(e => e.id==id);
    let status=tasks[i].status;
    tasks.splice(i,1);

    addContainerData(tasks,status);
    closeTaskView();
}

async function editTask(id) {
}
