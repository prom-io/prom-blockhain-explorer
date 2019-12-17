import Vue from 'vue'
import Router from 'vue-router'
import Transactions from '@/components/Transactions'
import AddressTransactions from '@/components/AddressTransactions'
import AddressTransactionResult from '@/components/AddressTransactionResult'
import Transaction from '@/components/Transaction'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Transactions',
			component: Transactions
		},
		{
			path: '/transaction/:hash',
			name: 'Transaction',
			component: Transaction
		},
		{
			path: '/address/transaction/find',
			name: 'AddressTransactions',
			component: AddressTransactions
		},
		{
			path: '/transaction/address/:address',
			name: 'AddressTransactionResult',
			component: AddressTransactionResult
		},
		{
			path: '/not/found',
			name: 'NotFound',
			component: NotFound
		}
	]
})