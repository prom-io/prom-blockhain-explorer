<template>
  <div class="row">
    <div class="table-wrapper">
      <!-- <div class="input-field">
	          <input id="search" type="search" @keydown="searchEnter(query, $event)" v-model="query" class="search_filter" required placeholder="Search by Address / Txn Hash">
	          <i class="material-icons icon_style" style="color: rgba(0, 0, 0, 0.54)" v-on:click="resetSearch()">close</i>
	          <i class="material-icons icon_style search_btn" style="color: rgba(0, 0, 0, 0.54);" v-on:click="search(query)">search</i>
	        </div> -->

      <table class="wide_screen_table">
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
          <tr v-for="item in transactions" :key="item.queueNumber">
            <td>{{ item.queueNumber }}</td>
            <td>
              <router-link
                :to="{ name: 'Transaction', params: { hash: item.hash } }"
                >{{ item.hash | truncate(10, "...") }}</router-link
              >
            </td>
            <td>{{ item.blockNumber }}</td>
            <td>{{ item.ago }}</td>
            <td>{{ typeFormat(item.txType) }}</td>
            <td>{{ item.value }}</td>
            <td>
              <a
                v-on:click="fetchAllAddressTransactionPaginate(item.dataOwner)"
                href="#"
                >{{ addressFormat(item.dataOwner) | truncate(10, "...") }}</a
              >
            </td>
            <td>
              <a
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.dataValidator)
                "
                href="#"
                >{{
                  addressFormat(item.dataValidator) | truncate(10, "...")
                }}</a
              >
            </td>
            <td>
              <a
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
                href="#"
                >{{ addressFormat(item.serviceNode) | truncate(10, "...") }}</a
              >
            </td>
            <td
              v-if="
                item.dataMart == '0x0000000000000000000000000000000000000000'
              "
            >
              N/A
            </td>
            <td v-else>
              <a
                v-on:click="fetchAllAddressTransactionPaginate(item.dataMart)"
                href="#"
                >{{ addressFormat(item.dataMart) | truncate(10, "...") }}</a
              >
            </td>
            <td>{{ item.fee }}</td>
          </tr>
        </tbody>
      </table>
      <table class="mobile_screen_table">
        <thead>
          <tr>
            <th>#</th>
            <th><span>Txn</span> <span>Hash</span></th>
            <th>Time</th>
            <th><span>Txn</span> <span>Type</span></th>
            <th>Value</th>
            <th><span>Data Owner</span><span>Data Validator</span></th>
            <th><span>Data Mart</span> <span>Service Node </span></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in transactions" :key="item.queueNumber">
            <td>{{ item.queueNumber }}</td>
            <td>
              <router-link
                :to="{ name: 'Transaction', params: { hash: item.hash } }"
                >{{ item.hash | truncate(10, "...") }}</router-link
              >
            </td>
            <td>{{ item.ago }}</td>
            <td>{{ typeFormat(item.txType) }}</td>
            <td>{{ item.value }}</td>
            <td>
              <a
                v-on:click="fetchAllAddressTransactionPaginate(item.dataOwner)"
                href="#"
                class="text_secondary"
                >{{ addressFormat(item.dataOwner) | truncate(10, "...") }}</a
              >
              <a
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.dataValidator)
                "
                href="#"
                >{{
                  addressFormat(item.dataValidator) | truncate(10, "...")
                }}</a
              >
            </td>
            <td
              v-if="
                item.dataMart == '0x0000000000000000000000000000000000000000'
              "
            >
              <span class="text_secondary"> N/A</span>
              <a
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
                href="#"
                >{{ addressFormat(item.serviceNode) | truncate(10, "...") }}</a
              >
            </td>
            <td v-else>
              <a
                v-on:click="fetchAllAddressTransactionPaginate(item.dataMart)"
                href="#"
                class="text_secondary"
                >{{ addressFormat(item.dataMart) | truncate(10, "...") }}</a
              >
              <a
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
                href="#"
                >{{ addressFormat(item.serviceNode) | truncate(10, "...") }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="pagination">
      <li v-bind:class="arrowDisabledPrevious" v-on:click="paginatePrevious">
        <a href="#!"><i class="material-icons">chevron_left</i></a>
      </li>
      <li>
        <span>Page</span>
        <span class="active_page">{{ pagination.page + 1 }}</span>
        <span>of</span>
        <span>{{ pagination.pageNumbers }}</span>
      </li>
      <li v-bind:class="arrowDisabledNext" v-on:click="paginateNext">
        <a href="#!"><i class="material-icons">chevron_right</i></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Transactions",

  data() {
    return {
      pagination: {
        address: "",
        page: 0,
        pageSize: 15,
        pageNumbers: 0
      },
      query: "",
      transactions: []
    };
  },
  computed: {
    arrowDisabledPrevious: function() {
      return {
        disabled: this.pagination.page == 0,
        "waves-effect": this.pagination.page > 0
      };
    },
    arrowDisabledNext: function() {
      return {
        disabled: this.pagination.page + 1 == this.pagination.pageNumbers,
        "waves-effect": this.pagination.page + 1 < this.pagination.pageNumbers
      };
    },
    ...mapGetters("transactions", ["getTransactions"])
  },
  methods: {
    async fetchAllTransactions() {
      let result = await this.fetchAllTransaction();
      this.transactions = result.data;
      console.log(this.transactions, "Transactions");
    },
    async fetchAllTransactionPaginate() {
      let result = await this.fetchTransactionsPaginate(this.pagination);
      this.pagination.pageNumbers = result.pageNumbers;
      this.transactions = result.data;
    },
    async fetchAllAddressTransactionPaginate(address) {
      this.$router.push({
        name: "AddressTransactionResult",
        params: { address }
      });
      // this.pagination.address = address;
      // let result = await this.fetchAddressTransactionDetail(this.pagination)
      // this.pagination.pageNumbers = result.pageNumbers;
      // this.transactions = result.data;
    },
    typeFormat: type => {
      const types = {
        dataUpload: "U",
        dataPurchase: "P"
      };
      return types[type];
    },
    addressFormat: address => {
      if (address == "0x0000000000000000000000000000000000000000") {
        return "N/A";
      }
      return address;
    },
    async paginateNext() {
      if (this.pagination.page < this.pagination.pageNumbers) {
        this.pagination.page += 1;
      }

      this.fetchAllTransactionPaginate();
    },
    async paginatePrevious() {
      if (this.pagination.page > 0) {
        this.pagination.page -= 1;
      }
      this.fetchAllTransactionPaginate();
    },
    ...mapActions("transactions", [
      "fetchAllTransaction",
      "setSearchQueryAC",
      "fetchTransactionsPaginate",
      "fetchAddressTransactionDetail"
    ])
  },
  beforeUpdate() {
    let address = this.$route.params.address;
    console.log(address, "|||||||||||||");
    this.setSearchQueryAC(address);
  },
  mounted() {
    let address = this.$route.params.address;

    this.fetchAllTransactionPaginate();
    this.setSearchQueryAC(address);
  }
};
</script>

<style scope>
.btn_background {
  background-color: #cf6859;
}

.active_page {
  color: #cf6859;
}
</style>
