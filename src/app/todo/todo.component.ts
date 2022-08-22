import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
// import { Todo } from './do';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  text:any;
  todos:any;
  state = "default";
  oldText:any;


  constructor(private todoService:TodoService) { }


  add(txtVal: string){
    this.text = txtVal.trim();
    console.log(txtVal); 
    if(!txtVal) { return; }
    let newTodo = {
      text: this.text
    };
    this.todos.push(newTodo);
    this.todoService.addTodo(newTodo);
   }

   delete(todoText:any){
    console.log(todoText);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].text === todoText) {
        this.todos.splice(i, 1);
      }
    }

    this.todoService.deleteTodo(todoText);
   }

   edit(todo:any){
    this.oldText = todo.text;
    console.log(this.oldText);

   }
   update(txtUpdateVal:any) {
    this.text = txtUpdateVal;
    console.log(txtUpdateVal);
    console.log(this.oldText);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].text == this.oldText) {
        this.todos[i].text = this.text;
      }
    }

    this.todoService.updateTodo(this.oldText, this.text);
  }
  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
   
  }

}
