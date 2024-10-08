let doNotSubmit= false;
let tasks= [];
async function addNewTask() {
   if (doNotSubmit) return;
   if (!showRequiredText()) return;
   

   let title = document.getElementById("title");
   let description = document.getElementById("description");
   let assignedTo = Array.from(
      document.querySelectorAll('input[name="assign"]:checked')
   ).map((checkbox) => +checkbox.value);
   let dueDate = document.getElementById("due-date");
   let selectedPrio = document.querySelector('input[name="prio"]:checked');
   let category = document.getElementById("category");

   tasks = await loadData("taskstorage");

   if (tasks === null) { 
      tasks = [];
   }
   tasks.push({
      id: getNewId(tasks), //tasks.length,
      title: title.value,
      description: description.value,
      assignedTo: assignedTo,
      dueDate: dueDate.value,
      prio: selectedPrio.value,
      category: category.value,
      status: "to-do",
      subtasks: subtasks,
   });
   await saveData("taskstorage", tasks);
   clearTaskInputs();
   openKanbanboard();
}

function clearTaskInputs() {
   document.getElementById("title").value = "";
   document.getElementById("description").value = "";
   document
      .querySelectorAll('input[name="assign"]')
      .forEach((checkbox) => (checkbox.checked = false));
   document.getElementById("due-date").value = "";
   document.getElementById('addtask-monogramlist').innerHTML="";
   document.querySelectorAll('input[name="prio"]').forEach((radio) => {
      if (radio.id == "medium") {
         radio.checked = true;
      } else {
         radio.checked = false;
      }
   });
   document.getElementById("category").selectedIndex = 0;
   subtasks = [];
   document.getElementById("subtask-list").innerHTML = "";
   document.getElementById("addtask-monogramlist").innerHTML = "";
   document.getElementById("subtask-list").innerHTML = "";
   return;
}

let expanded = false;

function showCheckboxes() {
   let checkboxes = document.getElementById("checkboxes");
   if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
   } else {
      checkboxes.style.display = "none";
      expanded = false;
   }
}

async function init() {
   if (isLogged()) {
      contacts=await loadSortedContactList();
      logedUserMonogram();
      date = new Date().toISOString().split('T')[0];
      document.getElementById('due-date').setAttribute('min', date);
      initAssignSelector();
   }
}

function renderSubtasks(subtaskList) {
   subtaskList.innerHTML = "";

   for (let i = 0; i < subtasks.length; i++) {
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

function editSubtask(index) {
   let subtaskEditInput = document.getElementById("subtask-edit-input");
   let subtaskEditCon = document.getElementById("edit-input-con");

   subtaskEditCon.classList.remove("d-none");
   subtaskEditInput.value = subtasks[index].name;
   currentEditIndex = index;
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

async function openKanbanboard() {
   await msgfly();
   window.location = "./kanbanboard.html";
}

function XshowRequiredText() {
   let title = document.getElementById("title");
   let titleSpan = document.getElementById("title-span");
   let dueDate = document.getElementById("due-date");
   let dueDateSpan = document.getElementById("due-date-span");
   let category = document.getElementById("category");
   let categoryBox = document.getElementById("select-box");
   let categorySpan = document.getElementById("category-span");

   if (!title.value) {
      titleSpan.classList.remove("d-none");
      title.style.border = "1px solid red";
   } else {
      titleSpan.classList.add("d-none");
      title.style.border = "1px solid #d1d1d1";
   }

   if (!dueDate.value) {
      dueDateSpan.classList.remove("d-none");
      dueDate.style.border = "1px solid red";
   } else {
      dueDateSpan.classList.add("d-none");
   }

   if (!category.value) {
      categorySpan.classList.remove("d-none");
      categoryBox.style.border = "1px solid red";
      return;
   } else {
      categorySpan.classList.add("d-none");
   }

   return true;
}



function faultDisplay(field,msg,border) {
   if (border == null) border=field;
   if (field.value) {
       border.style.border = "";
       msg.classList.add("d-none"); 
   } else {
       border.style.border = "1px solid red";
       msg.classList.remove("d-none");     
   }
   return !field.value
}


function showRequiredText() {
   let field,msg;
   let err=false;

   field = document.getElementById("title");
   msg = document.getElementById("title-span");
   err   = faultDisplay(field,msg) || err;
   field = document.getElementById("due-date");
   msg = document.getElementById("due-date-span");
   err   = faultDisplay(field,msg) || err;
   field = document.getElementById("category");
   border = document.getElementById("select-box");
   msg = document.getElementById("category-span");
   err   = faultDisplay(field,msg,border) || err;
   return !err;
}



/**
 * 
 * PUBLIC EVENT 
 * 
 * Prevent in forms that Form ist submitten when pressing Enter key
 * Handels Subtask via Enter Key
 * 
 * @param {*} event - keydown event that triggers
 * @param {*} key   - key to disable/action
 */
function noSubmit(event,key) {
   doNotSubmit=false
   if (event.code == key && event.target.tagName== "INPUT") {
      console.log("noSubmit");
      if (event.target.classList.contains("input-subtask")) {
         addSubtasks(event);
         doNotSubmit=true;

      } 
      event.preventDefault();
   }
}
