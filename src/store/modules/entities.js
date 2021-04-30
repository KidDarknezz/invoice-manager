import firebase from 'firebase/app'
import 'firebase/firebase-auth'

export default {
    state: {
        entities: '',
        logo: '',
        entityName: '',
        entityInfo: {},
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
        SET_ENTITYINFO: (state, payload) => {
            state.entityInfo = payload
        },
        RESET_STATES(state) {
            state.entities = ''
            state.logo = ''
            state.entityName = ''
            state.entityInfo = {}
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
                            data.id = doc.id
                            commit('SET_ENTITIES', doc.id)
                            commit('SET_LOGO', data.logo)
                            commit('SET_ENTITYNAME', data.name)
                            commit('SET_ENTITYINFO', {...data})
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
