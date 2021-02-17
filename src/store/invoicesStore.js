import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  allInvoices: [],
}
const mutations = {
  setAllInvoices(state, payload) {
    state.allInvoices = payload
  },
  setExistingInvoice(state, payload) {
    state.existingInvoice = payload
  }
}
const actions = {
  getAllInvoices({ commit }, payload) {
    firebase.firestore().collection('invoices').orderBy("number", "desc").get().then(snapshot => {
      let invoices = []
      snapshot.forEach(invoice => {
        let inv = invoice.data()
        inv.id = invoice.id
        invoices.push(inv)
      })
      commit("setAllInvoices", invoices)
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
};