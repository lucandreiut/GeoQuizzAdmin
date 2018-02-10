<template>
    <div id="home-container">
        <div id="play-container">
            <b-card no-body
                    class="text-center">
                <b-card-header>
                    <h2>You want to create a new series ?</h2>
                    <b-button to="/new" variant="danger" size="lg">Click here !</b-button>
                </b-card-header>
                <b-card-body>
                    <h2>You want to add pictures for a specific series ?</h2>
                    <b-button to="/series" variant="danger" size="lg">Click here !</b-button>
                </b-card-body>
            </b-card>
        </div>
        <div id="home-description">
            <b-card header="<h2>GeoQuizz administration</h2>"
                    class="text-center">
                <h4>You are here to help create and enrich the GeoQuizz game.<br><br> Be careful what you put on, check before validating!</h4>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.$store.dispatch('series/getSeries')
  },
  data () {
    return {
      msg: 'This is the home page'
    }
  }
}
</script>

<style>
    #home-container{
        text-align : center;
        height : calc(100vh - 140px);
        overflow-y: auto
    }
    #home-description, #play-container{
        background-color : gainsboro;
        display : inline-block;
        width : 40%;
        padding : 2.5%;
        margin : 2.5%;
        border-radius : 10px;
        font-size : 1.2em;
    }
</style>
