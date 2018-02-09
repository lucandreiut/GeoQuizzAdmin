<template>
  <!-- eslint-disable -->
    <div>
        <b-form-group label="city">
            City : <input v-model="name" placeholder="name">
            <b-button @click="searchCity(name)"><h1>Search</h1></b-button>
            <div v-if="cities.length===0">
                <p>No city have been found</p>
            </div>
            <div v-if="cities.length>0">
                <h1>Cities found</h1>
                <button v-for="city in cities" @click="setCenter(city.geometry.location.lat, city.geometry.location.lng)">
                    <p>{{city.address_components[0].long_name}} - {{city.address_components[1].long_name}}</p>
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
      zoom:15,
      center: L.latLng(48.6915784, 6.1767092),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clicked: false,
      name : null,
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
      if((this.clicked && this.name != null) || (this.clicked && this.name != undefined) ){
        let mapOptions = this.marker.getLatLng().lat + ';' + this.marker.getLatLng().lng + ';' + this.zoom
        this.$store.dispatch('series/addSerie', {mapOptions,ville: this.name}).then(response =>{

        })
      }

    },
    placeMarker (event, lat, lng) {
      if(lat ===undefined && lng===undefined){
        lat = event.latlng.lat
        lng = event.latlng.lng
      }
      if (!this.clicked){
          this.clicked = true
          this.marker = L.marker([lat,lng])
          this.marker.addTo(this.$refs.map.mapObject)
        }else{
          this.marker.setLatLng([lat,lng])
        }
    },
    searchCity(city){
      if (city == null) {
        city = ""
      }
      this.name = city
      this.$store.dispatch('city/setCities', city)
    },
    setCenter(lat, lng){
      this.center = L.latLng(lat,lng)
      this.$refs.map.mapObject.panTo(this.center)
      this.placeMarker(null,lat,lng)
    }
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";

    .leaflet-dragging .leaflet-grab {cursor: move;}
    #geo-map{
        width: 50vw;
        height: 80vh;
        vertical-align : middle;
        display : inline-block;
    }
</style>