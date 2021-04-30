import firebase from 'firebase/app'
import 'firebase/firestore'
import router from '../../router'

export default {
    state: {
        existingDocument: {},
        newInvoice: '',
        newOuote: '',
    },
    mutations: {
        setExistingDocument(state, payload) {
            state.existingDocument = payload
        },
        setNewInvoiceNo(state, payload) {
            state.newInvoice = payload
        },
        setNewQuoteNo(state, payload) {
            state.newQuote = payload
        },
        RESET_STATES(state) {
            state.existingDocument = {}
            state.newInvoice = ''
            state.newOuote = ''
        },
    },
    actions: {
        getDocument({commit}, payload) {
            firebase
                .firestore()
                .collection(`${payload.type}s`)
                .doc(payload.id)
                .get()
                .then(snapshot => {
                    commit('setExistingDocument', snapshot.data())
                })
        },
        saveDocument({rootState}, payload) {
            if (confirm('Save document?')) {
                if (payload.type == 'invoice') {
                    firebase
                        .firestore()
                        .collection('entities')
                        .doc(rootState.entities.entities)
                        .update({lastInvoice: payload.number})
                }
                if (payload.type == 'quote') {
                    firebase
                        .firestore()
                        .collection('entities')
                        .doc(rootState.entities.entities)
                        .update({lastQuote: payload.number})
                }
                payload.entities = rootState.entities.entities
                firebase
                    .firestore()
                    .collection(`${payload.type}s`)
                    .add(payload)
                    .then(resp => {
                        router.push(`/document/${resp.id}/${payload.type}`)
                    })
            }
        },
        getGeneralInfo({commit, rootState}, payload) {
            firebase
                .firestore()
                .collection('entities')
                .doc(rootState.entities.entities)
                .get()
                .then(snapshot => {
                    let data = snapshot.data()
                    let lastInvoice = data.lastInvoice
                    let lastQuote = data.lastQuote
                    //
                    let newInvoice = parseInt(lastInvoice) + 1
                    let newInvoiceString = `${newInvoice}`
                    while (newInvoiceString.length < 5) {
                        newInvoiceString = '0' + newInvoiceString
                    }
                    commit('setNewInvoiceNo', newInvoiceString)

                    let newQuote = parseInt(lastQuote) + 1
                    let newQuoteString = `${newQuote}`
                    while (newQuoteString.length < 5) {
                        newQuoteString = '0' + newQuoteString
                    }
                    commit('setNewQuoteNo', newQuoteString)
                })
        },
    },
    getters: {},
    namespaced: true,
}
