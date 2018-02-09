<template>
    <div>
        <div v-for="serie in series" :key="serie.id">
            <h1>{{serie.ville}}</h1>
            <b-button :to="'series/'+serie.id"><h1>More </h1></b-button>

        </div>
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

</style>
