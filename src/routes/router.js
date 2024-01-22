import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "../components/Welcome.vue";
import City from "../components/City.vue";

const routes = [
    {path: '/', component: Welcome},
    {path: '/city/:cityKey', component: City, name: 'City'}
]

export default createRouter({
  history: createWebHistory(),
  routes
})

