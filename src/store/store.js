import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import transactions from './modules/transactions.module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    transactions
  }
})

export { store }
