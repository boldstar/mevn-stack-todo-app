<template>
    <div class="todos">
        <h1>Todos</h1>
        <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
        <div class="todos-list">
            <div v-for="todo in todos" :key="todo.id" class="todo-item">
                <div class="todo-left">
                    <input type="checkbox" v-model="todo.complete">
                    <span>{{ todo.todo }}</span>
                </div>
                <div class="todo-right">
                    <button type="button" class="todo-btn">X</button>
                </div>
            </div>
        </div>
        <div class="todo-actions">
            <button type="btn" class="todo-batch-btn">Batch Action</button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
 name: 'Todos',
 data() {
     return {
         newTodo: ''
     }
 },
 computed: {
     ...mapGetters(['todos'])
 },
 methods: {
     addTodo() {
         if(!this.newTodo) return;
         this.$store.dispatch('addTodo', this.newTodo)
         .then(() => {
             this.newTodo = ''
         })
     }
 },
 created() {
     this.$store.dispatch('getTodos')
 }
}
</script>