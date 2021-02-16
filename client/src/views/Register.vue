<template>
  <div class="login">
    <h1>Registrera dig</h1>
    <form v-if="!success" @submit.prevent="handleSubmit">
      <input v-model="firstName" placeholder="Förnamn" /><br/>
      <input v-model="lastName" placeholder="Efternamn" /><br/>
      <input v-model="email" placeholder="Email" /><br/>
      <input v-model="password" placeholder="Lösenord" type="password" /><br/>
      <input v-model="confirmPassword" placeholder="Lösenord igen" type="password" /><br/>
      <input type="checkbox" v-model="acceptTerms" /> Genom att kryssa i godkänner du våra användarvilkor.<br/>
      <button :disabled="submitted">Skapa konto</button>
    </form>
    <div v-else>
      Kolla din email
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// const api = 'http://localhost:4000/accounts'

export default {
  name: 'Register',
  data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        submitted: false,
        success: false
      }
  },
  methods: {
    handleSubmit () {
      this.submitted = true;
      const { firstName, lastName, email, password, confirmPassword, acceptTerms } = this;
      const { dispatch } = this.$store;
      dispatch('authentication/register', { firstName, lastName, email, password, confirmPassword, acceptTerms })
      .then(() => {
        this.success = true
      })
    }
  }
}
</script>
