import { Component } from '@angular/core';
import { Todo } from './interfaces/todo';
import { TodoServiceService } from './todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: Array<Todo>;
  constructor(private _todoService: TodoServiceService) {
    this.todos = [];
  }
  ngDoCheck(): void {
    this.todos = this._todoService.getTodos();
  }
  ngOnInit(): void {
    this.todos = this._todoService.getTodos();
  }
}
