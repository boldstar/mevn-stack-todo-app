import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import toast from './plugins/toast'

axios.defaults.baseURL = 'http://localhost:5000'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    processing: false
  },
  getters: {
    todos(state) {
      return state.todos
    },
    processing(state) {
      return state.processing
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
    },
    PROCESSING_STATE(state) {
      state.processing = !state.processing
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
      context.commit('PROCESSING_STATE')
      axios.post('/api/todos', {todo: todo})
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('ADD_TODO', response.data.todo)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    },
    updateTodo(context, todo) {
      context.commit('PROCESSING_STATE')
      axios.put('/api/todos/' + todo._id, todo)
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('UPDATE_TODO', response.data.todo)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    },
    completeTodo(context, todo) {
      context.commit('PROCESSING_STATE')
      axios.put('/api/todos/complete/' + todo)
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('UPDATE_TODO', response.data.todo)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    },
    completeBatch(context, todos) {
      context.commit('PROCESSING_STATE')
      axios.post('/api/todos/complete', todos)
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('SET_TODOS', response.data.todos)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    },
    deleteTodo(context, todo) {
      context.commit('PROCESSING_STATE')
      axios.delete('/api/todos/' + todo)
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('DELETE_TODO', todo)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    },
    deleteBatch(context, todos) {
      context.commit('PROCESSING_STATE')
      axios.post('/api/todos/delete-batch', todos)
      .then(response => {
        context.commit('PROCESSING_STATE')
        context.commit('SET_TODOS', response.data.todos)
        toast.success(response.data.msg)
      })
      .catch(err => {
        context.commit('PROCESSING_STATE')
        console.log(err.response.data)
      })
    }
  }
})
