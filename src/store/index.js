import Vue from 'vue'
import Vuex from 'vuex'

import city from './modules/city'
import auth from './modules/auth'
import series from './modules/series'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    city,
    auth,
    series
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
