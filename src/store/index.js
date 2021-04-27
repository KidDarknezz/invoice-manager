import Vue from 'vue'
import Vuex from 'vuex'

import clientsStore from './clientsStore'
import quotesStore from './quotesStore'
import invoicesStore from './invoicesStore'
import documentsStore from './documentsStore'
import authStore from './authStore'

Vue.use(Vuex)

export default function () {
    const Store = new Vuex.Store({
        modules: {
            clientsStore,
            invoicesStore,
            documentsStore,
            quotesStore,
            authStore,
        },
        strict: process.env.DEV,
    })

    return Store
}
