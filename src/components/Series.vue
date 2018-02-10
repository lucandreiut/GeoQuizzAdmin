<template>
    <div id="series-container">
        <b-card no-body
                class="text-center">
            <b-card-header>
                <div class="city-button-container">
                    <b-form-group>
                        <div>
                            <b-button v-for="serie in series" :key="serie.id" class="m-2" variant="info" size="lg" :to="'series/'+serie.id"><h2>{{serie.ville}} </h2></b-button>
                        </div>
                    </b-form-group>
                </div>
            </b-card-header>
        </b-card>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'series',
  created () {
    this.$store.dispatch('series/getSeries')
  },
  computed: {
    ...mapGetters({
      series: 'series/getSeries'
    })
  },
  methods: {
  }
}
</script>

<style scoped>

    #series-container{
        width : 50%;
        margin : auto
    }
</style>
