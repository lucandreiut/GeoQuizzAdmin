import Vue from 'vue'
import Vuex from 'vuex'

import game from './modules/game'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    game
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
