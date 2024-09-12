function getTodoData(tasks) {
    console.log(tasks)
    let task = tasks.filter((t) => {
       if (t) {
          if ( t['status'] == 'to-do') {
             return t;
          }
       }
    });
    let todoContainer = document.getElementById('todo-container');
    todoContainer.innerHTML = '';
 
    for (let i = 0; i < task.length; i++) {
       todoContainer.innerHTML += `<p id="task-${task[i].id}" draggable="true" ondragstart="drag(event)">${task[i].title}</p>`;
    }
 }
 
 function getInProgressData(tasks) {
    let inProgress = tasks.filter((t) => {
       if (t) {
          if ( t['status'] == 'in-progress') {
             return t;
          }
       }
    });
    let inProgressContainer = document.getElementById('in-progress-container');
    inProgressContainer.innerHTML = '';
 
    for (let i = 0; i < inProgress.length; i++) {
       inProgressContainer.innerHTML += `<p id="task-${inProgress[i].id}" draggable="true" ondragstart="drag(event)">${inProgress[i].title}</p>`;
    }
 }
 
 function getAwaitFeedbackData(tasks) {
    let awaitFeedback = tasks.filter((t) => {
       if (t) {
          if (t['status'] == 'await-feedback') {
             return t
          }
       }
    });
    let awaitFeedbackContainer = document.getElementById(
       'await-feedback-container'
    );
    awaitFeedbackContainer.innerHTML = '';
 
    for (let i = 0; i < awaitFeedback.length; i++) {
       awaitFeedbackContainer.innerHTML += `<p id="task-${awaitFeedback[i].id}" draggable="true" ondragstart="drag(event)">${awaitFeedback[i].title}</p>`;
    }
 }
 
 function getDoneData(tasks) {
    let done = tasks.filter((t) => {
       if (t) {
         if ( t['status'] == 'done') {
          return t
         }
       }
    });
    let doneContainer = document.getElementById('done-container');
    doneContainer.innerHTML = '';
 
    for (let i = 0; i < done.length; i++) {
       doneContainer.innerHTML += `<p id="task-${done[i].id}" draggable="true" ondragstart="drag(event)">${done[i].title}</p>`;
    }
 }
 