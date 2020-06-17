import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase' 
import router from './router'
import vuetify from './plugins/vuetify'; 
import '@fortawesome/fontawesome-free/css/all.css'
import { store } from '@/store/state'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBTEJYsbaqn2ZhR15uOv8jOmtVMtD-7Hj4",
      authDomain: "hotel-booking-10a12.firebaseapp.com",
      databaseURL: "https://hotel-booking-10a12.firebaseio.com",
      projectId: "hotel-booking-10a12",
      storageBucket: "hotel-booking-10a12.appspot.com"
    })
  }
}).$mount('#app')
