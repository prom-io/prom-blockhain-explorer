<template>
  <div class="table-wrapper transaction">
    <div
      v-on:click="goBack"
      style="margin-bottom: 20px; display: flex; align-items: center; font-size: 20px"
      class="cursor-pointer text_accent"
    >
      <svg
        style="margin-right: 10px"
        width="26"
        height="16"
        viewBox="0 0 26 16"
        stroke="#FB6C1C"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.75 14.75L1 8M1 8L7.75 1.25M1 8L25 8"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Go back</span>
    </div>
    <table class="transaction_table">
      <tbody>
        <tr>
          <td class="table__head_item">
            Value:
          </td>
          <td class="accent">{{ value }} PROM</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Transaction Hash:
          </td>
          <td class="break_all">{{ hash }}</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Status:
          </td>
          <td>{{ statusText }}</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Block:
          </td>
          <td>{{ block }}</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Timestamp:
          </td>
          <td>{{ ago }} ({{ full_date }})</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Operation type:
          </td>
          <td>{{ operationFormat(operationType) }}</td>
        </tr>
        <tr>
          <td class="table__head_item">
            Service Node:
          </td>
          <td>
            <router-link
              class="break_all"
              :to="{
                name: 'AddressTransactionResult',
                params: { address: serviceNode }
              }"
              >{{ serviceNode }}</router-link
            >

            <template v-if="operationType == 'dataUpload'">
              <span class="pt-10 break_all"
                >+ {{ payData.in.serviceNode }}</span
              >
            </template>
            <template v-if="operationType == 'dataPurchase'">
              <span class="pt-10 break_all">{{ payData.out.serviceNode }}</span>
            </template>
          </td>
        </tr>
        <tr>
          <td class="table__head_item">
            Data Validator:
          </td>
          <td>
            <router-link
              class="break_all"
              :to="{
                name: 'AddressTransactionResult',
                params: { address: dataValidator }
              }"
              >{{ dataValidator }}</router-link
            >

            <template v-if="operationType == 'dataUpload'">
              <span class="pt-10 break_all"
                >- {{ payData.out.dataValidator }}</span
              >
            </template>
            <template v-if="operationType == 'dataPurchase'">
              <span class="pt-10 break_all"
                >+ {{ payData.in.dataValidator }}</span
              >
            </template>
          </td>
        </tr>
        <tr>
          <td class="table__head_item">
            Data Owner:
          </td>
          <td>
            <router-link
              class="break_all"
              :to="{
                name: 'AddressTransactionResult',
                params: { address: dataOwner }
              }"
              >{{ dataOwner }}</router-link
            >
            <template v-if="operationType == 'dataPurchase'">
              <span class="pt-10 break_all">+ {{ payData.in.dataOwner }}</span>
            </template>
            <template v-if="operationType == 'dataUpload'">
              <span class="pt-10 break_all">{{ payData.out.dataOwner }}</span>
            </template>
          </td>
        </tr>
        <tr>
          <td class="table__head_item">
            Data Mart:
          </td>
          <td v-if="dataMart == '0x0000000000000000000000000000000000000000'">
            N/A
          </td>
          <td v-else>
            <router-link
              class="break_all"
              :to="{
                name: 'AddressTransactionResult',
                params: { address: dataMart }
              }"
              >{{ dataMart }}</router-link
            >
            <template v-if="operationType == 'dataPurchase'">
              <span class="pt-10 break_all">- {{ payData.out.dataMart }}</span>
            </template>
            <template v-if="operationType == 'dataUpload'">
              <span class="pt-10 break_all">{{ payData.out.dataMart }}</span>
            </template>
          </td>
        </tr>
        <!-- <template v-if="operationType == 'dataUpload'">
					<tr>
						<td>Data Validator: {{ dataValidator }}</td>
						<td>- {{ payData.out.dataValidator }}</td>
					</tr>
					<tr>
						<td>Service Node: {{ serviceNode }}</td>
						<td>+ {{ payData.in.serviceNode }}</td>
					</tr>
				</template>
				<template v-if="operationType == 'dataPurchase'">
					<tr>
						<td>Data Mart: {{ dataMart }}</td>
						<td>-{{ payData.out.dataMart }}</td>
					</tr>
					<tr>
						<td>Data Validator: {{ dataValidator }}</td>
						<td>+ {{ payData.in.dataValidator }}</td>
					</tr>
					<tr>
						<td>Data Owner {{ dataOwner }}</td>
						<td>+ {{ payData.in.dataOwner }}</td>
					</tr>
				</template> -->

        <tr>
          <td class="table__head_item">
            Transaction Fee:
          </td>
          <td>{{ fee }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Transaction",
  data() {
    return {
      hash: "",
      status: false,
      statusText: "",
      block: 0,
      operationType: "",
      serviceNode: "",
      dataValidator: "",
      dataOwner: "",
      dataMart: "",
      value: 0,
      ago: "",
      full_date: "",
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
    };
  },
  computed: {
    ...mapGetters("transactions", ["getTransactions"])
  },
  methods: {
    goBack() {
      window.history.back();
    },
    operationFormat(operation) {
      let types = {
        dataUpload: "Data Upload",
        dataPurchase: "Data Purchase"
      };
      return types[operation];
    },
    async fetchDetailTransaction(hash) {
      try {
        let transaction = await this.fetchTransactionDetailHash(hash);
        this.hash = transaction.hash;
        this.status = transaction.status;
        if (transaction.status) {
          this.statusText = "Success!";
        } else {
          this.statusText = "Failed!";
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
      } catch (e) {
        this.$router.push({ name: "NotFound" });
      }
    },
    ...mapActions("transactions", [
      "fetchTransactionDetailHash",
      "setSearchQueryAC"
    ])
  },
  mounted() {
    let hash = this.$route.params.hash;
    this.setSearchQueryAC(hash);
    // let address = this.$route.params.address;
    this.fetchDetailTransaction(hash);
  }
};
</script>
<style scoped>
.table-wrapper.transaction {
  padding: 60px 0 90px 0 !important;
}
.table__head_item {
  color: #131315;
  font-size: 14px;
}
td.accent {
  font-family: "SuisseMedium", sans-serif !important;
  font-weight: 500;
  font-size: 18px;
  color: #df5f18 !important;
}
@media screen and (max-width: 768px) {
  td.accent {
    font-size: 14px;
  }
}
</style>
