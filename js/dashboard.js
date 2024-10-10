async function countTasksByStatus(status) {
   const tasks = await loadData('taskstorage');
   if (!tasks) {
      return 0;
   }
   const taskArray = Object.values(tasks);
   return taskArray.filter((task) => task && task.status === status).length;
}

async function countTasksByPrio(prio) {
   const tasks = await loadData('taskstorage');
   if (!tasks) {
      return 0;
   }
   const taskArray = Object.values(tasks);
   return taskArray.filter((task) => task && task.prio === prio).length;
}

async function countAllTasks() {
   const tasks = await loadData('taskstorage');
   if (!tasks || Object.keys(tasks).length === 0) {
      return 0;
   }
   const taskArray = Object.values(tasks).filter((task) => task !== null);
   return taskArray.length;
}

// async function loadCurrentUserName(currentUserEmail) {
//    const users = await loadData('user');
//    if (!users) {
//       return 'Unknown User';
//    }
//    const userArray = Object.values(users);
//    if (currentUserEmail === 'guest') {
//       return 'Guest';
//    }
//    const user = userArray.find((u) => u.email === currentUserEmail);
//    return user ? user.user : 'Gast';
// }

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

async function updateDashboard() {
   try {
      const todoCount = await countTasksByStatus('to-do');
      const doneCount = await countTasksByStatus('done');
      const urgentCount = await countTasksByPrio('urgent');
      const inProgressCount = await countTasksByStatus('in-progress');
      const awaitingFeedbackCount = await countTasksByStatus('await-feedback');
      const totalCount = await countAllTasks();
      const currentUserEmail = localStorage.getItem('currentUserEmail');
      // const userName = await loadCurrentUserName(currentUserEmail);
      const nextDeadline = await findNextDeadline();

      document.getElementById('todo-count').innerText = todoCount;
      document.getElementById('done-count').innerText = doneCount;
      document.getElementById('urgent-count').innerText = urgentCount;
      document.getElementById('in-progress-count').innerText = inProgressCount;
      document.getElementById('awaiting-feedback-count').innerText =
         awaitingFeedbackCount;
      document.getElementById('total-count').innerText = totalCount;
      
      const deadlineElement = document.querySelector('.stats-text-deadline h3');
      deadlineElement.innerText = nextDeadline
         ? nextDeadline
         : 'No upcoming deadlines';
   } catch (error) {
      console.error('Fehler beim Laden des Dashboards:', error);
   }
}

// window.onload = updateDashboard; // <-- das sollte in init

function init() {
   if (isLogged()) {
      logedUserMonogram();
      greetingUser();
      updateDashboard();
   }
}

function forwardingToBoard() {
   window.location.href = './kanbanboard.html';
}

function greetingUser() {
   salutation();
   let data= JSON.parse(sessionStorage.getItem(PROJECT));  
   let userName = data.username; 
   document.getElementById('userName').innerHTML = '';
   document.getElementById('userName').innerHTML = userName;
}

function salutation() {
   let hello = getGreeting(greetingPos=getGreetingPos());
   document.getElementById('greetingSalutation').innerHTML = '';
   document.getElementById('greetingSalutation').innerHTML = hello;
}

