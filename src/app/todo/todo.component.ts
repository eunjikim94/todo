import { Component, OnInit, ChangeDetectionStrategy, DoCheck, OnDestroy } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todos, TodoUtils } from '../todo';
import { ActivatedRoute } from '@angular/router';
import { Filter, FilterUtil } from '../filter';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  //기본변경감지기가 변경을 감지하는데 사용하는 전략
})
export class TodoComponent implements OnInit, DoCheck, OnDestroy {
  newTodo = '';
  filter = Filter.ALL;
  text:any;
  snapshot: Todos;
  todos: Todos[];
  currentTodo: Todos;
  filterTodos : Todos[];
  oldText:any;
  checked:boolean;
	completed: number;
	remaining: number;
	allCompleted: boolean;
  // toggle = true;
// status = 'Enable';
  // checkTemp:any = [];
  private routeSubscription: Subscription;



  constructor(private todoService:TodoService, private route:ActivatedRoute) { }


  //create
  add(txtVal: string){
    if(txtVal.trim().length === 0) { return; }
    this.todoService.addTodo(txtVal);
    this.newTodo = '';
   }

  
  ngOnInit(): void {
     this.route.params.subscribe(params=>
      {
        this.filter = FilterUtil.fromString(params['status']);
      });
  }

  //변경감지되고난 이후
  ngDoCheck(): void {
    this.todos = this.todoService.findAll();
		this.filterTodos = this.todos.filter((t) => FilterUtil.accepts(t, this.filter));
    console.log(1);
    console.log(this.filterTodos);
    this.remaining = this.completed = 0;
		this.todos.forEach(t => t.completed ? this.completed++ : this.remaining++);
		this.allCompleted = this.todos.length === this.completed;
    
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();//구독해지
  }
  edit(todo: Todos) {
		this.currentTodo = todo;
		this.snapshot = TodoUtils.copy(todo);
	}

	cancelEdit() {
		TodoUtils.copyProperties(this.snapshot, this.currentTodo);
		this.currentTodo = null;
		this.snapshot = null;
	}

	update(todo: Todos) {
		this.currentTodo = null;
		this.snapshot = null;
		this.todoService.update(todo);
	}

	delete(todo: Todos) {
		this.todoService.delete(todo);
	}

	toggle(todo: Todos) {
		this.todoService.toggle(todo);
	}

	toggleCheckAll(completed: boolean) {
		this.todoService.toggleCheckAll(completed);
	}

	clearCompleted() {
		this.todoService.clearCompleted();
	}


}
