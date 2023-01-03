// Import Class Object
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

// 
let getEle = id => {
    return document.getElementById(id);
}

let todoList = new ToDoList();
let todoComplete = new ToDoList();

// Add ToDo
const addToDo = () => {
    let txtToDo = getEle('newTask').value;
    let ulToDo = getEle('todo');
    if(txtToDo !== ''){
        let td = new ToDo(txtToDo, 'todo');
        todoList.addToDo(td);

        showToDoList(ulToDo);
        getEle('newTask').value = '';
    }
}

getEle('addItem').addEventListener('click', ()=>{
    addToDo();
});

// Function Visible ToDo
const showToDoList = (ulToDo) => {
    ulToDo.innerHTML = todoList.renderToDo();
}

// Function Visible Complete
const showCompleteList = (ulComplete) => {
    ulComplete.innerHTML = todoComplete.renderToDo();
}

// Delete ToDo
const deleteToDo = (e) => {
    let tdIndex = e.currentTarget.getAttribute('data-index');
    let tdStatus = e.currentTarget.getAttribute('data-status');
    
    if(tdStatus === 'todo'){
        todoList.removeToDo(tdIndex);
    
        let ulToDo = getEle('todo');
        showToDoList(ulToDo);
    } else if (tdStatus == 'completed'){
        todoComplete.removeToDo(tdIndex);
        console.log(todoComplete);
    
        let ulComplete = getEle('completed');
        showCompleteList(ulComplete);
    }
}

window.deleteToDo =deleteToDo;

// 
const completeToDo = (e)=> {
    let tdIndex = e.currentTarget.getAttribute('data-index');
    let status = e.currentTarget.getAttribute('data-status');

    let ulToDo = getEle('todo');
    let ulComplete = getEle('completed');

    if(status === 'todo'){
        // slice: start <= index < end
        let completeItem = todoList.toDoList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(completeItem[0].textToDo, 'completed');

        moveToDo(todoList, todoComplete, objToDo, tdIndex);
    } else if (status === 'completed'){
        let completeItem = todoComplete.toDoList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(completeItem[0].textToDo, 'completed');

        moveToDo(todoComplete, todoList, objToDo, tdIndex);
    }

    showToDoList(ulToDo);
    showCompleteList(ulComplete);

}

window.completeToDo = completeToDo;


const moveToDo = (depart, arrival, obj, idx) => {
    // Remove todo from depart
    depart.removeToDo(idx);

    // Add todo to arrival
    arrival.addToDo(obj);
}

const sortASC = (e)=>{
    let ulTodo = getEle('todo');
    todoList.sortToDo(false);
    showToDoList(ulTodo);
}

window.sortASC = sortASC;

const sortDES = (e)=>{
    let ulTodo = getEle('todo');
    todoList.sortToDo(true);
    showToDoList(ulTodo);
}

window.sortDES = sortDES;