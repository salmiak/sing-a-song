<template>
  <v-container class="login">
    <v-row>
      <v-col>
        <h1>Logga in</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-6">
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Lösenord" type="password"
            outlined
          ></v-text-field>
          <v-btn
            :disabled="loggingIn"
            @click="handleSubmit"
          >Logga in</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      handleSubmit () {
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
