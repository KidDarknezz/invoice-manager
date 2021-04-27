import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
    allClients: [],
}
const mutations = {
    setAddedClient(state, payload) {
        state.allClients.push(payload)
    },
    setModifiedClient(state, payload) {
        state.allClients[payload.index].name = payload.client.name
        state.allClients[payload.index].phone = payload.client.phone
        state.allClients[payload.index].email = payload.client.email
    },
    setRemovedClient(state, payload) {
        state.allClients.splice(payload, 1)
    },
}
const actions = {
    getClients({commit}, payload) {
        firebase
            .firestore()
            .collection('clients')
            .onSnapshot(snapshot => {
                let changes = snapshot.docChanges()
                let client
                changes.forEach(change => {
                    if (change.type == 'added') {
                        client = change.doc.data()
                        client.id = change.doc.id
                        commit('setAddedClient', client)
                    } else if (change.type == 'modified') {
                        client = change.doc.data()
                        client.id = change.doc.id
                        commit('setModifiedClient', {client: client, index: change.oldIndex})
                    } else if (change.type == 'removed') {
                        commit('setRemovedClient', change.oldIndex)
                    }
                })
            })
    },
    createClient({}, payload) {
        firebase.firestore().collection('clients').add(payload)
    },
    deleteClient({}, payload) {
        if (confirm('Delete client')) {
            firebase
                .firestore()
                .collection('clients')
                .doc(payload)
                .delete()
                .then(() => {
                    console.log('Document successfully deleted!')
                })
                .catch(error => {
                    console.error('Error removing document: ', error)
                })
        }
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
