<template>
  <div class="login">
    <h1>Logga in</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" placeholder="Lösenord" type="password" />
    <button @click="login">Logga in</button>
    <div v-if="user">
      <h2>Hej {{user.firstName}}</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

const api = 'http://localhost:4000/accounts'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    login() {
      this.$http.post(api + '/authenticate', {
        email: this.email,
        password: this.password
      }).then((response) => {
        this.$store.commit('setUser', response.body)
        this.email = ""
        this.password = ""
      })
    }
  }
}
</script>
