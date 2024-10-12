/**
 * 
 * is executed when the page loads, checks whether and which user is logged in, generates the user monogram, the welcome text and updates the dashboard
 * 
 */

function init() {
   if (isLogged()) {
      logedUserMonogram();
      greetingUser();
      updateDashboard();
   }
}

/**
 * 
 * checks which user is logged in and generates the personal greeting
 * 
 */

function greetingUser() {
   salutation();
   let data= JSON.parse(sessionStorage.getItem(PROJECT));  
   let userName = data.username; 
   document.getElementById('userName').innerHTML = '';
   document.getElementById('userName').innerHTML = userName;
}

/**
 * 
 * generates different greetings depending on the time of day
 * 
 */

function salutation() {
   let hello = getGreeting(greetingPos=getGreetingPos());
   document.getElementById('greetingSalutation').innerHTML = '';
   document.getElementById('greetingSalutation').innerHTML = hello;
}

/**
 * 
 * creates and updates each tile, will give an error if loading is not possible
 * 
 */

async function updateDashboard() {
   try {
      createToDoCount();
      createDoneCount();
      createUrgentCount();
      createInProgressCount();
      createAwaitingFeedbackCount();
      createTotalCount();
      createNextDeadline();
      const deadlineElement = document.querySelector('.urgentDate');
   } catch (error) {
      console.error('Fehler beim Laden des Dashboards:', error);
   }
}

/**
 * 
 * creates the ToDo tasks counter value HTML
 * 
 */

async function createToDoCount() {
   const todoCount = await countTasksByStatus('to-do');
   document.getElementById('todo-count').innerText = todoCount;
}

/**
 * 
 * creates the Done tasks counter value HTML
 * 
 */

async function createDoneCount() {
   const doneCount = await countTasksByStatus('done');
   document.getElementById('done-count').innerText = doneCount;
}

/**
 * 
 * creates the urgent tasks counter value HTML
 * 
 */

async function createUrgentCount() {
   const urgentCount = await countTasksByPrio('urgent');
   document.getElementById('urgent-count').innerText = urgentCount;
}

/**
 * 
 * creates the on progress tasks counter value HTML
 * 
 */

async function createInProgressCount() {
   const inProgressCount = await countTasksByStatus('in-progress');
   document.getElementById('in-progress-count').innerText = inProgressCount;
}

/**
 * 
 * creates the awaiting feedback tasks counter value HTML
 * 
 */

async function createAwaitingFeedbackCount() {
   const awaitingFeedbackCount = await countTasksByStatus('await-feedback');
   document.getElementById('awaiting-feedback-count').innerText = awaitingFeedbackCount;
}

/**
 * 
 * creates the total number of tasks counter value HTML
 * 
 */

async function createTotalCount() {
   const totalCount = await countAllTasks();
   document.getElementById('total-count').innerText = totalCount;
}

/**
 * 
 * creates the next deadline value HTML
 * 
 */

async function createNextDeadline() {
   const nextDeadline = await findNextDeadline();
   deadlineElement.innerText = nextDeadline ? nextDeadline : 'No upcoming deadlines';
}

/**
 * redirects the user to the kanban board when clicked
 * 
 */

function forwardingToBoard() {
   window.location.href = './kanbanboard.html';
}

/**
 * 
 * filters tasks by status and returns the amount per status
 * 
 * @param {string} status 
 * @returns amount of tasks per status 
 */

async function countTasksByStatus(status) {
   const tasks = await loadData('taskstorage');
   if (!tasks) {
      return 0;
   }
   const taskArray = Object.values(tasks);
   return taskArray.filter((task) => task && task.status === status).length;
}

/**
 * 
 * filters tasks by priority status and returns the amount per status
 * 
 * @param {string} prio 
 * @returns amount of tasks per status
 */

async function countTasksByPrio(prio) {
   const tasks = await loadData('taskstorage');
   if (!tasks) {
      return 0;
   }
   const taskArray = Object.values(tasks);
   return taskArray.filter((task) => task && task.prio === prio).length;
}

/**
 * 
 * count all tasks in kanbanbord
 * 
 * @returns number of tasks
 */

async function countAllTasks() {
   const tasks = await loadData('taskstorage');
   if (!tasks || Object.keys(tasks).length === 0) {
      return 0;
   }
   const taskArray = Object.values(tasks).filter((task) => task !== null);
   return taskArray.length;
}

async function findNextDeadline() {
   const tasks = await loadObjectData('taskstorage');
   if (!tasks) return null;
   const taskArray = Object.values(tasks).filter(
      (task) => task && task.dueDate
   );
   const today = new Date();
   const upcomingTask = taskArray
      .map((task) => ({
         ...task,
         dueDate: new Date(task.dueDate),
      }))
      .filter((task) => task.dueDate >= today)
      .sort((a, b) => a.dueDate - b.dueDate)[0];
   return upcomingTask
      ? upcomingTask.dueDate.toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
        })
      : null;
}





