import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    todos(state) {
      return state.todos
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    },
    UPDATE_TODO(state, todo) {
      const index = state.todos.findIndex(item => item._id == todo._id)
      state.todos.splice(index, 1, todo)
    },
    DELETE_TODO(state, id) {
      const index = state.todos.findIndex(todo => todo._id == id)
      state.todos.splice(index, 1)
    }
  },
  actions: {
    getTodos(context) {
      axios.get('/api/todos')
      .then(response => {
        context.commit('SET_TODOS', response.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    addTodo(context, todo) {
      axios.post('/api/todos', {todo: todo})
      .then(response => {
        context.commit('ADD_TODO', response.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    updateTodo(context, todo) {
      axios.put('/api/todos/' + todo._id, todo)
      .then(response => {
        context.commit('UPDATE_TODO', response.data.todo)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    completeTodo(context, todo) {
      axios.put('/api/todos/complete/' + todo)
      .then(response => {
        context.commit('UPDATE_TODO', response.data.todo)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    deleteTodo(context, todo) {
      axios.delete('/api/todos/' + todo)
      .then(response => {
        context.commit('DELETE_TODO', todo)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  }
})
