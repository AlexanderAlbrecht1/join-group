let subtasks=[]
let currentEditIndex=0;
/*
    changes: 
    toggleSubtaskIcon() was toggleIcin()
*/
/*
    PUBLIC Functions
*/
function toggleSubtaskIcon() {
    const subtaskInput = document.getElementById("subtasks");
    const checkIcon = document.getElementById("subtask-icon");
    const clearIcon = document.getElementById("add-subtask-clear");
    const src="./assets/img/desktop/add_subtask.svg";
 
    if (subtaskInput.value == "") {
       checkIcon.src = src; // Ersetze das Icon mit einem anderen Bild
       clearIcon.classList.add("hidden");
       clearIcon.classList.add("opacity");
    } else {
       checkIcon.src = "./assets/img/desktop/add-subtask-check.svg";
       clearIcon.classList.remove("hidden"); // Setze das ursprüngliche Icon zurück
       clearIcon.classList.remove("opacity");
    }
 }
 
function clearSubtaskInput() {
    document.getElementById("subtasks").value = "";
}

function addSubtasks() {
    let subtaskInput = document.getElementById("subtasks");
    let subtaskList = document.getElementById("subtask-list");
    
    const src="add_subtask.svg";   
    if (document.getElementById("subtask-icon").src.indexOf(src) != -1) {
       subtaskInput.focus();      
    }
 
    if (subtaskInput.value !== "") {
       subtaskList.innerHTML = "";
 
       subtasks.push({ name: subtaskInput.value, done: false });
 
       renderSubtasks(subtaskList);
 
       subtaskInput.value = "";
       toggleSubtaskIcon();
    } else {
       return;
    }
}
 
function deleteSubtask(i) {
    let subtaskList = document.getElementById("subtask-list");
    let subtaskEditInput = document.getElementById("subtask-edit-input");
    let subtaskEditCon = document.getElementById("edit-input-con");
 
    subtasks.splice(i, 1);
    subtaskEditCon.classList.add("d-none");
    renderSubtasks(subtaskList);
    subtaskEditInput.value = "";
}
 



function saveEditedSubtask() {
    let subtaskEditInput = document.getElementById("subtask-edit-input");
    let subtaskList = document.getElementById("subtask-list");
    let subtaskEditCon = document.getElementById("edit-input-con");
 
    if (currentEditIndex !== null && subtaskEditInput.value !== "") {
       subtasks[currentEditIndex].name = subtaskEditInput.value;
       subtaskEditCon.classList.add("d-none");
       renderSubtasks(subtaskList);
       currentEditIndex = null;
       subtaskEditInput.value = "";
    }
}

function editSubtask(index) {
    let subtaskEditInput = document.getElementById("subtask-edit-input");
    let subtaskEditCon = document.getElementById("edit-input-con");
 
    subtaskEditCon.classList.remove("d-none");
    subtaskEditCon.focus();

    subtaskEditInput.value = subtasks[index].name;
    currentEditIndex = index;
 }
 
 
/*
    PRIVATE / INTERNAL Functions
*/


function renderSubtasks(subtaskList) {
    subtaskList.innerHTML = "";
 
    for (let i = 0; i < subtasks.length; i++) {
/*
       subtaskList.innerHTML += `
       <div id="subtask-con" class="list-item">
            <li ondblclick="editSubtask(${i})">
                <input type="text" value="${subtasks[i].name}">
            </li>
            <div class="subtask-icon">
                <img onclick="editSubtask(${i})" src="./assets/img/desktop/subtask-edit.svg" alt="">
                <img onclick="deleteSubtask(${i})" src="./assets/img/desktop/subtask-delete.svg" alt="">
            </div>
        </div>`;
*/
        subtaskList.innerHTML +=/*html*/ `
            <div id="subtask-con" class="list-item">
                <li ondblclick="editSubtask(${i})">
                    <input type="text" value="${subtasks[i].name}">
                </li>
                <div class="subtask-icon">
                    <img onclick="editSubtask(${i})" src="./assets/img/desktop/subtask-edit.svg" alt="">
                    <img onclick="deleteSubtask(${i})" src="./assets/img/desktop/subtask-delete.svg" alt="">
                </div>
            </div>
        `;
    }
 }
 