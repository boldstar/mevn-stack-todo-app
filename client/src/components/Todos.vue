<template>
    <div class="todos">
        <h1 class="title">Todos</h1>
        <input type="text" class="todo-input" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
        <div class="todos-list">
            <transition-group :key="todos.length" name="slide" tag="div">
                <div v-for="(todo, index) in todos" :key="index" class="todo-item">
                    <div class="todo-left">
                        <input type="checkbox" @click="selectTodo(todo._id)" v-if="batch">
                        <input type="text" class="input-text" :class="{'strike-through': todo.complete, 'input-focus': todoBlur && todoSelected == todo._id}" v-model="todo.todo" @dblclick="editTodo(todo._id, index)" @blur="removeFocus" @keyup.enter="saveEdit(index)" ref="input">
                    </div>
                    <div class="todo-right">
                        <button type="button" class="todo-complete-btn" @click="completeTodo(todo._id)"><i class="fas fa-check" v-if="!todo.complete"></i><i class="fas fa-undo-alt" v-else></i></button>
                        <button type="button" class="todo-edit-btn" @click="editTodo(todo._id, index)" v-if="!todo.complete"><i class="far fa-edit"></i></button>
                        <button type="button" class="todo-btn" @click="deleteTodo(todo._id)">X</button>
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="todo-actions">
            <div>
                <button type="btn" class="todo-batch-btn" @click="batch = !batch">Batch Action</button>
            </div>
            <div>
                <button type="btn" class="todo-batch-btn" @click="completeBatch">Complete</button>
                <button type="btn" class="todo-batch-btn delete-batch-btn" @click="deleteBatch">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
name: 'Todos',
data() {
    return {
        newTodo: '',
        batch: false,
        batchTodos: [],
        todoBlur: false,
        todoSelected: null
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
    },
    deleteTodo(todo) {
    this.$store.dispatch('deleteTodo', todo)
    },
    selectTodo(todo) {
    if(this.batchTodos.includes(todo)) {
        const index = this.batchTodos.findIndex(todo => todo._id == todo)
        this.batchTodos.splice(index, 1)
    } else {
        this.batchTodos.push(todo)
    }
    },
    editTodo(todo, index) {
        this.todoBlur = true
        this.todoSelected = todo
        this.$refs.input[index].focus()
    },
    removeFocus() {
        this.todoBlur = false
        this.todoSelected = null
    },
    saveEdit(index) {
        this.$store.dispatch('updateTodo', this.todos[index])
        .then(() => {
            this.todoBlur = false
            this.todoSelected = null
            this.$refs.input[index].blur()
        })
    },
    completeTodo(todo) {
        this.$store.dispatch('completeTodo', todo)
    },
    completeBatch() {
        this.$store.dispatch('completeBatch', this.batchTodos)
        .then(() => {
            this.batchTodos = []
            this.batch = false
        })
    },
    deleteBatch() {
        this.$store.dispatch('deleteBatch', this.batchTodos)
        .then(() => {
            this.batchTodos = []
            this.batch = false
        })
    }
},
created() {
     this.$store.dispatch('getTodos')
}
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
    transition: all 1s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.strike-through {
    text-decoration: line-through;
    color: gray;
}

.input-text {
    border: none;
    font-size: 1rem;
    font-weight: bold;
    background: var(--light);
    color: var(--dark);
    transition: background .5s;
}

.input-focus {
    border: .5px solid lightgray;
    border-radius: 2px;
    padding: 5px;
}

.fa-undo-alt {
    color: gray;
}
</style>
