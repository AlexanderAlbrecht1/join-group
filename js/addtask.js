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
   }
)
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
}

function addSubtasks() {
   let subtaskInput = document.getElementById("subtasks");
   let subtaskList = document.getElementById("subtask-list");

   if (subtaskInput.value !== "") {
      subtaskList.innerHTML = "";
      subtasks.push(subtaskInput.value);

      for (let i = 0; i < subtasks.length; i++) {
         subtaskList.innerHTML += `<li>${subtasks[i]}</li>`;
      }
      subtaskInput.value = "";
   } else {
      return;
   }
}

function openKanbanboard() {
   setTimeout(() => {
      window.location = ("./kanbanboard.html");
    }, 2000);
     
   }



   function showRequiredText() {
      let title = document.getElementById("title");
      let titleSpan = document.getElementById('title-span'); // Achte darauf, dass das span-Element die richtige ID hat.
      let dueDate = document.getElementById("due-date");
      let dueDateSpan = document.getElementById("due-date-span"); // Achte darauf, dass das span-Element die richtige ID hat.
      let category = document.getElementById("category");
      let categorySpan = document.getElementById("category-span"); // Achte darauf, dass das span-Element die richtige ID hat.
   
      if (!title.value) {
        titleSpan.classList.remove('d-none');
        return;
      } else {
          titleSpan.classList.add('d-none');
      }
   
      if (!dueDate.value) {
           dueDateSpan.classList.remove('d-none');
           return;
      } else {
         dueDateSpan.classList.add('d-none');
      }
   
      if (!category.value) {
          categorySpan.classList.remove('d-none');
          return;
      } else {
         categorySpan.classList.add('d-none');
      }
 
      // Falls alle Felder gefüllt, geht es weiter
      return true;

   }
   