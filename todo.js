const API_URL = 'http://127.0.0.1:5000/tasks';
 
function createCard(task) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = task.id;
 
    const text = document.createElement('span');
    text.textContent = task.text;
    text.className = 'task-text';
 
    const actions = document.createElement('div');
    actions.className = 'actions';
 
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => editTask(card, task);
 
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Deletar';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => deleteTask(task.id);
 
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(text);
    card.appendChild(actions);
    return card;
}
 
function renderTasks(tasks) {
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';
    tasks.forEach(task => {
        tasksDiv.appendChild(createCard(task));
    });
}
 
async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTasks(data);
}
 
async function addTask(text) {
    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
    });
    fetchTasks();
}
 
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
    fetchTasks();
}
 
function editTask(card, task) {
    const textSpan = card.querySelector('.task-text');
    const actions = card.querySelector('.actions');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';
    card.insertBefore(input, textSpan);
    card.removeChild(textSpan);
 
    actions.innerHTML = '';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Salvar';
    saveBtn.className = 'save';
    saveBtn.onclick = async () => {
        await fetch(`${API_URL}/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: input.value})
        });
        fetchTasks();
    };
    actions.appendChild(saveBtn);
}
 
document.getElementById('task-form').onsubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById('task-input');
    if (input.value.trim()) {
        addTask(input.value.trim());
        input.value = '';
    }
};
 
window.onload = fetchTasks;