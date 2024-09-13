let tasks = [];
let isDragging=false;

function init() {
   fetchTasks();
}

// function init() {
//    if (isLogged()) {
//       fetchTasks();
//    }
// }

async function fetchTasks() {
   tasks = await loadData('taskstorage');

   if (tasks) {
      console.log('Aufgaben erfolgreich geladen:', tasks);
      addContainerData(tasks,'to-do');
      addContainerData(tasks,'in-progress');
      addContainerData(tasks,'await-feedback');
      addContainerData(tasks,'done');
      
   } else {
      console.log('Es sind keine Aufgaben vorhanden');
   }
}

function getTaskOutput(task) {
   // !! What is the counter for Subtasks, subtasks done is missing
   // subDone=task.subtask.filter(e => e.done==false).length;
   subDone=task.subtasks/2;

   // !!! headline is missing in database
   task.headline="Kochwelt Page & Recipe Recommender";

   //Now begin
   return /*html*/`
      <div class="card user-story" id="task-${task.id}" draggable="true" ondragstart="drag(event)">
            <h1>${task.category}</h1>
            <div class="mbb-text">
               <h1>${task.headline}</h1>
               <span>${task.description}</span>
            </div>
            <div class="progress-container">
               <div class="progress-bar">
                  <div id="progress" class="progress" style="width:${subDone*100/task.subtasks.length}}%"></div>
               </div>
               <span>${subDone}/${task.subtasks.length} Subtasks</span>
            </div>
            <div class="mbb-icons">
               <div class="monogram"><!-- monograms-->
                  <div style="background-color: green;">FF</div>
                  <div style="background-color: aqua;">QQ</div>
                  <div style="background-color: blue;">ZZ</div>
               </div>
               <div class="icon-prio-${task.prio}"><!-- prio -->

               </div>

            </div>
      </div>
   `;

}

function addContainerData(tasks,status) {
   let task = tasks.filter((t) => t['status'] == status);
   let container = document.getElementById(`${status}-container`);
   container.innerHTML = '';

   /*
   for (let i = 0; i < task.length; i++) {
      container.innerHTML += getTaskOutput(task[i]);
   }
      */
   for (let i = 0; i < task.length; i++) {
      container.innerHTML += getTaskOutput(task[i]);
   }
   if (task.length >0)  container.classList.add("hidden");

}

function allowDrop(ev) {
   ev.preventDefault();
}

function hideNoTaskInfo(e) {
   let parent=e.target.parentElement;
   if (parent.childElementCount == 1) {
      parent.classList.remove("hidden");
   }
}

function toggleBorderTaskContainer(e) {
   let parent=e.target.parentElement;
   parent.classList.toggle("task-border");
}


function drag(ev) {
   ev.dataTransfer.setData('text', ev.target.id);
   hideNoTaskInfo(ev);
   // toggleBorderTaskContainer(ev);
   isDragging=true;
}
function resizeContainer() {
   let psc= (document.querySelector(".mbb").scrollHeight-100)+"px";
   document.getElementById("to-do-container").style.height=psc;
   document.getElementById("in-progress-container").style.height=psc;
   document.getElementById("await-feedback-container").style.height=psc;
   document.getElementById("done-container").style.height=psc;
}

function drop(ev, status) {
  // ev.preventDefault();
   let data = ev.dataTransfer.getData('text');
   let id = data.split('-');
   let convertedId = Number(id[1]);

   tasks[convertedId].status = status;
   saveData('taskstorage', tasks);
   if (ev.target.classList.contains('containers')) {
      ev.target.appendChild(document.getElementById(data));
      ev.target.classList.add("hidden");
   }
   resizeContainer();
   isDragging=false;
}

// function toggleDa
