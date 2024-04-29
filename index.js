// use selectors
const todoInputs = document.querySelector(".todo-inputs");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");
const updateOptions = document.querySelectorAll(".todo");
const selecteddelete = document.querySelector(".selected-delete");
const allSelected = document.querySelector(".todo-button");

//event listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodos);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
selecteddelete.addEventListener("click", selecteddeleted);
allSelected.addEventListener("dblclick", allSelectedButton);

let value;
function handleClick(e) {
  e.preventDefault();
  value = e.target.value;
}

function handleValue(e) {
  e.preventDefault();
  let currentTag = e.target;
  console.log("onchange",e.target);
  if(e.target.value === "") {
    currentTag.value = value;
  }
}

function addTodos(e) {
  const index = todoList.childElementCount;
  e.preventDefault();
  const todoDiv = document.createElement("li");
  todoDiv.innerHTML = `
    <input type="checkbox" id="box-${index+1}" />  
    <label class="todo-item" for="box-${index+1}">
      <input type="text" onclick="handleClick(event)" onchange="handleValue(event)" value="${todoInputs.value}" />
      <span class="trash-btn"></span>
    </label>
  `;
  todoDiv.classList.add("todo");
  if(!todoInputs.value == ""){
    todoList.appendChild(todoDiv);
  }
  todoInputs.value = "";
  checkEmptyTodoList();
  updateTotalUnchecked();
}

function selecteddeleted() {
  let allItems = [...todoList.childNodes];
  const filteredItems = allItems.filter((item) => item.classList.contains("completed"));
  filteredItems.forEach((item) => todoList.removeChild(item));
  checkEmptyTodoList();
}
function checkEmptyTodoList() {
  console.log(todoList.childElementCount);
  if (todoList.childElementCount === 0) {
    const todoDiv = document.createElement("p");
    todoDiv.classList.add("no-data");
    todoDiv.innerHTML = `
      <span>No Data Found</span>
    `;
    const showItem = document.querySelector(".show-item");
    console.log(showItem);
    showItem.innerText = `0 item left`;
    todoList.appendChild(todoDiv);
  } else {
    const p = todoList.childNodes[0];
    if (p.classList.contains("no-data")) {
      todoList.removeChild(p);
    }
  }
}


function focusedInputBlur(e){
  console.log(e.target.value);
}

function allSelectedButton() {
  let checkboxes = todoList.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
      checkbox.closest('li').classList.add("completed");
    } else {
      checkbox.closest('li').classList.remove("completed");
    }
  });
  updateTotalUnchecked();
}

function getTodos() {
  let todos = ["Todo 1", "Todo 2", "Todo 3"];
  // 
  todos.forEach((todo , index) => {
    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
      <input type="checkbox" id="box-${index+1}"/>  
    `;
    const newTodo = document.createElement("label");
    const inputTag = document.createElement("input");
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("trash-btn");
    deleteSpan.innerHTML = "";
    inputTag.setAttribute("type", "text");
    inputTag.value = todo;
    inputTag.onclick = handleClick;
    inputTag.onchange = handleValue;
    newTodo.classList.add("todo-item");
    newTodo.setAttribute("for",`box-${index+1}`);
    newTodo.appendChild(inputTag);
    newTodo.appendChild(deleteSpan);
    todoDiv.appendChild(newTodo);
    todoList.appendChild(todoDiv);
  });
  updateTotalUnchecked();
  checkEmptyTodoList();
}

function updateTotalUnchecked(){
  const unchackedItems = Array.from(todoList.childNodes);
  const showItem = document.querySelector(".show-item");
  const filteredItems = unchackedItems.filter((item) => item.classList.contains("completed") == false);
  showItem.innerText = `${filteredItems.length} item left`;
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;
  const id = e.target.id;
  const index = id.split("-")[1]; 
  let alltodlist = Array.from(todoList.childNodes);
  
  if (item.classList.contains("trash-btn")) {
    alltodlist.slice(Number(index - 1), 1);
    todo.parentElement.remove();
  }

  if (item.classList.contains("todo-item")) {
    todo.classList.toggle("completed");
  }
  updateTotalUnchecked();
  checkEmptyTodoList();
}

function filterTodo(e) {
  const todos = Array.from(todoList.childNodes);
  const buttons = Array.from(document.querySelectorAll('.filter-todos-btn'));
  buttons.forEach(button => {
      button.classList.remove("active");
  });
  e.target.classList.add("active");
  todos.forEach(todo => {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex";
        e.target.classList.add("active");
        break;
      case "Completed":
        todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
        e.target.classList.add("active");
        break;
      case "Uncompleted":
        todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
        e.target.classList.add("active");
        break;
    }
  });
}


