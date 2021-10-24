const input = document.querySelector("#form");
const today = document.querySelector("#today");
const allTodos = document.querySelector("#all_todos");
const completedTask = document.querySelector("#completed-task") || null;
const deleteTask = document.querySelector("#delete-task") || null;
const todo = JSON.parse(localStorage.getItem("todos")) || null;
const error = document.querySelector("#error");

// Todo Component
function Todo(value = "John Doe", id = null, todos = null, completed = null) {
  const outerDiv = document.createElement("div");
  outerDiv.classList.add("single-todo");
  const todoId = Date.now();

  const paraWrappingDiv = document.createElement("div");
  const paragraph = document.createElement("p");
  const checkedDiv = document.createElement("div");
  const divAfterPara = document.createElement("div");
  divAfterPara.className = "options";
  paragraph.textContent = value;

  if (todos === null) {
    paragraph.classList.add("remove-task");
    checkedDiv.className = "completed";
    checkedDiv.setAttribute("id", "completed-task");
    outerDiv.id = todoId;
  } else {
    if (completed) {
      paragraph.classList.add("completed-task");
      checkedDiv.className = "checked";
      checkedDiv.setAttribute("id", "completed-task");
    } else {
      paragraph.classList.add("remove-task");
      checkedDiv.className = "completed";
      checkedDiv.setAttribute("id", "completed-task");
    }
    outerDiv.id = id;
  }
  const imageTag = document.createElement("img");
  imageTag.src = "./assets/delete.png";
  imageTag.alt = "Delete Image";
  imageTag.classList.add("delete-image");
  imageTag.setAttribute("id", "delete-task");

  paraWrappingDiv.appendChild(paragraph);
  divAfterPara.appendChild(checkedDiv);
  divAfterPara.appendChild(imageTag);
  outerDiv.appendChild(paraWrappingDiv);
  outerDiv.appendChild(divAfterPara);

  return { outerDiv, todoId };
}
function completeTodo(event) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  const todoId = event.target.parentElement.parentElement.id;
  const paragraph =
    event.target.parentElement.previousElementSibling.children[0];
  if (event.target.className.includes("completed")) {
    paragraph.classList.remove("remove-task");
    paragraph.classList.add("completed-task");
    event.target.classList.remove("completed");
    event.target.classList.add("checked");
    todos.forEach((item) => {
      if (item.id === parseInt(todoId)) {
        item.completed = true;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (event.target.className.includes("checked")) {
    paragraph.classList.remove("completed-task");
    paragraph.classList.add("remove-task");
    event.target.classList.add("completed");
    event.target.classList.remove("checked");
    todos.forEach((item) => {
      if (item.id == todoId) {
        item.completed = false;
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
function deleteTodo(event) {
  const todo = event.target.parentElement.parentElement;
  const todoId = todo.id;
  todo.remove();
  let todos = JSON.parse(localStorage.getItem("todos"));
  let newTodos = todos.filter((item) => item.id != todoId);
  return newTodos;
}
// to check if complete or delete button is clicked
function selectedTodo(event) {
  if (event.target.id === "completed-task") {
    completeTodo(event);
  } else if (event.target.id === "delete-task") {
    const todos = deleteTodo(event);
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    return;
  }
}
// will run when enter is pressed in input
function addTodo(event) {
  const keyPressed = event.which || event.keyCode;
  if (keyPressed == 13 && event.target.value != 0) {
    error.innerText = "";
    let value = event.target.value;
    if (typeof value === undefined || value.length <= 0) {
      allTodos.appendChild(Todo());
      return;
    }
    const { outerDiv, todoId } = Todo(value);

    todo.push({
      id: todoId,
      task: value,
      completed: false,
    });
    localStorage.setItem("todos", JSON.stringify(todo));
    event.target.value = "";
    allTodos.appendChild(outerDiv);
  } else if (event.target.value == 0) {
    error.innerText = "Field is required";
  }
  return;
}
// set Date
function showTodayDate() {
  // Days Array
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "Febuarary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  today.children[0].innerText = days[date.getDay()];
  const dateToday = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const fullDate = `${month} ${dateToday}, ${year}`;
  today.children[1].innerText = fullDate;
}
// When page is reloaded the todos will be displayed
function showAllTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || null;
  if (todos !== null) {
    todos.forEach((item) => {
      const { outerDiv, todoId } = Todo(
        item.task,
        item.id,
        todos,
        item.completed
      );
      allTodos.appendChild(outerDiv);
    });
  }
  showTodayDate();
}
// Input keyup listener will execute addTodo when enter is pressed
input.addEventListener("keyup", addTodo);
// container of all todos
allTodos.addEventListener("click", selectedTodo);
// browser refresh and page load event listener
window.addEventListener("load", showAllTodos);
