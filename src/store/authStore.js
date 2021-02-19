import firebase from 'firebase/app'
import 'firebase/firebase-auth'

import router from '@/router'

const state = {
  activeUser: ''
}
const mutations = {
  setCurrentUserUid(state, payload) {
    state.activeUser = payload
  }
}
const actions = {
  loginUser({ commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(credentials => {
        console.log(credentials)
        router.replace('/')
      })
      .catch(err => {
        console.log(err)
      })
  },
  logoutUser({ }, payload) {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout succesfull')
        router.replace('/login')
      })
      .catch(err => {
        console.log(err)
      })
  },
  logCurrentUser({ }, payload) {
    console.log(firebase.auth().currentUser.uid)
  },
  handleAuthStateChanged({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit("setCurrentUserUid", user.uid)
      } else {
        commit("setCurrentUserUid", {})
      }
    })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};