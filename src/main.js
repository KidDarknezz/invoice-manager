import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'

import firebase from 'firebase/app'

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: 'AIzaSyCmhqOfz2yaOmz6lEbp0bE1cuyFu2xlgSo',
    authDomain: 'invoice-manager-6e5f5.firebaseapp.com',
    projectId: 'invoice-manager-6e5f5',
    storageBucket: 'invoice-manager-6e5f5.appspot.com',
    messagingSenderId: '1073198062429',
    appId: '1:1073198062429:web:45c3cb7a5d89062b9226b4',
    measurementId: 'G-3WGPTS0RDW',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
