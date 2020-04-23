<template>
  <div class="row">
    <div class="table-wrapper">
      <!-- <div class="input-field">
	          <input id="search" type="search" @keydown="searchEnter(query, $event)" v-model="query" class="search_filter" required placeholder="Search by Address / Txn Hash">
	          <i class="material-icons icon_style" style="color: rgba(0, 0, 0, 0.54)" v-on:click="resetSearch()">close</i>
	          <i class="material-icons icon_style search_btn" style="color: rgba(0, 0, 0, 0.54);" v-on:click="search(query)">search</i>
	        </div> -->
      <h4>Sorry, Not Found</h4>
      <div class="cursor-pointer text_accent" v-on:click="goBack">Go back</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    goBack() {
      window.history.back();
    }
  },
  // 	search(query) {
  // 		query = query.trim();
  // 		if(query.length == 42) {
  // 			return this.$router.push({ name: 'AddressTransactionResult', params: { address: query } })
  // 		}

  // 		if(query.length == 66) {
  // 			return this.$router.push({ name: 'Transaction', params: { hash: query } })
  // 		}
  // 		this.$router.push({ name: 'NotFound' })
  // 	},
  // 	searchEnter(query, event) {
  // 		if(event.key == 'Enter') {
  // 			this.search(query)
  // 		}
  // 	},
  // },
  mounted() {
    let query = this.$route.params.query;
    this.query = query;
  }
};
</script>
