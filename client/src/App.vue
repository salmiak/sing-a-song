<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Hem</router-link> |
      <router-link to="/about">Om Sing a Song</router-link> |
      <template v-if="$store.state.authentication.user">
        <router-link to="/account">Ditt konto</router-link> |
        <router-link to="/login">Logga ut {{$store.state.authentication.user.firstName}}</router-link>
      </template>
      <template v-else>
        <router-link to="/login">Logga in</router-link> |
        <router-link to="/register">Skapa konto</router-link>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
