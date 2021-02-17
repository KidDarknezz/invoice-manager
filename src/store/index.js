import Vue from 'vue'
import Vuex from 'vuex'

import clientsStore from './clientsStore'
import quotesStore from './quotesStore'
import invoicesStore from './invoicesStore'
import documentsStore from './documentsStore'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      clientsStore,
      invoicesStore,
      documentsStore,
      quotesStore
    },
    strict: process.env.DEV,
  });

  return Store;
}