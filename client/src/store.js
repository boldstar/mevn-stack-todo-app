import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        todo: 'Example of todo',
        complete: false
      }
    ]
  },
  getters: {
    todos(state) {
      return state.todos
    }
  },
  mutations: {

  },
  actions: {

  }
})
