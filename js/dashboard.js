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

async function loadCurrentUserName(currentUserEmail) {
   const users = await loadData('user');
   if (!users) {
      return 'Unknown User';
   }
   const userArray = Object.values(users);
   const user = userArray.find((u) => u.email === currentUserEmail);
   return user ? user.user : 'Gast';
}

async function updateDashboard() {
   try {
      const todoCount = await countTasksByStatus('to-do');
      const doneCount = await countTasksByStatus('done');
      const urgentCount = await countTasksByPrio('urgent');
      const inProgressCount = await countTasksByStatus('in-progress');
      const awaitingFeedbackCount = await countTasksByStatus(
         'await-feedback'
      );
      const totalCount = await countAllTasks();
      const userName = await loadCurrentUserName();

      document.getElementById('todo-count').innerText = todoCount;
      document.getElementById('done-count').innerText = doneCount;
      document.getElementById('urgent-count').innerText = urgentCount;
      document.getElementById('in-progress-count').innerText = inProgressCount;
      document.getElementById('awaiting-feedback-count').innerText =
         awaitingFeedbackCount;
      document.getElementById('total-count').innerText = totalCount;
      document.getElementById('user-name').innerText = userName;
   } catch (error) {
      console.error('Fehler beim Laden des Dashboards:', error);
   }
}

window.onload = updateDashboard;
