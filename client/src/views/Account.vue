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
          <v-col class="col-6">
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
          <v-col>
            <h2>Din profil</h2>
            <template v-if="profile">
              <p>Beskrivning: {{profile.description}}</p>
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
      tabs: null
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
