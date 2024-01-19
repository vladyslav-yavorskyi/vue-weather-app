import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routes/router.js";
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
