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
                .then(async credentials => {
                    await commit('SET_UID', credentials.uid)
                    await commit('SET_USER', credentials)
                    await dispatch('entities/getEntities', credentials.uid, {root: true})
                    router.replace('/')
                })
                .catch(err => {
                    console.error(err)
                    alert(err.message)
                })
        },
        logoutUser({commit}) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('documents/RESET_STATES', null, {root: true})
                    commit('entities/RESET_STATES', null, {root: true})
                    commit('invoices/RESET_STATES', null, {root: true})
                    commit('quotes/RESET_STATES', null, {root: true})
                    commit('clients/RESET_STATES', null, {root: true})
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
