let tasks =  [];

async function addNewTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignedTo = Array.from(document.querySelectorAll('input[name="assign"]:checked'))
                    .map(checkbox => checkbox.value);
    let dueDate = document.getElementById('due-date');
    let selectedPrio = document.querySelector('input[name="prio"]:checked');
    let category = document.getElementById('category');
    tasks=await loadData('taskstorage');
    tasks.push({id: tasks.length, title: title.value, description: description.value, assignedTo: assignedTo, dueDate: dueDate.value, prio: selectedPrio.value, category: category.value});
    saveData('taskstorage', tasks);
    clearTaskInputs();
    
}


function clearTaskInputs() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.querySelectorAll('input[name="assign"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('due-date').value = "";
    document.querySelectorAll('input[name="prio"]').forEach(radio => radio.checked = false);
    document.getElementById("category").selectedIndex = 0;
}


// Hinweis miot document.getElemebtById.syle.display == "none" oder "block" abfragen 
// dann spart man sich die globale Variable

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