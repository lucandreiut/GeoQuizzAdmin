<template>
    <div>
        {{serie}}
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pictures',
  data () {
    return {
      idSerie: null
    }
  },
  created () {
    this.idSerie = this.$route.params.idPicture
    this.$store.dispatch('series/getOneSerie', this.idSerie)
  },
  computed: {
    ...mapGetters({
      serie: 'series/getSerie'
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
