import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import sv from 'vuetify/lib/locale/sv';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { sv },
      current: 'sv',
    },
});
