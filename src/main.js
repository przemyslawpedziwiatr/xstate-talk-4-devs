import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { inspect } from '@xstate/inspect';

const app = createApp(App)

inspect({iframe: false});

app.use(router)

app.mount('#app')

