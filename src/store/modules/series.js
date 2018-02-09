import axios from 'axios'
import conf from '../../config'

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
      this.state.series.push(serie)
    }
  },
  actions: {
    addSerie ({commit}, credentials) {
      axios.post(conf.remoteURL + '/series', {
        mapOptions: credentials.mapOptions,
        ville: credentials.ville
      }).then(response => {
        commit('addSerie', response.data)
      })
    }
  }
}
