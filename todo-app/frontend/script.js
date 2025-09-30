const api = 'http://localhost:5000/todos';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

async function fetchTodos() {
  const res = await fetch(api);
  const todos = await res.json();
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.task;
    li.className = todo.done ? 'done' : '';
    li.onclick = () => toggleTodo(todo._id);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = (e) => { e.stopPropagation(); deleteTodo(todo._id); };
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const task = taskInput.value;
  if (!task) return;
  await fetch(api, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ task }) });
  taskInput.value = '';
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${api}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

async function toggleTodo(id) {
  await fetch(`${api}/${id}`, { method: 'PATCH' });
  fetchTodos();
}

addBtn.onclick = addTodo;
window.onload = fetchTodos;

