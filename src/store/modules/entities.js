import firebase from 'firebase/app'
import 'firebase/firebase-auth'

export default {
    state: {
        entities: '',
        logo: '',
        entityName: '',
    },
    mutations: {
        SET_ENTITIES: (state, payload) => {
            state.entities = payload
        },
        SET_LOGO: (state, payload) => {
            state.logo = payload
        },
        SET_ENTITYNAME: (state, payload) => {
            state.entityName = payload
        },
    },
    actions: {
        async getEntities({commit, dispatch}, payload) {
            await firebase
                .firestore()
                .collection('entities')
                .where('members', 'array-contains', payload)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.data()) {
                            let data = doc.data()
                            commit('SET_ENTITIES', doc.id)
                            commit('SET_LOGO', data.logo)
                            commit('SET_ENTITYNAME', data.name)
                        }
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
    namespaced: true,
}
