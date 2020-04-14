import api from "@/api/transaction.api";

const state = {
  transaction: {},
  searchQuery: "",
  transactions: [],
  pageNumber: 0
};

const getters = {
  getPageNumber: state => state.pageNumber,
  getSearchQuery: state => state.searchQuery,
  getTransaction: state => state.transaction,
  getTransactions: state => state.transactions
};

const actions = {
  async fetchAllTransaction({ commit }) {
    try {
      const response = await api.allTransaction();
      commit("setTransactions", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchAllAddressTransaction({ commit }, address) {
    try {
      const response = await api.allTransactionAddress(address);
      commit("setTransactions", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchTransactionDetailHash({ commit }, hash) {
    try {
      const response = await api.detailTransactionHash(hash);
      console.log(response, "RESPONSE");
      commit("setTransaction", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchTransactionsPaginate({ commit }, pagination) {
    try {
      const response = await api.allTransactionPaginate(
        pagination.page,
        pagination.pageSize
      );
      commit("setTransactions", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchTransactionDetail({ commit }, queueNumber) {
    try {
      const response = await api.detailTransaction(queueNumber);
      commit("setTransaction", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async fetchAddressTransactionDetail({ commit }, fetchDto) {
    try {
      const response = await api.detailTransactionsAddress(
        fetchDto.address,
        fetchDto.page,
        fetchDto.pageSize
      );
      commit("setTransactions", response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async setSearchQueryAC({ commit }, searchQuery) {
    commit("setSearchQuery", searchQuery);
  },
  async setPageNumberAC({ commit }, pageNumber) {
    commit("setPageNumber", pageNumber);
  }
};

const mutations = {
  setTransactions(state, data) {
    state.transactions = data;
  },
  setSearchQuery(state, data) {
    state.searchQuery = data;
  },
  setPageNumber(state, data) {
    state.pageNumber = data;
  },
  setTransaction(state, data) {
    state.transaction = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
