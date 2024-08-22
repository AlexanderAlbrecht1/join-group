let tasks = [];

function addNewTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignedTo = document.getElementById('assigned-to');
    let dueDate = document.getElementById('due-date');
    let selectedPrio = document.querySelector('input[name="prio"]:checked');
    let category = document.getElementById('category');


    tasks.push({title: title.value, description: description.value, assignedTo: assignedTo.value, dueDate: dueDate.value, prio: selectedPrio.value, category: category.value});

}

function clearTaskInputs() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('assigned-to').value = "";
    document.getElementById('due-date').value = "";
    document.querySelector('input[name="prio"]:checked').value = "";
    document.getElementById('category').value = "";
}