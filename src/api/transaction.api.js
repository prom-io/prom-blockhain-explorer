import httpClient from './httpClient';

export default {
	async allTransaction() {
		const request = await httpClient({
			method: 'GET',
			url: '/transaction'
		})

		if (request && request.data) {
		  return request.data
		}
	},

	async allTransactionAddress(address) {
		const request = await httpClient({
			method: 'GET',
			url: `/transaction/address/${address}`
		})

		if(request && request.data) {
			return request.data;
		}
	},

	async detailTransactionHash(hash) {
		const request = await httpClient({
			method: 'GET',
			url: `/transaction/hash/${hash}`
		})

		if(request && request.data) {
			return request.data;
		}
	},

	async allTransactionPaginate(pageNumber, pageSize) {
		const request = await httpClient({
		  method: 'GET',
		  url: `/transaction/paginate/${pageNumber}/${pageSize}`
		})

		if (request && request.data) {
		  return request.data
		}
	},

	async detailTransaction(queueNumber) {
		const request = await httpClient({
			method: 'GET',
			url: `/transaction/${queueNumber}`
		})

		if (request && request.data) {
		  return request.data
		}
	},

	async detailTransactionsAddress(address, pageNumber, pageSize) {
		const request = await httpClient({
			method: 'GET',
			url: `/transaction/address/${address}/paginate/${pageNumber}/${pageSize}`
		})

		if (request && request.data) {
		  return request.data
		}
	}
}