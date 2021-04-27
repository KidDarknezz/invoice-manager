import firebase from 'firebase/app'
import 'firebase/firebase-auth'

import router from '@/router'

export default {
    state: {
        user: '',
        uid: '',
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload
        },
        SET_UID: (state, payload) => {
            state.uid = payload
        },
    },
    actions: {
        setUser({commit}, payload) {
            commit('SET_USER', payload)
            commit('SET_UID', payload.uid)
        },
        loginUser({commit, dispatch}, payload) {
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(credentials => {
                    commit('SET_UID', credentials.uid)
                    commit('SET_USER', credentials)
                    router.replace('/')
                })
                .catch(err => {
                    console.error(err)
                    alert(err.message)
                })
        },
        logoutUser() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log('logout succesfull')
                    router.replace('/login')
                })
                .catch(err => {
                    console.error(err)
                })
        },
    },
    getters: {},
    namespaced: true,
}
