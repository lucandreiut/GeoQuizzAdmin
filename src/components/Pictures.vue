<template>
    <div>
        {{serie}}
        <div>
            <b-form @submit="addPhoto()">
                <b-form-group label="Description" description="Put here the description of your image">
                    <b-form-input v-model="image.desc" type="text" required placeholder="ex : Place Stanislas"></b-form-input>
                </b-form-group>
                <b-form-group label="Position :"  description="GPS coordinates of the type (lat;lng)">
                    <b-form-input v-model="image.pos" type="text" required placeholder="ex: 6.12736;16.23839"></b-form-input>
                </b-form-group>
                <b-form-group label="Image :" description="The image you want to upload">
                    <input type="file" @change="onFileChange">
                </b-form-group>
                <b-button type="submit" variant="info">Submit</b-button>
            </b-form>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pictures',
  data () {
    return {
      idSerie: null,
      image: {desc: '', pos: '', img: ''}
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
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        console.log('no files')
      }

      this.image.img = files[0]
    },
    addPhoto () {
      this.$store.dispatch('series/addPhoto', {image: this.image, serie: this.idSerie})
    }
  }
}
</script>

<style scoped>

</style>
