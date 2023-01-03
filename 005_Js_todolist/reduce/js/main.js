import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

let listToDo = new ToDoList();

let getEle = (id) => {
    return document.getElementById(id);
}

// Show 
let visibleToDo = ()=>{
    let txtInput = getEle('newTask').value;
    if(txtInput.trim() !== ''){
        let todo = new ToDo(txtInput, 'todo');
        listToDo.addToDo(todo);
    }
}

getEle('addItem').addEventListener('click', ()=>{
    visibleToDo();
});
