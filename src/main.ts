import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import 'quasar/dist/quasar.css'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(Quasar, quasarUserOptions) 

app.mount('#app')
