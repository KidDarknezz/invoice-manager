import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    state: {
        allQuotes: [],
        existingQuote: {},
    },
    mutations: {
        SET_ALLQUOTES(state, payload) {
            state.allQuotes = payload
        },
        SET_EXISTINGQUOTE(state, payload) {
            state.existingQuote = payload
        },
        RESET_STATES(state) {
            state.allQuotes = []
            state.existingQuote = {}
        },
        DELETE_QUOTE(state, payload) {
            state.allQuotes = state.allQuotes.filter(quote => quote.id != payload)
        },
    },
    actions: {
        getAllQuotes({commit, rootState}, payload) {
            firebase
                .firestore()
                .collection('quotes')
                .where('entities', '==', rootState.entities.entities)
                .get()
                .then(querySnapshot => {
                    let data = []
                    querySnapshot.forEach(doc => {
                        data.push({id: doc.id, ...doc.data()})
                    })
                    commit('SET_ALLQUOTES', data)
                })
        },
        getQuote({commit}, payload) {
            firebase
                .firestore()
                .collection('quotes')
                .doc(payload)
                .orderBy('number', 'desc')
                .get()
                .then(snapshot => {
                    commit('SET_EXISTINGQUOTE', snapshot.data())
                })
        },
        deleteQuote({commit}, id) {
            console.log('entra')
            if (confirm('Estas seguro que deseas eliminar esta cotización')) {
                firebase
                    .firestore()
                    .collection('quotes')
                    .doc(id)
                    .delete()
                    .then(() => {
                        commit('DELETE_QUOTE', id)
                    })
            }
        },
    },
    getters: {},
    namespaced: true,
}
