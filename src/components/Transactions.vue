<template>
	<table>
        <thead>
			<tr>
				<th>#</th>
				<th>Hash</th>
				<th>Block</th>
				<th>Service Node</th>
				<th>Data Validator</th>
				<th>Data Owner</th>
				<th>Data Mart</th>
				<th>Tx time ago</th>
				<th>Tx type</th>
				<th>Value</th>
			</tr>
        </thead>

        <tbody>
          <tr v-for="item in transactions">
          	<td>{{ item.queueNumber }}</td>
            <td>
            	<router-link :to="{ name: 'Transaction', params: { hash: item.hash }}">{{ item.hash | truncate(50, '...') }}</router-link>
            </td>
            <td>{{ item.blockNumber }}</td>
            <td>
            	<router-link :to="{ name: 'AddressTransactionResult', params: { address: item.serviceNode }}">{{ item.serviceNode | truncate(10, '...') }}</router-link>
            </td>
            <td>
            	<router-link :to="{ name: 'AddressTransactionResult', params: { address: item.dataValidator }}">{{ item.dataValidator | truncate(10, '...') }}</router-link>
            </td>
            <td>
            	<router-link :to="{ name: 'AddressTransactionResult', params: { address: item.dataOwner }}">{{ item.dataOwner | truncate(10, '...') }}</router-link>
            </td>
            <td>
            	<router-link :to="{ name: 'AddressTransactionResult', params: { address: item.dataMart }}">{{ item.dataMart | truncate(10, '...') }}</router-link>
            </td>
            <td>{{ item.ago }}</td>
            <td>{{ item.txType }}</td>
            <td>{{ item.value }} PROM</td>
          </tr>
        </tbody>
      </table>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Transactions",
		data() {
	        return {
	        	transactions: []
	        }
	    },
	    computed: {
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	async fetchAllTransactions() {
				let result = await this.fetchAllTransaction();
				this.transactions = result.data;
	            console.log(this.transactions, 'Transactions');
	    	},
	        ...mapActions('transactions', ['fetchAllTransaction'])
	    },
	    mounted() {
            this.fetchAllTransactions();
	    }
	};
</script>