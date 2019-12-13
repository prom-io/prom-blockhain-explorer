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
				<td>Service Node:</td>
				<td>{{ serviceNode }}</td>
			</tr>
			<tr>
				<td>Data Validator:</td>
				<td>{{ dataValidator }}</td>
			</tr>
			<tr>
				<td>Data Owner:</td>
				<td>{{ dataOwner }}</td>
			</tr>
			<tr>
				<td>Data Mart:</td>
				<td>{{ dataMart }}</td>
			</tr>
			<tr>
				<td>Value:</td>
				<td>{{ value }} PROM</td>
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
	        	serviceNode: '',
	        	dataValidator: '',
	        	dataOwner: '',
	        	dataMart: '',
	        	value: 0,
	        	fee: 0
	        }
	    },
	    computed: {
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	async fetchDetailTransaction(hash) {
	    		console.log(hash, "HASHHASHHASHAHSHSHS");
				let transaction = await this.fetchTransactionDetailHash(hash);
				console.log(transaction);
				console.log(transaction, 'TRANSACTION');
				this.hash = transaction.hash;
				this.status = transaction.status;
				this.block = transaction.blockNumber;
				this.fee = transaction.gasUsed;
				this.serviceNode = transaction.serviceNode;
				this.dataValidator = transaction.dataValidator;
				this.dataOwner = transaction.dataOwner;
				this.dataMart = transaction.dataMart;
				this.value = transaction.value;
	    	},
	        ...mapActions('transactions', ['fetchTransactionDetailHash'])
	    },
	    mounted() {
            let hash = this.$route.params.hash;
			this.fetchDetailTransaction(hash);
	    }
	};
</script>