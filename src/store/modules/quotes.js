import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
    allQuotes: [],
    existingQuote: {},
}
const mutations = {
    setAllQuotes(state, payload) {
        state.allQuotes = payload
    },
    setExistingQuote(state, payload) {
        state.existingQuote = payload
    },
}
const actions = {
    getAllQuotes({commit}, payload) {
        firebase
            .firestore()
            .collection('quotes')
            .orderBy('number', 'desc')
            .get()
            .then(snapshot => {
                let quotes = []
                snapshot.forEach(quote => {
                    let quo = quote.data()
                    quo.id = quote.id
                    quotes.push(quo)
                })
                commit('setAllQuotes', quotes)
            })
    },
    getQuote({commit}, payload) {
        firebase
            .firestore()
            .collection('quotes')
            .doc(payload)
            .get()
            .then(snapshot => {
                commit('setExistingQuote', snapshot.data())
            })
    },
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
