import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { ShowTodosComponent } from './show-todos/show-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoInputComponent,
    ShowTodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
