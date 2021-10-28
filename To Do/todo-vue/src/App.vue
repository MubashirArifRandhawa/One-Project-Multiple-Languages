<template>
<div class="container"> 
  <Header/>
  <Input v-model="todo" @keyup="getTodo" @update="updateTodos"/>
  <Todos :todos="todos" @update="updateTodos"/>
</div>
</template>

<script>
import Header from "./components/Header.vue"
import Input from "./components/Input.vue"
import Todos from "./components/Todos.vue"
export default {
  name: 'App',
  components: {
   Header,
   Input,
   Todos
  },
  data(){
    return {
      todo: '',
      todos:[]
    }
  },
  methods:{
    getTodo(){
      let todoId = Date.now();
     if(event.keyCode == 13){
       this.todos.push({
         id: todoId,
         task: event.target.value,
         completed: false
       })
     }
      this.saveTodos(this.todos)
     return
    },
    updateTodos(todos){
      this.todos = todos
      this.saveTodos(this.todos)
    },
    saveTodos(todos){
      localStorage.setItem("todos", JSON.stringify(todos))
    },
    },
    created(){
      this.todos = JSON.parse(localStorage.getItem("todos") || '[]')
    },
    
}
</script>

<style>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --backgruond-color: #27cc94;
  --text-color: #bebebe;
  --unchecked-complete: #7b848a;
  --unchecked-complete-hover: #505152;
  --text-todo-color: #fdfdfd;
}
body {
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  background-color: var(--backgruond-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  min-width: 300px;
  min-height: 300px;
  max-width: 800px;
  background-color: #fffffe;
  border-radius: 1rem;
  margin: 10px;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-rows: 92px 110px 3fr;
  padding: 8px 8px;
}
@media screen and (min-width: 40em) {
  .container {
    padding: 2rem 1rem;
    min-width: 650px;
    max-width: 700px;
  }
}
</style>
