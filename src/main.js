import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import firebase from "firebase/app"

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBL69kWtvxSA6u-EKS8EV-_9TWtflwRya0",
  authDomain: "bb-invoice-manager.firebaseapp.com",
  projectId: "bb-invoice-manager",
  storageBucket: "bb-invoice-manager.appspot.com",
  messagingSenderId: "466565625015",
  appId: "1:466565625015:web:6e2c95b48b194712750932",
  measurementId: "G-L956LZFGBH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
