<template>
	<table>
        <thead>
          <tr>
              <th>#</th>
              <th>Hash</th>
              <th>Block</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in transactions">
          	<td>{{ item.queueNumber }}</td>
            <td>
            	<router-link :to="{ name: 'Transaction', params: { queueNumber: item.queueNumber }}">{{ item.hash | truncate(50, '...') }}</router-link>
            </td>
            <td>{{ item.blockNumber }}</td>
            <td>{{ item.from | truncate(10, '...') }}</td>
            <td>{{ item.to | truncate(10, '...') }}</td>
            <td>{{ item.value }} eth</td>
          </tr>
        </tbody>
      </table>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "AddressTransactionResult",
		data() {
	        return {
	        	transactions: []
	        }
	    },
	    computed: {
	        ...mapGetters('transactions', ['getTransactions'])
	    },
	    methods: {
	    	async fetchAllTransactionsPaginate(address) {

				let result = await this.fetchAddressTransactionDetail({
					'address': address, 
					'pageNumber': 1, 
					'pageSize': 15
				});
				this.transactions = result.data;
	    	},
	        ...mapActions('transactions', ['fetchAddressTransactionDetail'])
	    },
	    mounted() {
	    	let address = this.$route.params.address;
            this.fetchAllTransactionsPaginate(address);
            // console.log(result);
	    }
	};
</script>