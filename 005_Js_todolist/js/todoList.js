export class ToDoList {
    constructor() {
        this.toDoList = [];
    }
    addToDo(toDo) {
        this.toDoList.push(toDo);
    }

    removeToDo(idx) {
        this.toDoList.splice(idx, 1);
    }

    sortToDo(isDESC) {
        this.toDoList.sort((todo, nextTodo) => {
            const txtA = todo.textToDo.toLowerCase();
            const txtB = nextTodo.textToDo.toLowerCase();
            //ASC
            return txtB.localeCompare(txtA);
        });
        if (isDESC) {
            this.toDoList.reverse();
        }
    }

    renderToDo() {
        let content = this.toDoList.reduceRight((txt, ele, index) => {
            let temp = `
                <li>
                    <span>${ele.textToDo}</span>
                    <div class="buttons"> 
                        <button class="remove" data-index="${index}" data-status="${ele.status}" onclick="deleteToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>

                        <button class="complete" data-index="${index}" data-status="${ele.status}" onclick="completeToDo(event)">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return txt + temp;
        }, '');

        return content;
    }
}