<template>
    <div>
        <b-container>
            <b-form @submit="register()">
                <b-form-group label="Fullname">
                    <b-form-input v-model="newuser.fullname" type="text" required placeholder="ex: John Doe"></b-form-input>
                </b-form-group>
                <b-form-group label="Email address :"  description="We'll never share your email with anyone else.">
                    <b-form-input v-model="newuser.email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" required placeholder="ex: john.doe@gmail.com"></b-form-input>
                </b-form-group>
                <b-form-group label="Password :" description="Minimum eight characters, at least one letter and one number">
                    <b-form-input v-model="newuser.password" type="password" required placeholder="********">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="info">Submit</b-button>
                <b-link to="/signin">I already have an account</b-link>
            </b-form>
        </b-container>
    </div>
</template>

<script>
/* eslint-disable */

    export default {
  name: 'Register',
  data () {
    return {
      msg: 'This is the register page',
      newuser: { password: '', fullname:'', email: '',}
    }
  },
  methods: {
    register () {
      this.$store.dispatch('auth/register', this.newuser).then((response) => {
        this.$router.push({path: '/'})
      })
    }
  }
}
</script>
