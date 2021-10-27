import { Injectable } from '@angular/core';
import { Todo } from './interfaces/todo';
@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  todos: Array<Todo>;
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }
  addTodo(todo: Todo) {
    this.todos.push({
      id: todo.id,
      todo: todo.todo,
      completed: todo.completed,
    });
  }
  updateTodos(todos: Array<Todo>) {
    this.todos = todos;
    this.saveToLocalStorage(this.todos);
  }
  saveToLocalStorage(todos: Array<Todo>) {
    return localStorage.setItem('todos', JSON.stringify(todos));
  }
  getTodos() {
    return this.todos;
  }
  completeTodo(id: any) {
    this.todos.forEach((item) => {
      if (item.id == id) {
        if (!item.completed) {
          item.completed = true;
        } else {
          item.completed = false;
        }
      }
    });
    this.updateTodos(this.todos);
  }
}
