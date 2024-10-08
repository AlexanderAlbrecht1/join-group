/**
 * 
 * PUBLIC
 * 
 * Initiation of the Add Task in the board
 * 
 * Clears all input fields, t have a clean start
 * Adds some Eventlistenerss 
 * 
 */

function initAddTask() {
    clearTaskInputs();
    initAssignSelector("subtaskPopup");
}


/**
 * 
 * PUBLIC
 * 
 * Closes the PopUp AddTask from Bord
 */
function closeAddTask() {
    document.getElementById("add-task").classList.remove("go");
}


/**
 * 
 * PUBLIC
 * 
 * Opens the PopUp AddTask from Bord
 * Inits the Listener and so on
 */
function openAddTask() {
    document.getElementById("add-task").classList.add("go");
    initAddTask();
}


/**
 * PUBLIC
 * 
 * Clears all inputfields of the PopUp AddTask
 * 
 */
function clearTaskInputs() {
    let card=document.getElementById("add-task-form");
    card.querySelector(".input-subtask").value="";
    card.querySelector("textarea").value="";
    card.querySelector("input[type=date]").value="";
    card.querySelector("#title").value="";
    card.querySelector(".assigned-to-input").value="";
    card.querySelectorAll('input[name="assign"]').forEach(checkbox => checkbox.checked = false);
    card.querySelector(".monogramlist").innerHTML = "";  
    card.querySelector(".category").selectedIndex = 0;
    card.querySelector(".subtask-list").innerHTML = "";
    subtasks = [];
    card.querySelectorAll('input[name="prio"]').forEach(radio => radio.checked = radio.id == "medium" ? true:false)
    setMinDate(card.querySelector("input[type=date]"));
}