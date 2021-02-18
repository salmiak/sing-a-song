<template lang="html">
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h1 mt-16">Hej {{user.firstName}}!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs
          v-model="tabs"
          color="red"
          class="mb-16"
        >
          <v-tab>Ditt konto</v-tab>
          <v-tab>Din profil</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-tabs-items v-model="tabs">

      <v-tab-item>
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
                label="Email" ></v-text-field>

                <v-alert
                  type="error"
                  :value="!!accountValidationError"
                  transition="scale-transition"
                  class="elevation-2"
                >{{accountValidationError}}</v-alert>

              <v-btn
                @click="updateAccount"
                :disabled="submitted">Uppdatera konto</v-btn>
            </v-form>

            <h3 class="text-h3 mt-8">Ändra lösenord</h3>
            <v-form>
              <v-text-field
                v-model="password"
                label="Lösenord"
                type="password" ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Lösenord igen"
                type="password" ></v-text-field>

                <v-alert
                  type="error"
                  :value="!!passwordValidationError"
                  transition="scale-transition"
                  class="elevation-2"
                >{{passwordValidationError}}</v-alert>

              <v-btn
                @click="updatePassword"
                :disabled="submitted">Uppdatera lösenord</v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item>
        <v-row>
          <v-col class="col-8 pb-4">
            <h2 class="text-h2">Din profil</h2>
            <template v-if="profile">

              <v-textarea
                label="Beskrivning"
                v-model="profile.description"
                hint="Visas på din profil"
                auto-grow
                rows="3"
              ></v-textarea>

              <v-combobox
                v-model="profile.areas"
                :items="areas"
                label="Vilka regioner kan du uppträda i?"
                multiple
                chips
              ></v-combobox>

              <v-textarea
                label="Kontaktuppgifter"
                v-model="profile.contact"
                hint="E-postadresser kommer förvandlas till länkar."
                auto-grow
                rows="3"
              ></v-textarea>

              <v-btn
                @click="updateProfile"
                :disabled="submitted">Uppdatera konto</v-btn>

            </template>
            <template v-else>
              <p>Laddar profil...</p>
            </template>
          </v-col>
        </v-row>
      </v-tab-item>

    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  name:'Account',
  data() {
    return {
      submitted: false,
      tabs: null,
      areas: [
        'Götaland',
        'Svealand',
        'Södra Norrland',
        'Norra Norrland'
      ],
      password: '',
      confirmPassword: '',
      passwordValidationError: null,
      accountValidationError: null
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.state.authentication.user
      },
      set() {

      }
    },
    profile() {
      if (this.$store.state.profiles.all.items)
        return this.$store.state.profiles.all.items.find(i => i.userId === this.user.id)
      return false
    }
  },
  created () {
      this.$store.dispatch('profiles/getAll');
  },
  methods: {
    updateAccount () {
      this.accountValidationError = null
      this.submitted = true
      this.$store.dispatch('authentication/update', this.user)
        .then(() => {
          this.submitted = false
        }, error => {
          this.accountValidationError = error
          this.submitted = false
        })
    },
    updatePassword() {
      this.passwordValidationError = null
      this.submitted = true
      this.$store.dispatch('authentication/update', {
        id: this.user.id,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
        .then(() => {
          this.submitted = false
        }, error => {
          this.passwordValidationError = error
          this.submitted = false
        })
    },
    updateProfile() {

    }
  }
}
</script>
