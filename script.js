document.addEventListener('DOMContentLoaded', loadTodos);

function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title === '' || description === '') {
        alert('Please enter both title and description');
        return;
    }

    const todo = {
        id: Date.now(),
        title,
        description,
        completed: false
    };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    appendTodoToDOM(todo);
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function appendTodoToDOM(todo) {
    const todoList = document.getElementById('todo-list');

    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.id = todo.id;

    const text = document.createElement('span');
    text.textContent = `${todo.title}: ${todo.description}`;

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.onclick = () => toggleComplete(todo.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.onclick = () => deleteTodo(todo.id);

    li.appendChild(text);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function toggleComplete(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(todos));

    const todoItem = document.getElementById(id);
    todoItem.classList.toggle('completed');
}

function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));

    const todoItem = document.getElementById(id);
    todoItem.remove();
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => appendTodoToDOM(todo));
}
