import api from "@/api/transaction.api"

const state = {
    transaction: {},
    transactions: []
}

const getters = {
    getTransactions: state => state.transactions,
}

const actions = {
    async fetchAllTransaction({ commit }) {
        try {
            const response = await api.allTransaction();
            commit('setTransactions', response);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async fetchAllAddressTransaction({ commit }, address) {
        try {
            const response = await api.allTransactionAddress(address);
            commit('setTransactions', response);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async fetchTransactionDetailHash({ commit }, hash) {
        try {
            const response = await api.detailTransactionHash(hash);
            console.log(response, 'RESPONSE');
            commit('setTransaction', response);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async fetchTransactionsPaginate({ commit }, pagination) {
        try {
            const response = await api.allTransactionPaginate(pagination.pageNumber, pagination.pageSize);
            commit('setTransactions', response);
            return response;
        } catch (error) {
            throw error;
        }    
    },

    async fetchTransactionDetail({ commit }, queueNumber) {
        try {
            const response = await api.detailTransaction(queueNumber);
            commit('setTransaction', response);
            return response;
        } catch (error) {
            throw error;
        }
    }, 

    async fetchAddressTransactionDetail({ commit }, fetchDto) {
        try {
            const response = await api.detailTransactionsAddress(
                fetchDto.address,
                fetchDto.pageNumber, 
                fetchDto.pageSize
            );
            commit('setTransactions', response);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const mutations = {
    setTransactions(state, data) {
        state.transactions = data;
    },
    setTransaction(state, data) {
        state.transaction = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}