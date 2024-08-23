let tasks = [];

function addNewTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignedTo = Array.from(document.querySelectorAll('input[name="assign"]:checked'))
                    .map(checkbox => checkbox.value);
    let dueDate = document.getElementById('due-date');
    let selectedPrio = document.querySelector('input[name="prio"]:checked');
    let category = document.getElementById('category');

    tasks.push({title: title.value, description: description.value, assignedTo: assignedTo, dueDate: dueDate.value, prio: selectedPrio.value, category: category.value});

}


function clearTaskInputs() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.querySelectorAll('input[name="assign"]').forEach(checkbox => checkbox.checked = false);
    document.getElementById('due-date').value = "";
    document.querySelectorAll('input[name="prio"]').forEach(radio => radio.checked = false);
    document.getElementById("category").selectedIndex = 0;
}