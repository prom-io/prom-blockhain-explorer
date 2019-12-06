<template>
	<table>
		<tbody>
			<tr>
				<td>Transaction Hash:</td>
				<td>{{ hash }}</td>
			</tr>
			<tr>
				<td>Status:</td>
				<td>{{ status }}</td>	
			</tr>
			<tr>
				<td>Block:</td>
				<td>{{ block }}</td>
			</tr>
			<tr>
				<td>From:</td>
				<td>{{ from }}</td>
			</tr>
			<tr>
				<td>To:</td>
				<td>{{ to }}</td>
			</tr>
			<tr>
				<td>Value:</td>
				<td>{{ value }} ETH</td>
			</tr>
			<tr>
				<td>Gas Used:</td>
				<td>{{ fee }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: 'Transaction',
		data() {
	        return {
	        	hash: '',
	        	status: false,
	        	block: 0,
	        	from: '',
	        	to: '',
	        	value: 0,
	        	fee: 0
	        }
	    },
	    computed: {
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	async fetchDetailTransaction(queueNumber) {
				let transaction = await this.fetchTransactionDetail(queueNumber);
				console.log(transaction);
				console.log(transaction, 'TRANSACTION');
				this.hash = transaction.hash;
				this.status = transaction.status;
				this.block = transaction.blockNumber;
				this.fee = transaction.gasUsed;
				this.from = transaction.from;
				this.to = transaction.to;
				this.value = transaction.value;
	    	},
	        ...mapActions('transactions', ['fetchTransactionDetail'])
	    },
	    mounted() {
            let queueNumber = this.$route.params.queueNumber;
			this.fetchDetailTransaction(queueNumber);
	    }
	};
</script>