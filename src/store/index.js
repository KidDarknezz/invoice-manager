import Vue from 'vue'
import Vuex from 'vuex'

import clients from './modules/clients'
import quotes from './modules/quotes'
import invoices from './modules/invoices'
import documents from './modules/documents'
import auth from './modules/auth'
import entities from './modules/entities'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        clients,
        invoices,
        documents,
        quotes,
        auth,
        entities,
    },
})
