import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titleMixin from './mixins/titleMixin'

import TopNavigation from '@/components/TopNavigation'
import ServerComunicationIndicator from '@/components/ServerComunicationIndicator'

Vue.mixin(titleMixin)
Vue.use(VueResource)

Vue.component('TopNavigation', TopNavigation)
Vue.component('ServerComunicationIndicator', ServerComunicationIndicator)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
