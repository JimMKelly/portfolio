//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add to local storage
    saveLocalTodos(todoInput.value);
    //Tick button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //Edit text editor
    const editText = document.createElement("INPUT");
    editText.setAttribute("type", "text");
    editText.classList.add("edit-input");
    editText.style.display = "none";
    todoDiv.appendChild(editText);
    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear Todo input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //Edit todo
    if(item.classList[0] === "edit-btn"){
        const todo = item.parentElement;
        const todoText = todo.children[0].innerText;
        var txt = todo.children[0];
        var editBox = todo.children[3];
        
        if(editBox.style.display === "none"){
            editBox.style.display = "block";
            editBox.value = todoText;
            editBox.addEventListener('input', updateValue);
    
            function updateValue(e) {
                txt.innerText = e.target.value;
            }
        }else if(editBox.style.display === "block"){
            editBox.style.display = "none";
            let todos;
            let todoIndex = Array.from(item.parentNode.parentNode.children).indexOf(item.parentNode);
            console.log(todoIndex);
            if(localStorage.getItem("todos") === null){
                todos = [];
            }else {
                todos = JSON.parse(localStorage.getItem("todos"));
            }
            txt = todo.children[0].innerText;
            todos[todoIndex].task = txt;
            localStorage.setItem('todos',JSON.stringify(todos));
        }
    }

    //check mark todo
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        let todoIndex = Array.from(item.parentNode.parentNode.children).indexOf(item.parentNode);

        if(todos[todoIndex].status == 'completed') {
            todos[todoIndex].status = 'uncompleted';
            todo.children[0].style.color = "#ddd";
        }else if(todos[todoIndex].status == 'uncompleted') {
            todos[todoIndex].status = 'completed';
            todo.children[0].style.color = "rgb(27, 143, 33)";
        }
        localStorage.setItem('todos',JSON.stringify(todos));
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //localStorage.clear();
    //Check for local storage 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todoObj = { task: todo, status: "uncompleted"};
    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    //Check for local storage 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo.task;
        newTodo.classList.add("todo-item");
        if(todo.status == 'completed'){
            newTodo.style.color = "rgb(27, 143, 33)";
        }
        todoDiv.appendChild(newTodo);
        //Tick button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Edit button
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit "></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);
        //Edit text editor
        const editText = document.createElement("INPUT");
        editText.setAttribute("type", "text");
        editText.classList.add("edit-input");
        editText.style.display = "none";
        todoDiv.appendChild(editText);
        //Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Is completed?
        if(todo.status == 'completed'){
            todoDiv.classList.add("completed");
        }

        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //Check for local storage 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = todo.children[0].innerText;
    let todoIndex = 0;
    for(let i=0; i < todos.length; i++){
        if(todos[i].task == todoText){
            todoIndex = i;
            break;
        }
    }
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos',JSON.stringify(todos));
}