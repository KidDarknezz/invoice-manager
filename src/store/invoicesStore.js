import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  allInvoices: []
}
const mutations = {
  setAllInvoices(state, payload) {
    state.allInvoices = payload
  }
}
const actions = {
  getAllInvoices({commit}, payload) {
    firebase.firestore().collection('invoices').get().then(snapshot => {
      let invoices = []
      snapshot.forEach(invoice => {
        let inv = invoice.data()
        inv.id = invoice.id
        invoices.push(inv)
      })
      commit("setAllInvoices", invoices)
    })
  },
  getInvoice({commit}, payload) {
    console.log('getting invoice from store')
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};