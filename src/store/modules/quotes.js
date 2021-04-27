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
                .get()
                .then(snapshot => {
                    commit('SET_EXISTINGQUOTE', snapshot.data())
                })
        },
    },
    getters: {},
    namespaced: true,
}
