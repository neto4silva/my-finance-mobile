/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins

import { registerPlugins } from '@/plugins'
import sweetalert from './plugins/sweetalert';


const app = createApp(App)
app.use(sweetalert);

registerPlugins(app)

app.mount('#app')
