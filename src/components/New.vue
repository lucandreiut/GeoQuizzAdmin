<template>
  <!-- eslint-disable -->
    <div>
        <b-form-group label="serie">
          City : <input v-model="message" placeholder="name">
          <br/>
          Map center :
          <div id="geo-map">
          <v-map ref="map" id="map" :zoom=15 :center="[48.6915784, 6.1767092]" @l-click="placeMarker">
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

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is the register page',
      selected: '1',
      zoom:13,
      center: L.latLng(48.6915784, 6.1767092),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clicked: false,
      message : null,
      marker: null
    }
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