/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#382bf0',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        colors: {
          background: '#192122',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
