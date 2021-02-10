<template>
  <div class="login">
    <h1>Logga in</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" placeholder="Lösenord" type="password" />
      <button :disabled="loggingIn">Logga in</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// const api = 'http://localhost:4000/accounts'

export default {
  name: 'Login',
  data () {
      return {
          email: '',
          password: '',
          submitted: false
      }
  },
  computed: {
      loggingIn () {
          return this.$store.state.authentication.status.loggingIn;
      }
  },
  created () {
      // reset login status
      this.$store.dispatch('authentication/logout');
  },
  methods: {
      handleSubmit (e) {
        console.log(e) // eslint-disable-line no-console
          this.submitted = true;
          const { email, password } = this;
          const { dispatch } = this.$store;
          if (email && password) {
              dispatch('authentication/login', { email, password });
          }
      }
  }
}
</script>
