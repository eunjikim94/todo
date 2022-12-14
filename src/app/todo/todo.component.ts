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
  todos?: Todos[]=[];
  currentTodo?: Todos;
  filterTodos? : Todos[]=[];
  oldText:any;
  checked:boolean;
	completed: number;
	remaining: number;
	allCompleted: boolean;
  viewPadding: any;
  
  

  private routeSubscription: Subscription;



  constructor(private todoService:TodoService, private route:ActivatedRoute) { 
    
  
  }


  //create
  add(txtVal: string){
    if(txtVal.trim().length === 0) { return; }
    this.todoService.addTodo(txtVal);
    this.newTodo = '';
    // console.log(txtVal);
   }

  
  ngOnInit(): void {
    // this.viewPadding.style.padding = "8";
     this.route.params.subscribe(params=>
      {
        this.filter = FilterUtil.fromString(params['filter']);
        console.log(this.filter);
      });
  }

  //변경감지되면 자동호출, noOnChanges와 다름 많이 사용시 성능 저하
  ngDoCheck(): void {
    this.todos = this.todoService.findAll();
    // filtertodos
		this.filterTodos = this.todos?.filter((t) => FilterUtil.accepts(t, this.filter));
    this.remaining = this.completed = 0;
    // console.log(this.remaining);
		this.todos?.forEach(t => t.completed ? this.completed++ : this.remaining++);
		this.allCompleted = this.todos?.length === this.completed;
    
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
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
