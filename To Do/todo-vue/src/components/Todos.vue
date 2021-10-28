<template>
      <!-- [ngClass]="{todo.completed ? 'completed-task' : 'remove-task'}" -->
  <div  >
    <div class="show__all_todos" id="all_todos"  v-for="todo in todos" :key="todo.id">
      <div :id="todo.id" class="single-todo">
        <div>
          <p :class="todo.completed ? 'completed-task' : 'remove-task'"> {{todo.task}} </p>
        </div>
        <div class="options">
          <div class="completed" @click="completedTodo(todo.id)"></div>
          <img
          @click="deleteTask(todo.id)"
          src="../assets/delete.png"
          class="delete-image"
          alt=""
          />
        </div>
      </div>
    </div>
    </div>
</template>

<script>
    export default {
        name:'Todos',
        props:["todos"],
        data(){
          return{
            completed: false
          }
        },
        methods:{
          completedTodo(id){
            this.todos.forEach(todo => {
              if(todo.id == id){
                if(todo.completed == false){
                  todo.completed = true
                }
                else{
                  todo.completed = false
                }
              }
            })
            this.$emit('update', this.todos)
          },
          deleteTask(id){ 
            this.$emit("update", this.todos.filter(todo => todo.id != id))
          }
        }
    }
</script>

<style scoped>
.single-todo {
  color: var(--unchecked-complete);
  min-width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  position: relative;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 6px 0;
  padding: 10px;
  cursor: pointer;
}
.single-todo:hover {
  opacity: 1;
  transition: all 250ms linear;
  border: 1px solid rgb(138, 138, 138);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 0.4);
}
.options {
  display: flex;
  align-items: center;
  justify-content: center;
}

.completed {
  background-color: var(--unchecked-complete);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;
}
.completed:hover {
  background-color: var(--unchecked-complete-hover);
  transform: scale(1.2);
  transition: all 500ms;
}
.delete-image {
  width: 45px;
  margin: 0 0.5rem;
  cursor: pointer;
}
.checked {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--backgruond-color);
}
.delete-image:hover {
  animation: shake 1s linear;
}
.completed-task {
  position: relative;
  flex: 5;
  height: 100%;
  text-decoration: line-through;
  color: var(--text-color);
}

.remove-task {
  position: relative;
  flex: 5;
  height: 100%;
  text-decoration: none;
  color: black;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(30deg) scale(1.2);
  }
  50% {
    transform: rotate(-30deg) scale(1.2);
  }
  75% {
    transform: rotate(30deg) scale(1.2);
  }
  100% {
    transform: rotate(0deg);
  }
}

</style>