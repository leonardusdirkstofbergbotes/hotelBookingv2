import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home'
import BrowseHotels from '@/view/BrowseHotels'
import Hotel from '@/view/Hotel'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browse',
    name: 'Browse',
    component: BrowseHotels
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel
  }
]
const router = new VueRouter({
  routes
})

export default router
