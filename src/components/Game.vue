<template>
<!-- eslint-disable -->
    <div>
      <div v-if="!this.done">
        Question : {{index + 1}}
        <br/>
        Description : <input v-model="message" placeholder="name">
        <br/>
          Photo : 
          <input type="file" name="pic" accept="image/*" @change="processFile($event)">
        <br/>
        Position : 
        <div id="geo-map">
          <v-map ref="map" id="map" :zoom=15 :center="[48.6915784, 6.1767092]" @l-click="placeMarker">
      		<v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          </v-map>
          <b-button @click="resetMap()">Add question to series</b-button>
          <b-button v-if="this.index + 1 > this.maxIndex" @click ="donezo()">Done !</b-button>
        </div>
      </div>
      <div v-else>
        <h1>You completed your series !</h1>
        <b-button to="/new">Add another one</b-button>
        <b-button to="/">Home</b-button>
      </div>
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
  name: 'Game',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer' :Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      msg: 'This is the game page',
      zoom:13,
      center: L.latLng(48.6915784, 6.1767092),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      clicked : false,
      clickedMarker : null,
      index: 0,
      maxIndex: 10,
      message: '',
      picture: null,
      done : false
    }
  },
  methods :{
  	placeMarker (event) {
        if (!this.clicked){
          this.clicked = true
          this.clickedMarker = L.marker(event.latlng)
          this.clickedMarker.addTo(this.$refs.map.mapObject)
        }else{
          this.clickedMarker.setLatLng(event.latlng)
        }

  	},
    donezo () {
      this.done = true
    },
    processFile () {
      this.picture = event.target.files[0]
    },
    resetMap () {
      if (this.clickedMarker !== null && this.message !== ''){
        alert('requête axios '+this.clickedMarker.getLatLng() +' '+ this.message)
        console.log(this.picture)

        this.message = ''
        this.index += 1
        this.$refs.map.mapObject.removeLayer(this.clickedMarker)
        this.clicked = false
        this.clickedMarker = null
      }
    }
  }
}
</script>

<style>
/* eslint-disable */
@import "../../node_modules/leaflet/dist/leaflet.css";

    #geo-map{
        width: 50vw;
        height: 80vh;
        vertical-align : middle;
        display : inline-block;
    }

</style>