import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import sv from 'vuetify/lib/locale/sv';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { sv },
    current: 'sv',
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepOrange.base,  // #FF5722
        secondary: colors.blueGrey.lighten4, // #CFD8DC
        accent: colors.cyan.base, // #00BCD4
      },
    },
  },
});
