<template>
    <div>
        <b-card no-body
                class="pictures-container text-center">
            <b-card-header>
                <h1>{{serie.ville}}</h1>
            </b-card-header>
            <b-card-body>
                <div>
                    <b-form @submit="addPhoto()">
                        <h3>Places already in the series</h3>
                        <b-list-group class="mb-5">
                            <b-list-group-item v-for="picture in serie.photos"><h5>{{picture.desc}}</h5></b-list-group-item>
                        </b-list-group>

                        <h3>Add a new place</h3>
                        <b-form-group>
                            <b-input-group  prepend="Description">
                                <b-form-input v-model="image.desc" type="text" required placeholder="ex : Place Stanislas"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group  prepend="Position">
                                <b-form-input v-model="image.pos" type="text" required placeholder="ex: 6.12736;16.23839"></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group prepend="Picture" description="The image you want to upload">
                                <b-form-file type="file" @change="onFileChange"/>
                            </b-input-group>
                        </b-form-group>
                        <b-button size="lg" variant="danger" type="submit">Submit</b-button>
                    </b-form>
                </div>
            </b-card-body>
        </b-card>
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

    .pictures-container{
        width : 50%;
        margin : auto;
    }
</style>
