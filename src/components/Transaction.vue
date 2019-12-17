<template>
	<table>
		<tbody>
			<tr>
				<td>Transaction Hash:</td>
				<td>{{ hash }}</td>
			</tr>
			<tr>
				<td>Status:</td>
				<td>{{ statusText }}</td>	
			</tr>
			<tr>
				<td>Block:</td>
				<td>{{ block }}</td>
			</tr>
			<tr>
				<td>Timestamp:</td>
				<td>{{ ago }} ({{ full_date }})</td>
			</tr>
			<tr>
				<td>Operation type:</td>
				<td>{{ operationFormat(operationType) }}</td>
			</tr>
			<tr>
				<td>Service Node:</td>
				<td>
					<router-link :to="{ name: 'AddressTransactionResult', params: { address: serviceNode }}">{{ serviceNode }}</router-link>
				</td>
			</tr>
			<tr>
				<td>Data Validator:</td>
				<td>
					<router-link :to="{ name: 'AddressTransactionResult', params: { address: dataValidator }}">{{ dataValidator }}</router-link>
				</td>
			</tr>
			<tr>
				<td>Data Owner:</td>
				<td>
					<router-link :to="{ name: 'AddressTransactionResult', params: { address: dataOwner }}">{{ dataOwner }}</router-link>
				</td>
			</tr>
			<tr>
				<td>Data Mart:</td>
				<td>
					<router-link :to="{ name: 'AddressTransactionResult', params: { address: dataMart }}">{{ dataMart }}</router-link>
				</td>
			</tr>
			<template v-if="operationType == 'dataUpload'">
				<tr>
					<td>Out of Data Validator {{ payData.out.dataValidator }}</td>
					<td>In to Service Node {{ payData.in.serviceNode }}</td>
				</tr>
			</template>
			<template v-if="operationType == 'dataPurchase'">
				<tr>
					<td>Out of Data Mart {{ payData.out.dataMart }}</td>
					<td>In to Data Validator {{ payData.in.dataValidator }} and in to Data Owner {{ payData.in.dataOwner }}</td>
				</tr>
			</template>
			<tr>
				<td>Value:</td>
				<td>{{ value }} PROM</td>
			</tr>
			<tr>
				<td>Transaction Fee:</td>
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
	        	statusText: '',
	        	block: 0,
	        	operationType: '',
	        	serviceNode: '',
	        	dataValidator: '',
	        	dataOwner: '',
	        	dataMart: '',
	        	value: 0,
	        	ago: '',
	        	full_date: '',
	        	fee: 0,
	        	payData: {
	        		in: {
	        			serviceNode: 0,
	        			dataValidator: 0,
	        			dataMart: 0,
	        			dataOwner: 0
	        		},
	        		out: {
	        			serviceNode: 0,
	        			dataValidator: 0,
	        			dataMart: 0,
	        			dataOwner: 0
	        		}
	        	}
	        }
	    },
	    computed: {
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	operationFormat(operation) {
	    		let types = {
	    			'dataUpload': 'Data Upload',
	    			'dataPurchase': 'Data Purchase'
	    		};
	    		return types[operation];
	    	},
	    	async fetchDetailTransaction(hash) {
				try {
					let transaction = await this.fetchTransactionDetailHash(hash);					
				} catch(e) {
					this.$router.push({ name: 'NotFound' })
				}

				this.hash = transaction.hash;
				this.status = transaction.status;
				if(transaction.status) {
					this.statusText = 'Success!';
				} else {
					this.statusText = 'Failed!';
				}

				
				this.block = transaction.blockNumber;
				this.fee = transaction.fee;
				this.serviceNode = transaction.serviceNode;
				this.dataValidator = transaction.dataValidator;
				this.dataOwner = transaction.dataOwner;
				this.dataMart = transaction.dataMart;
				this.value = transaction.value;
				this.ago = transaction.ago;
				this.full_date = transaction.full_date;
				this.operationType = transaction.txType;

				this.payData.in.serviceNode = transaction.payData.in.serviceNode;
				this.payData.in.dataValidator = transaction.payData.in.dataValidator;
				this.payData.in.dataMart = transaction.payData.in.dataMart;
				this.payData.in.dataOwner = transaction.payData.in.dataOwner;

				this.payData.out.serviceNode = transaction.payData.out.serviceNode;
				this.payData.out.dataValidator = transaction.payData.out.dataValidator;
				this.payData.out.dataMart = transaction.payData.out.dataMart;
				this.payData.out.dataOwner = transaction.payData.out.dataOwner;
	    	},
	        ...mapActions('transactions', ['fetchTransactionDetailHash'])
	    },
	    mounted() {
            let hash = this.$route.params.hash;
            this.fetchDetailTransaction(hash);
	    }
	};
</script>