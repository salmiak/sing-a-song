import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import sv from "vuetify/lib/locale/sv";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { sv },
    current: "sv",
  },
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: colors.deepPurple.darken1, //#5E35B1
        secondary: colors.deepOrange.lighten5, // #FBE9E7
        accent: colors.deepOrange.base, // #FF5722
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
