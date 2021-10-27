import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoServiceService } from '../todo-service.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent implements OnInit {
  @Input() todos: any;
  constructor(private _todoService: TodoServiceService) {}
  ngOnInit(): void {}
  addTodo(todo: any, event: any) {
    let todoId = Date.now();
    if (event.keyCode === 13) {
      this.todos.push({
        id: todoId,
        todo: todo.value,
        completed: false,
      });
      this._todoService.updateTodos(this.todos);
    }
  }
}
