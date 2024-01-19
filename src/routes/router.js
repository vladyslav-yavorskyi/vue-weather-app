import { createRouter, createWebHistory } from 'vue-router'
import TopLocations from "../components/TopLocations.vue";
import Welcome from "../components/Welcome.vue";

const routes = [
    {path: '/', component: Welcome},
    {path: '/home', component: TopLocations}
]

export default createRouter({
  history: createWebHistory(),
  routes
})

