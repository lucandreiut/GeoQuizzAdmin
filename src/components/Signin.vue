<template>
    <div>
        <b-container>
            <b-form @submit.prevent="signin()">
                <b-form-group label="Email address :">
                    <b-form-input v-model="user.email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" id="exampleInput1" type="email" required placeholder="ex: john.doe@gmail.com"></b-form-input>
                </b-form-group>
                <b-form-group label="Password :">
                    <b-form-input type="password" v-model="user.password" required placeholder="********">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="danger">Connect !</b-button>
                <b-link to="/register">I have not account yet</b-link>
            </b-form>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Signin',
  data () {
    return {
      user: {email: '', password: ''}
    }
  },
  methods: {
    signin () {
      this.$store.dispatch('auth/login', this.user).then((response) => {
        this.$router.push({path: '/'})
      })
    }
  }
}
</script>
