import firebase from 'firebase/app'
import 'firebase/firestore'
import router from "../router";

const state = {
  existingDocument: {},
  newInvoice: '',
  newOuote: ''
}
const mutations = {
  setExistingDocument(state, payload) {
    state.existingDocument = payload
  },
  setNewInvoiceNo(state, payload) {
    state.newInvoice = payload
  },
  setNewQuoteNo(state, payload) {
    state.newQuote = payload
  }
}
const actions = {
  getDocument({ commit }, payload) {
    firebase.firestore().collection(`${payload.type}s`).doc(payload.id).get().then(snapshot => {
      commit("setExistingDocument", snapshot.data())
    })
  },
  saveDocument({ }, payload) {
    if (confirm('Save document?')) {
      let collection = `${payload.type}s`
      if (payload.type == 'invoice') {
        firebase.firestore().collection('general').doc('ZREbent3SGQ7OoMwgRUN').update({ lastInvoice: payload.number })
      }
      if (payload.type == 'quote') {
        firebase.firestore().collection('general').doc('ZREbent3SGQ7OoMwgRUN').update({ lastQuote: payload.number })
      }
      firebase.firestore().collection(collection).add(payload).then(resp => {
        router.push(`/document/${resp.id}/${payload.type}`);
      })
    }
  },
  getGeneralInfo({ commit }, payload) {
    firebase.firestore().collection('general').doc('ZREbent3SGQ7OoMwgRUN').get().then(snapshot => {
      let lastInvoice = snapshot.data().lastInvoice
      let lastQuote = snapshot.data().lastQuote
      //
      let newInvoice = parseInt(lastInvoice) + 1
      let newInvoiceString = `${newInvoice}`
      while (newInvoiceString.length < 5) {
        newInvoiceString = '0' + newInvoiceString
      }
      commit("setNewInvoiceNo", newInvoiceString)

      let newQuote = parseInt(lastQuote) + 1
      let newQuoteString = `${newQuote}`
      while (newQuoteString.length < 5) {
        newQuoteString = '0' + newQuoteString
      }
      commit("setNewQuoteNo", newQuoteString)

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

