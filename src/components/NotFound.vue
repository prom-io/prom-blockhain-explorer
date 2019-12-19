<template>
	<div class="row">
		<div class="nav-wrapper">
	        <div class="input-field">
	          <input id="search" type="search" @keydown="searchEnter(query, $event)" v-model="query" class="search_filter" required placeholder="Search by Address / Txn Hash">
	          <i class="material-icons icon_style" style="color: rgba(0, 0, 0, 0.54)" v-on:click="resetSearch()">close</i>
	          <i class="material-icons icon_style search_btn" style="color: rgba(0, 0, 0, 0.54);" v-on:click="search(query)">search</i>
	        </div>
	    </div>
	    <h1>Sorry Not found</h1>
	</div>
</template>

<script>
	export default {
		name: 'NotFound',
		data() {
	        return {
	        	query: ''
	        }
	    },
		methods: {
			search(query) {
	    		query = query.trim();
	    		if(query.length == 42) {
	    			return this.$router.push({ name: 'AddressTransactionResult', params: { address: query } })
	    		}

	    		if(query.length == 66) {
	    			return this.$router.push({ name: 'Transaction', params: { hash: query } })
	    		}
	    		this.$router.push({ name: 'NotFound' })
	    	},
	    	searchEnter(query, event) {
	    		if(event.key == 'Enter') {
	    			this.search(query)
	    		}
	    	},
		}
	};
</script>