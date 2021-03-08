<template lang="html">
  <v-container>
    <v-row>
      <v-col class="col-6 pb-4">
        <h2 class="text-h2">Ditt konto</h2>
        <p class="mt-4 text--disabled text-body-2">Gick med {{user.created}}</p>

        <h3 class="text-h3 mt-8">Kontoinformation</h3>
        <v-form @submit.prevent="updateAccount">
          <v-text-field
            v-model="user.firstName"
            label="Förnamn" ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            label="Efternamn" ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
            type="email"></v-text-field>

          <v-btn
            @click="updateAccount"
            :disabled="submitted">Uppdatera konto</v-btn>

          <v-alert
            v-if="validation && validation.target === 'account'"
            :type="validation.type"
            text
            class="mt-2"
            transition="scale-transition"
          >{{validation.message}}</v-alert>
        </v-form>

        <h3 class="text-h3 mt-8">Ändra lösenord</h3>
        <v-form>
          <v-text-field
            v-model="password"
            label="Lösenord"
            :type="showPassword?'text':'password'"
          >
            <v-icon
              slot="append"
              @click="showPassword = !showPassword"
              tabindex="-1"
            >
              {{showPassword?'mdi-eye-off':'mdi-eye'}}
            </v-icon>
          </v-text-field>
          <v-text-field
            v-model="confirmPassword"
            label="Lösenord igen"
            :type="showPassword?'text':'password'"
          >
          </v-text-field>

          <v-btn
            @click="updatePassword"
            :disabled="submitted">Uppdatera lösenord</v-btn>

          <v-alert
            v-if="validation && validation.target === 'password'"
            :type="validation.type"
            text
            class="mt-2"
            transition="scale-transition"
          >{{validation.message}}</v-alert>
        </v-form>

        <h3 class="text-h3 mt-8 mb-4">Farliga grejer</h3>
        <v-form>
          <v-btn
            v-if="askToDeleteUser"
            @click="deleteUser"
            color="error"
          >
            <v-icon left>mdi-delete</v-icon>
            Är du helt säker? Det går inte att ångra
          </v-btn>
          <v-btn
            v-else
            @click="askToDeleteUser = true"
            color="error"
            outlined
          >
            <v-icon left>mdi-delete</v-icon>
            Radera konto
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name:'Account',
  title: 'Ditt konto | Sing a Song',
  data() {
    return {
      submitted: false,
      password: '',
      confirmPassword: '',
      askToDeleteUser: false,
      showPassword: false
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.authentication.user
      },
      set() {

      }
    }
  },
  watch: {
    askToDeleteUser() {
      if(this.askToDeleteUser)
        setTimeout(()=> {
          this.askToDeleteUser = false
        }, 5000)
    },
    validation() {
      if(this.validation.target) {
        setTimeout(() => {
          this.validation = {}
        }, 10000)
      }
    }
  },
  methods: {
    updateAccount () {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('authentication/update', this.user)
        .then(() => {
          this.validation = {
            target: 'account',
            message: 'Ditt konto sparades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            target: 'account',
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    updatePassword() {
      this.validation = {}
      this.submitted = true
      this.$store.dispatch('authentication/update', {
        id: this.user.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .then(() => {
          this.validation = {
            target: 'password',
            message: 'Ditt lösenord uppdaterades',
            type: 'success'
          }
          this.submitted = false
        }, error => {
          this.validation = {
            target: 'password',
            message: error,
            type: 'error'
          }
          this.submitted = false
        })
    },
    deleteUser() {
      console.log('delete user:' + this.user.id) // eslint-disable-line no-console
      this.$store.dispatch('authentication/_delete', this.user.id)
    }
  }
}
</script>

<style>
.theme--light.v-tabs-items {
  background: transparent !important
}
</style>
