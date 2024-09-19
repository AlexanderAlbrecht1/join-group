let tasks = [];
let subtasks = [];

async function addNewTask() {
   showRequiredText();

   if (!showRequiredText()) {
      return;
   }

   let title = document.getElementById("title");
   let description = document.getElementById("description");
   let assignedTo = Array.from(
      document.querySelectorAll('input[name="assign"]:checked')
   ).map((checkbox) => checkbox.value);
   let dueDate = document.getElementById("due-date");
   let selectedPrio = document.querySelector('input[name="prio"]:checked');
   let category = document.getElementById("category");

   tasks = await loadData("taskstorage");

   if (tasks === null) {
      tasks = [];
   }
   tasks.push({
      id: tasks.length,
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

function init() {
   if (isLogged()) {
      initContactList(contacts);
   }
   logedUserMonogram();
}

function addSubtasks() {
   let subtaskInput = document.getElementById("subtasks");
   let subtaskList = document.getElementById("subtask-list");

   if (subtaskInput.value !== "") {
      subtaskList.innerHTML = "";

      subtasks.push({ name: subtaskInput.value, done: false });

      renderSubtasks(subtaskList);

      subtaskInput.value = "";
      toggleIcon();
   } else {
      return;
   }
}

function renderSubtasks(subtaskList) {
   subtaskList.innerHTML = "";

   for (let i = 0; i < subtasks.length; i++) {
      subtaskList.innerHTML += `<div id="subtask-con" class="list-item">
                                 <li ondblclick="editSubtask(${i})">${subtasks[i].name}</li>
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

function showRequiredText() {
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

function toggleIcon() {
   const subtaskInput = document.getElementById("subtasks");
   const checkIcon = document.getElementById("subtask-icon");
   const clearIcon = document.getElementById("add-subtask-clear");

   if (subtaskInput.value == "") {
      checkIcon.src = "./assets/img/desktop/add_subtask.svg"; // Ersetze das Icon mit einem anderen Bild
      clearIcon.classList.add("hidden");
   } else {
      checkIcon.src = "./assets/img/desktop/add-subtask-check.svg";
      clearIcon.classList.remove("hidden"); // Setze das ursprüngliche Icon zurück
   }
}

function clearSubtaskInput() {
   document.getElementById("subtasks").value = "";
}

window.addEventListener("mouseup", function (event) {
   let checkboxes = document.getElementById("checkboxes");
   let selectBox = document.querySelector(".selectBox");

   // Falls die Checkboxes sichtbar sind und man außerhalb klickt
   if (
      expanded &&
      !checkboxes.contains(event.target) &&
      !selectBox.contains(event.target)
   ) {
      checkboxes.style.display = "none";
      expanded = false;
   }
});

function toggleCheckbox(divElement) {
   const checkbox = divElement.querySelector('input[type="checkbox"]');

   checkbox.checked = !checkbox.checked;

   if (checkbox.checked) {
      divElement.style.backgroundColor = "#2A3647";
      divElement.style.color = "white";
   } else {
      divElement.style.backgroundColor = "";
      divElement.style.color = "";
   }
}
