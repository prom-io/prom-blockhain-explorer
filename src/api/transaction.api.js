import httpClient from './httpClient';

export default {
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