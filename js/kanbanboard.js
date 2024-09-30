let tasks = [];
let statusList=[
   "to-do",
   "in-progress",
   "await-feedback",
   "done"];

async function init() {
   if (isLogged()) {

      contacts = await loadData('Contacts');
      fetchTasks();
      logedUserMonogram();
      //initSelector();
   }
}

// function init() {
//    if (isLogged()) {
//       fetchTasks();
//    }
// }
function displayTasks(tasks) {
   for(let status of statusList) {
      addContainerData(tasks,status);
   }
}

async function fetchTasks() {
   tasks = await loadData('taskstorage');

   if (tasks) {
      displayTasks(tasks);
   } else {
      console.log('Es sind keine Aufgaben vorhanden');
   }
}

function filterTasks() {
   let search=document.getElementById("find").value;
   let filteredTasks=tasks.filter(e => e.title.includes(search) || e.description.includes(search) )
   displayTasks(filteredTasks);
}

function getContacts(assigns) {
   if (assigns == null) return "";
   let html=``;
   for(i=0;i<Math.min(assigns.length,5);i++) {
      let contact=contacts.find(e => e.id == assigns[i]);
      if (contact == null) continue;
      let monogram=getMonogram(contact.name + " " + contact.lastname);
      html+=`<div style="background-color: ${contact.color};">${monogram}</div>`;
   }
   if (assigns.length>5) {
      html+=`<div class="count">+${(assigns.length-5)}</div>`;
   }
   return html;
}
function getCategoryClass(category) {
   return category.toLowerCase().replace(" ","-");
}

function getSubBar(task) {
   let subbar="";
   if (task.subtasks != null) {
      let done=task.subtasks.filter(e => e.done).length;
      subbar=/*html*/`
         <div class="progress-container">
            <div class="progress-bar">
               <div id="progress" class="progress" style="width:${done*100/task.subtasks.length}%"></div>
            </div>
            <span>${done}/${task.subtasks.length} Subtasks</span>
         </div>
      `;
   }
   return subbar;
}


function getTaskOutput(task) {
   let contacts=getContacts(task.assignedTo);
   let categoryClass=getCategoryClass(task.category);
   let subbar=getSubBar(task);
   let cat = getCategoryText(task);

   //Now begin
   return /*html*/`
      <div class="card ${categoryClass}" id="task-${task.id}" 
      draggable="true" 
      ondragstart="drag(event)"
      ondragenter="toggleBorder(event,true)"
      onmouseup="openTask(event)"
     >
         <h1>${cat}</h1>
         <div class="mbb-text">
            <h1>${task.title}</h1>
            <span>${task.description}</span>
         </div>
         ${subbar}
         <div class="mbb-icons">
            <div class="monogram"><!-- monograms-->
               ${contacts}
            </div>
            <div class="icon-prio-${task.prio}"> <!-- prio -->
            </div>
         </div>
      </div>
   `;

}

function addContainerData(tasks,status) {
   let task = tasks.filter((t) => t['status'] == status);
   let container = document.getElementById(`${status}-container`);
   container.innerHTML = '';

   for (let i = 0; i < task.length; i++) {
      container.innerHTML += getTaskOutput(task[i]);
   }
   if (task.length >0)  {
      container.classList.add("hidden");
   } else {
      container.classList.remove("hidden");

   }

}

function allowDrop(ev) {
   ev.preventDefault();
}


function drag(ev) {
   ev.dataTransfer.setData('text', ev.target.id);
   hideNoTaskInfo(ev);
}


/**
 * 
 * Categorie: local event
 * 
 * put the dragged Card to the new position
 *  
 * @param {event} event - ausgelöstes Event
 * @param {string} id - position to append the card 
 */
function appendTask(event,id) {
   let t=event.currentTarget; 
   t.appendChild(document.getElementById(id));
   t.classList.add("hidden");
}


/**
 * 
 * category: local firebase storage
 * 
 * saves the new information in the database
 * 
 * @param {string} data - id of Task card 
 * @param {*} status    - category/stats of the task in the timeline 
 */
function saveTask(data,status) {
   let id = data.split('-');
   let convertedId = Number(id[1]);
   tasks[convertedId].status = status;
   saveData('taskstorage', tasks);
}

function drop(ev, status) {
   let data = ev.dataTransfer.getData('text');
   saveTask(data,status);
   appendTask(ev,data);
   resizeContainer();
   toggleBorder(ev,false);
}

function setStyle(id) {
   let psc= (document.querySelector(".mbb").scrollHeight-0)+"px";
   document.getElementById(id).style.height=psc;
}


function resizeContainer() {
   let psc= (document.querySelector(".mbb").scrollHeight-0)+"px";
   document.querySelector(".mbb").height="100%";

   for (let id of statusList) {
      document.getElementById(`${id}-container`).style.height=psc;
   }

}

/*
   Task Info Container Grey
*/ 
function hideNoTaskInfo(e) {
   let parent=e.target.parentElement;
   if (parent.childElementCount == 1) {
      parent.classList.remove("hidden");
   }
}


/** 
 * 
 * Category: Library/Classes
 * 
 * returns the net top element with the given classname
 * (this is querySelector reverse)
 *  
 * @param {element} element   - the start search element 
 * @param {string} className  - the classname to find
 * @returns                   - the found element
 */
function getTopParent(element,className) {
   let e=element;
   while (e) {
      if (e.classList.contains(className)) return e;
      e=e.parentElement;
   }
   return null;
}


function toggleBorder(event,status=null) {
   let e=getTopParent(event.target,"containers");

   // Only if container is completly leaving
   if (event.type === "dragleave" && e.contains(event.relatedTarget)) {
      return; 
   }   
   if (status == null) {
      e.classList.toggle("task-border");
   } else {
      e.classList.toggle("task-border",status);
   }
}