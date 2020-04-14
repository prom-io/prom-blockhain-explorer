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
                class="text_accent link_underline"
                >{{ item.hash | truncate(10, "...") }}</router-link
              >
            </td>
            <td class="text_secondary">{{ item.blockNumber }}</td>
            <td class="text_secondary">{{ item.ago }}</td>
            <td class="text_secondary">{{ typeFormat(item.txType) }}</td>
            <td class="text_secondary">{{ item.value }}</td>
            <td>
              <div
                class="text_secondary link_underline cursor-pointer"
                v-on:click="fetchAllAddressTransactionPaginate(item.dataOwner)"
              >
                {{ addressFormat(item.dataOwner) | truncate(10, "...") }}
              </div>
            </td>
            <td>
              <div
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.dataValidator)
                "
                class="link_underline cursor-pointer text_accent"
              >
                {{ addressFormat(item.dataValidator) | truncate(10, "...") }}
              </div>
            </td>
            <td>
              <div
                class="text_secondary link_underline cursor-pointer"
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
              >
                {{ addressFormat(item.serviceNode) | truncate(10, "...") }}
              </div>
            </td>
            <td
              v-if="
                item.dataMart == '0x0000000000000000000000000000000000000000'
              "
            >
              N/A
            </td>
            <td v-else>
              <div
                v-on:click="fetchAllAddressTransactionPaginate(item.dataMart)"
                class="text_accent link_underline cursor-pointer"
              >
                {{ addressFormat(item.dataMart) | truncate(10, "...") }}
              </div>
            </td>
            <td class="text_secondary">{{ item.fee }}</td>
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
                class="text_accent link_underline"
                :to="{ name: 'Transaction', params: { hash: item.hash } }"
                >{{ item.hash | truncate(7, "...") }}</router-link
              >
            </td>
            <td>{{ item.ago }}</td>
            <td>{{ typeFormat(item.txType) }}</td>
            <td>{{ item.value | truncate(5, "...") }}</td>
            <td>
              <div
                v-on:click="fetchAllAddressTransactionPaginate(item.dataOwner)"
                class="text_secondary cursor-pointer link_underline"
              >
                {{ addressFormat(item.dataOwner) | truncate(7, "...") }}
              </div>
              <div
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.dataValidator)
                "
                class="cursor-pointer text_accent link_underline"
              >
                {{ addressFormat(item.dataValidator) | truncate(7, "...") }}
              </div>
            </td>
            <td
              v-if="
                item.dataMart == '0x0000000000000000000000000000000000000000'
              "
            >
              <span class="text_secondary"> N/A</span>
              <div
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
                class="cursor-pointer text_accent link_underline"
              >
                {{ addressFormat(item.serviceNode) | truncate(7, "...") }}
              </div>
            </td>
            <td v-else>
              <div
                v-on:click="fetchAllAddressTransactionPaginate(item.dataMart)"
                class="text_secondary cursor-pointer link_underline"
              >
                {{ addressFormat(item.dataMart) | truncate(7, "...") }}
              </div>
              <div
                v-on:click="
                  fetchAllAddressTransactionPaginate(item.serviceNode)
                "
                class="cursor-pointer text_accent link_underline"
              >
                {{ addressFormat(item.serviceNode) | truncate(7, "...") }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul class="pagination">
      <li v-bind:class="arrowDisabledPrevious" v-on:click="paginatePrevious">
        <i class="material-icons">chevron_left</i>
      </li>
      <li>
        <span>Page</span>
        <span class="active_page">{{ pageNumber + 1 }}</span>
        <span>of</span>
        <span>{{ pagination.pageNumbers }}</span>
      </li>
      <li v-bind:class="arrowDisabledNext" v-on:click="paginateNext">
        <i class="material-icons">chevron_right</i>
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
        pageSize: 15,
        pageNumbers: 0
      },
      transactions: []
    };
  },
  computed: {
    pageNumber: {
      get() {
        return this.getPageNumber;
      },
      set(value) {
        this.setPageNumberAC(value);
      }
    },
    arrowDisabledPrevious: function() {
      return {
        disabled: this.pageNumber == 0,
        "waves-effect": this.pageNumber > 0
      };
    },
    arrowDisabledNext: function() {
      return {
        disabled: this.pageNumber + 1 == this.pagination.pageNumbers,
        "waves-effect": this.pageNumber + 1 < this.pagination.pageNumbers
      };
    },

    ...mapGetters("transactions", ["getTransactions", "getPageNumber"])
  },
  methods: {
    async fetchAllTransactions() {
      let result = await this.fetchAllTransaction();
      this.transactions = result.data;
      console.log(this.transactions, "Transactions");
    },
    async fetchAllTransactionPaginate() {
      let result = await this.fetchTransactionsPaginate({
        ...this.pagination,
        page: this.pageNumber
      });
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
      if (this.pageNumber + 1 < this.pagination.pageNumbers) {
        this.setPageNumberAC(this.pageNumber + 1);
        this.fetchAllTransactionPaginate();
      }
    },
    async paginatePrevious() {
      if (this.pageNumber > 0) {
        this.setPageNumberAC(this.pageNumber - 1);
        this.fetchAllTransactionPaginate();
      }
    },
    ...mapActions("transactions", [
      "fetchAllTransaction",
      "setSearchQueryAC",
      "setPageNumberAC",
      "fetchTransactionsPaginate",
      "fetchAddressTransactionDetail"
    ])
  },
  beforeUpdate() {
    let address = this.$route.params.address;
    this.setSearchQueryAC(address);
    if (this.pageNumber > this.pagination.pageNumbers) {
      this.setPageNumberAC(0);
    }
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
