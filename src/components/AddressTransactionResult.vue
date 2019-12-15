<template>
	<div class="row">
		<div class="input-field col s12">
			<input placeholder="Input address" id="address" type="text" class="validate" v-model="address">
			<router-link :to="{ name: 'AddressTransactionResult', params: { address: address }}" class="waves-effect waves-light btn">Search</router-link>
		</div>
		<table>
	        <thead>
				<tr>
					<th>#</th>
					<th>Txn Hash</th>
					<th>Block</th>
					<th>Time</th>
					<th>Txn Type</th>
					<th>Value</th>
					<th>Data Owner</th>
					<th>Data Validator</th>
					<th>Service Node</th>
					<th>Data Mart</th>
					<th>Txn Fee</th>
				</tr>
	        </thead>

	        <tbody>
	          <tr v-for="item in transactions">
	          	<td>{{ item.queueNumber }}</td>
	            <td>
	            	<router-link :to="{ name: 'Transaction', params: { hash: item.hash }}">{{ item.hash | truncate(10, '...') }}</router-link>
	            </td>
	            <td>{{ item.blockNumber }}</td>
	            <td>{{ item.ago }}</td>
	            <td>{{ typeFormat(item.txType) }}</td>
	            <td>{{ item.value }}</td>
	            <td>
	            	<a v-on:click="fetchAllAddressTransactionPaginate(item.dataOwner)" href="#">{{ addressFormat(item.dataOwner) | truncate(10, '...') }}</a>
	            </td>
	            <td>
	            	<a v-on:click="fetchAllAddressTransactionPaginate(item.dataValidator)" href="#">{{ addressFormat(item.dataValidator) | truncate(10, '...') }}</a>
	            </td>
	            <td>
	            	<a v-on:click="fetchAllAddressTransactionPaginate(item.serviceNode)" href="#">{{ addressFormat(item.serviceNode) | truncate(10, '...') }}</a>
	            </td>
	            <td>
	            	<a v-on:click="fetchAllAddressTransactionPaginate(item.dataMart)" href="#">{{ addressFormat(item.dataMart) | truncate(10, '...') }}</a>
	            </td>
	            <td>{{ item.fee }}</td>
	          </tr>
	        </tbody>
	      </table>
	      <ul class="pagination">
		    <!-- <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li> -->
		    <li v-bind:class="arrowDisabledPrevious" v-on:click="paginatePrevious"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
		    <li>Page {{ pagination.page + 1 }} of {{ pagination.pageNumbers }}</li>
		    <li v-bind:class="arrowDisabledNext" v-on:click="paginateNext"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
		  </ul>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "AddressTransactionResult",
		data() {
	        return {
	        	pagination: {
	        		address: '',
	        		page: 0,
	        		pageSize: 15,
	        		pageNumbers: 0
	        	},
	        	address: '',
	        	transactions: []
	        }
	    },
	    computed: {
	    	arrowDisabledPrevious: function() {
	    		return {
	    			disabled: this.pagination.page == 0,
	    			'waves-effect': this.pagination.page > 0
	    		}
	    	},
	    	arrowDisabledNext: function() {
				return {
	    			disabled: (this.pagination.page + 1) == this.pagination.pageNumbers,
	    			'waves-effect': (this.pagination.page + 1) < this.pagination.pageNumbers
	    		}
	    	},
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	async fetchAllTransactions(address) {
				let result = await this.fetchAllAddressTransaction(address);
				this.transactions = result.data;
				console.log(this.transactions)
	    	},
	    	async fetchAllTransactionPaginate() {
	    		let result = await this.fetchAddressTransactionDetail(this.pagination);
	    		this.pagination.pageNumbers = result.pageNumbers;
	    		this.transactions = result.data;
	    	},
	    	typeFormat: (type) => {
	    		const types = {
	    			'dataUpload': 'U',
	    			'dataPurchase': 'P'
	    		};
	    		return types[type];
	    	},
	    	addressFormat: (address) => {
	    		if(address == '0x0000000000000000000000000000000000000000') {
	    			return 'N/A';
	    		}
	    		return address;
	    	},
	        async paginateNext() {
	    		if(this.pagination.page < this.pagination.pageNumbers) {
	    			this.pagination.page += 1;
	    		}
	    		
	    		this.fetchAllTransactionPaginate();
	    	},
	    	async fetchAllAddressTransactionPaginate(address) {
	    		this.$router.push({ name: 'AddressTransactionResult', params: { address: address } })
	    		console.log("FETCH");
	    		this.pagination.address = address;
            	this.fetchAllTransactionPaginate();
	    	},
	    	async paginatePrevious() {
	    		if(this.pagination.page > 0) {
	    			this.pagination.page -= 1;
	    		}
	    		this.fetchAllTransactionPaginate();
	    	},
	        ...mapActions('transactions', [
	        	'fetchAllTransaction', 
	        	'fetchAddressTransactionDetail'
	        ])
	    },
	    mounted() {
	    	let address = this.$route.params.address;
	    	this.pagination.address = address;
            this.fetchAllTransactionPaginate();
	    }
	};
</script>