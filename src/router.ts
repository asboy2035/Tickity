import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GlobeView from '@/views/GlobeView.vue'
import TimersView from '@/views/TimersView.vue'
import SettingsView from '@/views/SettingsView.vue'
import FriendsView from '@/views/FriendsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/globe', component: GlobeView },
    { path: '/timers', component: TimersView },
    { path: '/settings', component: SettingsView },
    { path: '/friends', component: FriendsView }
  ],
})

export default router
