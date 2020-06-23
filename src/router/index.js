import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home'
import BrowseHotels from '@/view/BrowseHotels'
import Hotel from '@/view/Hotel'
import Profile from '@/view/User/Profile'


Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browse/:location',
    name: 'Browse',
    props: true,
    component: BrowseHotels
  },
  {
    path: '/hotel/:id',
    name: 'Hotel',
    props: true,
    component: Hotel
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
