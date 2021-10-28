<template>
    <form  @submit.prevent="submit"  class="todo__input">
        <input type="text" placeholder="Enter the todo..." :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)" id="form" />
        <small class="error" id="error"></small>
    </form>  
</template>

<script>
    export default {
        name:'Input',
        props:{
          modelValue: String
        }
    }
</script>

<style scoped>
.todo__input {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.todo__input input {
  min-width: 330px;
  height: 44px;
  border: none;
  outline: none;
  padding: 0 8px;
  font-size: 1.3rem;
  background-color: white;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  border-radius: 8px;
}
.error {
  color: rgb(223, 47, 47);
  text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
}
@media screen and (min-width: 40em) {
  .todo__input input {
    min-width: 500px;
    max-width: 700px;
  }
}

</style>