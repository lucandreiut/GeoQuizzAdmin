import api from '../../api/api'

/* eslint-disable*/

export default {
  namespaced: true,
  state: {
    series: [],
    serie:null
  },
  getters: {
    getSeries (state) {
      return state.series
    },
    getSerie (state){
      return state.serie
    }
  },
  mutations: {
    addSerie (state, serie) {
      state.series.push(serie)
    },
    getSeries(state,series){
      state.series = series.series
    },
    getOneSerie(state,serie){
      state.serie = serie
    }
  },
  actions: {
    addSerie ({commit}, credentials) {
      api.post('/series', {
        mapOptions: credentials.mapOptions,
        ville: credentials.ville
      }).then(response => {
        commit('addSerie', response.data)
      })
    },
    getSeries ({commit}){
      api.get('/series').then(response => {
        commit('getSeries',response.data)
      })
    },
    getOneSerie({commit},id){
      api.get('/series/'+id).then(response => {
        commit('getOneSerie',response.data)
      })
    }
  }
}
