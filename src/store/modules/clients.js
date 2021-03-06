import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    state: {
        allClients: [],
    },
    mutations: {
        SET_ALLCLIENTS(state, payload) {
            state.allClients = payload
        },
        RESET_STATES(state) {
            state.allClients = []
        },
        // setModifiedClient(state, payload) {
        //     state.allClients[payload.index].name = payload.client.name
        //     state.allClients[payload.index].phone = payload.client.phone
        //     state.allClients[payload.index].email = payload.client.email
        // },
        // setRemovedClient(state, payload) {
        //     state.allClients.splice(payload, 1)
        // },
    },
    actions: {
        getClients({commit, rootState}) {
            firebase
                .firestore()
                .collection('clients')
                .where('entities', '==', rootState.entities.entities)
                .get()
                .then(querySnapshot => {
                    let data = []
                    querySnapshot.forEach(doc => {
                        data.push({id: doc.id, ...doc.data()})
                    })
                    commit('SET_ALLCLIENTS', data)
                })
        },
        createClient({rootState}, payload) {
            payload.entities = rootState.entities.entities
            firebase
                .firestore()
                .collection('clients')
                .add(payload)
        },
        deleteClient({commit, dispatch}, payload) {
            if (confirm('Delete client')) {
                firebase
                    .firestore()
                    .collection('clients')
                    .doc(payload)
                    .delete()
                    .then(() => {
                        console.log('Document successfully deleted!')
                        dispatch('getClients')
                    })
                    .catch(error => {
                        console.error('Error removing document: ', error)
                    })
            }
        },
    },
    getters: {
        allClients: state => state.allClients,
    },
    namespaced: true,
}
