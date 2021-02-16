import Vue from 'vue'
import Vuex from 'vuex'

import clientsStore from './clientsStore'
import invoicesStore from './invoicesStore'

Vue.use(Vuex)

export default function() {
  const Store = new Vuex.Store({
    modules: {
      clientsStore,
      invoicesStore,
    },
    strict: process.env.DEV,
  });

  return Store;
}