import axios from 'axios'
import conf from '../../config'
import ls from 'local-storage'
/* eslint-disable*/
export default {
  namespaced: true,
  state: {
    series: []
  },
  getters: {
    getSeries (state) {
      return state.series
    }
  },
  mutations: {
    addSerie (state, serie) {
      state.series.push(serie)
    }
  },
  actions: {
    addSerie ({commit}, credentials) {
      console.log(ls.get('token'))
      const api = axios.create({
        baseURL: conf.remoteURL,
        headers: {
          Authorization: 'Bearer ' + ls.get('token')
        }
      })
      api.post('/series', {
        mapOptions: credentials.mapOptions,
        ville: credentials.ville
      }).then(response => {
        console.log(response.data)
        commit('addSerie', response.data)
      })
    }
  }
}
