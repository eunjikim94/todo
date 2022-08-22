import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { Init } from './init-todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService  extends Init{

  constructor() {
    super();
    this.load();
   }

   getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  }

  addTodo(newTodo:any) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    // Add New TodoService
    todos.push(newTodo);
    // Set New Todos
    localStorage.setItem('todos', JSON.stringify(todos));
 }

 deleteTodo(todoText:any){
   //  localStorage.removeItem(('todos'));
  let todos = JSON.parse(localStorage.getItem('todos'));

  for(let i = 0; i <todos.length; i++) {
   if(todos[i].text == todoText) {
       todos.splice(i, 1);
       localStorage.setItem('todos', JSON.stringify(todos));
      //  clear전체도만들기
   }
 }

}

     updateTodo(oldText:any, newText:any){  
      let todos = JSON.parse(localStorage.getItem('todos'));
     for(let i = 0; i <todos.length; i++) {
      if(todos[i].text == oldText) {
        todos[i].text = newText;
      }
   }
      // Set New Todos
      localStorage.setItem('todos', JSON.stringify(todos));
   }



}
