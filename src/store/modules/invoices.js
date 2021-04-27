import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    state: {
        allInvoices: [],
        selectedQuoteToInvoice: '',
    },
    mutations: {
        SET_ALLINVOICES(state, payload) {
            state.allInvoices = payload
        },
        SET_EXISTINGINVOICE(state, payload) {
            state.existingInvoice = payload
        },
        SET_SELECTEDQUOTETOINVOICE(state, payload) {
            state.selectedQuoteToInvoice = payload
        },
    },
    actions: {
        getAllInvoices({commit, rootState}, payload) {
            firebase
                .firestore()
                .collection('invoices')
                .where('entities', '==', rootState.entities.entities)
                .get()
                .then(querySnapshot => {
                    let data = []
                    querySnapshot.forEach(doc => {
                        data.push({id: doc.id, ...doc.data()})
                    })
                    commit('SET_ALLINVOICES', data)
                })
        },
        generateInvoiceFromQuote({commit}, payload) {
            commit('SET_SELECTEDQUOTETOINVOICE', payload)
        },
    },
    getters: {allInvoices: state => state.allInvoices},
    namespaced: true,
}
