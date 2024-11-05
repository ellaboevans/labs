// Element Selection
const todoForm = document.getElementById("todoForm");
const todosList = document.getElementById("todosList");
const sortAscending = document.getElementById("sort-ascending");
const sortDescending = document.getElementById("sort-descending");
const filterByStatus = document.getElementById("filter-by-status");
const errorMessage = document.getElementById("errorMessage");
const copy = document.getElementById("copy");

// State
let todos = [];

// Initial Render on Page Load
document.addEventListener("DOMContentLoaded", renderTodos);

// Function: Render Todos
function renderTodos(filter = "") {
  // Getting data from local storage
  const todoStore = JSON.parse(localStorage.getItem("todos"));

  todosList.innerHTML = "";

  if (todoStore) todos = todoStore;

  // Filter todos based on selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    todosList.innerHTML = `<h2>No todos found.</h2>`;
    let h2 = todosList.children[0];
    h2.style.fontSize = "30px";
    h2.style.textAlign = "center";

    return;
  }

  filteredTodos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    if (todo.completed) todoItem.classList.add("completed");

    const formatDate = new Date(todo.dueDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    todoItem.innerHTML = `
      <small class='tag'>${todo.completed ? "in-active" : "active"}</small>
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due date: ${formatDate}</p>
      <div class="actions">
        <button class='toggle' onclick="toggleComplete(${index})">
          ${todo.completed ? "Unmark ❎" : "Mark ✔"}
        </button>
        <span>
          <button onclick="editTodo(${index})" class="edit-button" ${
      todo.completed ? "disabled" : ""
    }>Edit</button>
          <button onclick="deleteTodo(${index})" class="delete-button" ${
      todo.completed ? "disabled" : ""
    }>Delete</button>
        </span>
      </div>
    `;

    todosList.appendChild(todoItem);
  });

  // Update Footer Copy
  copy.textContent = `Copyright © ${new Date().getFullYear()} Interactive Todo App. All rights reserved`;
}

// Function: Add New Todo
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;

  if (title === "" || dueDate === "" || description === "") {
    showError("All fields are required.");
    return;
  }

  const newTodo = {
    id: Date.now(),
    title,
    description,
    dueDate,
    completed: false,
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  todoForm.reset();
  document.querySelector("#submit-btn").textContent = "Add Todo";
  renderTodos(filterByStatus.value);
});

// Function: Show Error Message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "inline-block";
  setTimeout(() => (errorMessage.style.display = "none"), 2000);
}

// Function: Delete Todo
function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(filterByStatus.value);
}

// Function: Edit Todo
function editTodo(index) {
  document.getElementById("title").value = todos[index].title;
  document.getElementById("description").value = todos[index].description;
  document.getElementById("dueDate").value = todos[index].dueDate;

  document.querySelector("#submit-btn").textContent = "Update";
  todos.splice(index, 1);
}

// Function: Toggle Completed Status
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(filterByStatus.value);
}

// Function: Sort Todos by Due Date
function sortTodosByDueDate(ascending = true) {
  const todoStore = JSON.parse(localStorage.getItem("todos"));
  todoStore.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });

  localStorage.setItem("todos", JSON.stringify(todoStore));
  todos = todoStore;
  renderTodos(filterByStatus.value);
}

// Event Listeners for Sorting
sortAscending.addEventListener("click", () => sortTodosByDueDate(true));
sortDescending.addEventListener("click", () => sortTodosByDueDate(false));

// Event Listener for Filter by Status
filterByStatus.addEventListener("change", (e) => renderTodos(e.target.value));
