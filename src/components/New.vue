<template>
  <!-- eslint-disable -->
    <div>
        <b-form-group label="city">
            City : <input v-model="message" placeholder="name">
            <b-button @click="searchCity(message)"><h1>Search</h1></b-button>
            <div v-if="cities.length===0">
                <p>No city have been found</p>
            </div>
            <div v-if="cities.length>0">
                <h1>Cities found</h1>
                <button v-for="city in cities" @click="setCenter(city.geometry.location.lat, city.geometry.location.lng)">
                    <p>{{city.address_components[1].long_name}}</p>
                </button>
            </div>
        </b-form-group>
        <b-form-group label="serie">
          <br/>
          Map center :
          <div id="geo-map">
          <v-map ref="map" id="map" :zoom=zoom :center=center @l-click="placeMarker">
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          </v-map>
        </div>
        </b-form-group>
        <b-button @click="setSerie()"><h1>Create serie ! </h1></b-button>
    </div>
</template>

<script>
/* eslint-disable */
import Vue2Leaflet from 'vue2-leaflet';
import Vue from 'vue';
import { mapGetters } from 'vuex'

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);


export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is the register page',
      selected: '1',
      zoom:15,
      center: L.latLng(48.6915784, 6.1767092),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clicked: false,
      message : null,
      marker: null,
    }
  },
  computed: {
    ...mapGetters({
      cities: 'city/getCities'
    })
  },
  methods: {
    setSerie () {
      if(this.clicked && this.message !== null)
        alert('requête axios '+this.marker.getLatLng()+' '+this.message+' '+this.$refs.map.mapObject.getZoom())
        this.$store.dispatch('game/setGame', this.selected).then(response => {
        this.$router.push({name: 'Game'})
      })

    },
    placeMarker (event) {
      if (!this.clicked){
          this.clicked = true
          this.marker = L.marker(event.latlng)
          this.marker.addTo(this.$refs.map.mapObject)
        }else{
          this.marker.setLatLng(event.latlng)
        }
    },
    searchCity(city){
      console.log(city)
      if (city == null) {
        city = ""
      }
      this.$store.dispatch('city/setCities', city)
    },
    setCenter(lat, lng){
      this.center = L.latLng(lat,lng)
      this.$refs.map.mapObject.panTo(this.center)
    }
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
    #geo-map{
        width: 50vw;
        height: 80vh;
        vertical-align : middle;
        display : inline-block;
    }
</style>