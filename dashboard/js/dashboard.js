let tasks = []


function init() {
  fetchTasks();
  
  }

  async function fetchTasks() {
    tasks = await loadData("taskstorage");
    
    if (tasks) {
        console.log("Aufgaben erfolgreich geladen:", tasks);
        getTodoData(tasks);
        getInProgressData(tasks);
        getAwaitFeedbackData(tasks);
        getDoneData(tasks);
    } else {
        console.log("Es sind keine Aufgaben vorhanden");
    }

}

  
  function getTodoData(tasks) {
    let task = tasks.filter((t) => t["category"] == "to-do");
    let todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
  
    for (let i = 0; i < task.length; i++) {
      todoContainer.innerHTML += `<p id="task-${task[i].id}" draggable="true" ondragstart="drag(event)">${task[i].title}</p>`;
    }
  }
  
  function getInProgressData(tasks) {
    let inProgress = tasks.filter((t) => t["category"] == "in-progress");
    let inProgressContainer = document.getElementById("in-progress-container");
    inProgressContainer.innerHTML = "";
  
    for (let i = 0; i < inProgress.length; i++) {
      inProgressContainer.innerHTML += `<p id="task-${inProgress[i].id}" draggable="true" ondragstart="drag(event)">${inProgress[i].title}</p>`;
    }
  }
  
  function getAwaitFeedbackData(tasks) {
      let awaitFeedback = tasks.filter((t) => t["category"] == "await-feedback");
      let awaitFeedbackContainer = document.getElementById("await-feedback-container");
      awaitFeedbackContainer.innerHTML = "";
    
      for (let i = 0; i < awaitFeedback.length; i++) {
        awaitFeedbackContainer.innerHTML += `<p id="task-${awaitFeedback[i].id}" draggable="true" ondragstart="drag(event)">${awaitFeedback[i].title}</p>`;
      }
    }
  
    function getDoneData(tasks) {
      let done = tasks.filter((t) => t["category"] == "done");
      let doneContainer = document.getElementById("done-container");
      doneContainer.innerHTML = "";
    
      for (let i = 0; i < done.length; i++) {
        doneContainer.innerHTML += `<p id="task-${done[i].id}" draggable="true" ondragstart="drag(event)">${done[i].title}</p>`;
      }
    }
    
  
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev, category) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let id = data.split('-');
    let convertedId = Number(id[1]);
  
    tasks[convertedId].category = category;
    saveData('taskstorage',tasks);
    if (ev.target.classList.contains("containers")) {
      ev.target.appendChild(document.getElementById(data));
    }
  }
  