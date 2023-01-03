export class ToDoList{
    constructor(){
        this.lstToDo = [];
    }

    addToDo(todo){
        this.lstToDo.push(todo);
    }

    renderToDo(){
        let content = this.lstToDo.reduceRight((txt ,ele) =>{
            let temp = `
                <li>
                    <span>${ele.txtToDo}</span>
                    <div class="buttons">
                        <button class="remove">
                           <i class="fa fa-trash-alt"></i>
                        </button>

                        <button class="complete">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return txt + temp;
        }, '');
    }
}