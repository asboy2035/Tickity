import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import TimersView from '@/views/TimersView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/map', component: MapView },
    { path: '/timers', component: TimersView },
    { path: '/settings', component: SettingsView }
  ],
})

export default router
