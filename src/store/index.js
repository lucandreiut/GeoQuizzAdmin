import Vue from 'vue'
import Vuex from 'vuex'

import city from './modules/city'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    city
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
