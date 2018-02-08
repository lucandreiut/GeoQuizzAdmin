import googleAPI from '@/api'

export default {
  namespaced: true,
  state: {
    cities: []
  },
  getters: {
    getCities (state) {
      return state.cities
    }
  },
  mutations: {
    setCities (state, cities) {
      state.cities = cities
    }
  },
  actions: {
    setCities ({commit}, city) {
      googleAPI.get('', {params: {
        address: city,
        key: 'AIzaSyA2Z00p2HO7QwKjvFZjSZP5QOMBicVaIzo'
      }
      }).then(response => {
        let cities = response.data.results
        commit('setCities', cities)
      })
    }
  }
}
