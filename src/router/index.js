import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/view/Home'
import BrowseHotels from '@/view/BrowseHotels'
import Hotel from '@/view/Hotel'
import Signup from '@/view/User/Signup'
import Login from '@/view/User/Login'
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
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]
const router = new VueRouter({
  routes
})

export default router
