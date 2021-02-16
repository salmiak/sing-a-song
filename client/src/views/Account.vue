<template lang="html">
  <v-container>
    <v-row>
      <v-col>
        <h1>Hej {{user.firstName}}!</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs
          v-model="tabs"
          color="red"
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
            <h2>Ditt konto</h2>
            <p>Gick med {{user.created}}</p>

            <h3>Kontoinformation</h3>
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
              <v-btn
                @click="updateAccount"
                :disabled="submitted">Uppdatera konto</v-btn>
            </v-form>

            <h3>Ändra lösenord</h3>
            <v-form>
              <v-text-field
                v-model="password"
                label="Lösenord"
                type="password" ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                label="Lösenord igen"
                type="password" ></v-text-field>
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
            <h2>Din profil</h2>
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
      tabs: null,
      areas: [
        'Götaland',
        'Svealand',
        'Södra Norrland',
        'Norra Norrland'
      ]
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
      /*
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
          dispatch('authentication/login', { email, password });
      }
      */
    },
    updatePassword () {
      /*
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
          dispatch('authentication/login', { email, password });
      }
      */
    }
  }
}
</script>
