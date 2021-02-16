import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
