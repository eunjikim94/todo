import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Init } from './init-todo';
import { Todos } from './todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService{

  id =  0;
  todos: Todos[] = [];
  private static KEY = 'todo';


  constructor() {
    // super();
    // this.load();
    this.storage();
    if (this.todos.length > 0) {
			this.id = this.todos[this.todos.length - 1].id;
		}
   }

   findAll() {
		return this.todos;
	}

   //create
  addTodo(txtVal: string) : Todos{
    txtVal = txtVal.trim();
    //  if (txtVal.length === 0){
    //     return;
    //   }
    const newTodo = new Todos(++this.id, txtVal);
    this.todos.push(newTodo);

    console.log(this.todos);
    this.save();
    return newTodo;
  }
  update(todo: Todos) {
		todo.title = todo.title.trim();
		if (todo.title.length === 0) {
			this.delete(todo);
		}
		this.save();
	}

	delete(todo: Todos) {
		this.todos = this.todos.filter((t) => t !== todo);
		this.save();
	}

	toggle(todo: Todos) {
		// console.log(todo.completed);
		todo.completed = !todo.completed;
		this.save();
	}


	toggleCheckAll(completed: boolean) {
		this.todos.forEach((t) => t.completed = completed);
		this.save();
	}

	clearCompleted() {
		//check -> true x -> false 출력
		this.todos = this.todos.filter((t) => !t.completed);
		console.log(this.todos);
		this.save();
	}

	remaining() {
		return this.todos
			.filter(t => !t.completed)
			.length;
	}

	completed() {
		return this.todos
			.filter(t => t.completed)
			.length;
	}



//localstorage 저장 키값, 값
private storage(){
  const storageValue = localStorage.getItem(TodoService.KEY);
  try{
    this.todos = JSON.parse(storageValue);
  }catch(ignore){
    this.todos  = [];
  }
}

private save(): void{
  localStorage.setItem(TodoService.KEY, JSON.stringify(this.todos));

}

}
