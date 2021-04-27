import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    // namespaced: true,
    state: {
        allInvoices: [],
        selectedQuoteToInvoice: '',
    },
    mutations: {
        SET_ALLINVOICES(state, payload) {
            state.allInvoices = payload
        },
        // setExistingInvoice(state, payload) {
        //     state.existingInvoice = payload
        // },
        // setSelectedQuoteToInvoice(state, payload) {
        //     state.selectedQuoteToInvoice = payload
        // },
    },
    actions: {
        getAllInvoices({commit, rootState}, payload) {
            let userEntitie = rootState.entities.entities
            firebase
                .firestore()
                .collection('invoices')
                .where('entities', '==', userEntitie)
                // .orderBy('number', 'desc')
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
            commit('setSelectedQuoteToInvoice', payload)
        },
    },
    getters: {allInvoices: state => state.allInvoices},
    namespaced: true,
}
