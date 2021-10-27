import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.css'],
})
export class ShowTodosComponent implements OnInit {
  @Input() todos: any;
  constructor(private _todoService: TodoServiceService) {}
  ngOnInit(): void {}
  completed(event: any, task: any) {
    let id = task.parentElement.parentElement.id;
    if (event.target.className === 'completed') {
      event.target.classList.remove('completed');
      event.target.classList.add('checked');
    } else {
      event.target.classList.add('completed');
      event.target.classList.remove('checked');
    }

    if (task.className === 'remove-task') {
      task.classList.remove('remove-task');
      task.classList.add('completed-task');
    } else {
      task.classList.add('remove-task');
      task.classList.remove('completed-task');
    }
    this._todoService.completeTodo(id);
  }
  delete(taskId: any) {
    let newTodos = this.todos.filter((item: any) => item.id != taskId);
    this.todos = newTodos;
    this._todoService.updateTodos(this.todos);
  }
}
