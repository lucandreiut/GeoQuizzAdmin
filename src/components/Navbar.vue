<template>
  <div>
      <b-navbar class="geoquizz-navbar" toggleable="md">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#">
              <img src="../assets/logo/logo.png" alt="GEOQUIZZ">
          </b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
              <!-- Right aligned nav items -->
              <b-navbar-nav v-if="connected" class="ml-auto mr-5">
                  <b-nav-item to="/" exact class="mr-3">Home</b-nav-item>
                  <b-nav-item to="/new" exact class="mr-3">Create series</b-nav-item>
                  <b-nav-item to="/series" exact class="mr-3">All series</b-nav-item>
                  <b-nav-item v-if="!connected" to="/signin" exact class="mr-3">Log In</b-nav-item>
                  <b-nav-item v-else @click="logout()" exact class="mr-3">Log out</b-nav-item>
              </b-navbar-nav>

          </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
/* eslint-disable */

  import { mapGetters } from 'vuex'

  export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'This is the Navbar'
    }
  },
  computed: {
    ...mapGetters({
      connected: 'auth/isConnected'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout').then((response) => {
        this.$router.push({name: 'Signin'})
      })
    }
  }
}
</script>

<style>
    .geoquizz-navbar{
        padding : 30px;
        font-size : 1.5em;
    }

</style>
