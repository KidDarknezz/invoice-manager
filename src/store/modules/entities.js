import firebase from 'firebase/app'
import 'firebase/firebase-auth'

export default {
    state: {
        entities: '',
    },
    mutations: {
        SET_ENTITIES: (state, payload) => {
            state.entities = payload
        },
    },
    actions: {
        getEntities({commit, dispatch}, payload) {
            firebase
                .firestore()
                .collection('entities')
                .where('members', 'array-contains', payload)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.data()) commit('SET_ENTITIES', doc.id)
                    })
                })
                .catch(error => {
                    console.log('Error getting documents: ', error)
                })
        },
    },
    getters: {
        entities: state => state.entities,
    },
}
