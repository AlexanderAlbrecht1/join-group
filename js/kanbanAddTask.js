function initAddTask() {
    // selector=document.getElementById("add-task").querySelector(".selectors");
    // selector.innerHTML=kanbanEditSelectors(); 
    initAssignSelector("subtaskPopup");
    addToggleSelectListener("subtask-popup-details");


}

function closeAddTask() {
    document.getElementById("add-task").classList.remove("go");
}


function openAddTask() {
    document.getElementById("add-task").classList.add("go");
    initAddTask();
}