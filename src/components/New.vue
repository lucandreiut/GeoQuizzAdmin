<template>
  <!-- eslint-disable -->
    <div id="series-container" class="mr-4 ml-4">
        <div id="city-choice">
            <b-card no-body
                    class="text-center">
                <b-card-header>
                    <b-form-group>
                        <b-input required type="text" class="text-center" v-model="name" size="lg" placeholder="ex: Nancy"/>
                        <b-button @click="searchCity(name)" class="mt-2" variant="danger" size="lg">Search this place !</b-button>
                        <div v-if="cities.length===0">
                            <p>No city have been found</p>
                        </div>
                        <div v-if="cities.length>0">
                            <h1 class="m-3">We found this :</h1>
                            <b-button class="m-2" variant="info" v-for="city in cities" @click="setCenter(city.geometry.location.lat, city.geometry.location.lng)">
                                <p>{{city.address_components[0].long_name}} - {{city.address_components[1].long_name}}</p>
                            </b-button>
                        </div>
                        <b-button @click="setSerie()" variant="danger" class="mt-5"><h1>Create series ! </h1></b-button>
                    </b-form-group>
                </b-card-header>
            </b-card>

        </div>

        <div id="map-container">
            <b-form-group>
            <div id="geo-map">
                <v-map ref="map" id="map" :zoom=zoom :center=center @l-click="placeMarker">
                    <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                </v-map>
            </div>
            </b-form-group>
        </div>

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
            this.$router.push({path: '/series/' + response.id})
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

    #series-container{
        text-align : center;
     }
    .leaflet-dragging .leaflet-grab {cursor: move;}
    #geo-map{
        width: 50vw;
        height: 80vh;
        vertical-align : middle;
        display : inline-block;
    }

    #city-choice{
        float : left;
        width : 40%;
        vertical-align : top;
        display: inline-block;
    }

    #map-container {
        float : right;
        vertical-align : top;
        display: inline-block;
    }
</style>