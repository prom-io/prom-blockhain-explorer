<template>
  <div class="input-field search_bar">
    <!-- v-show="this.query" -->
    <i
      class="icon_style close_btn"
      v-on:click="resetSearch()"
      v-show="this.isActive"
    >
      <svg
        fill="#ffffff"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 47.971 47.971"
        xml:space="preserve"
      >
        <g>
          <path
            d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88                    c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242                    C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879                    s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
          ></path>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g></svg
    ></i>
    <i v-on:click="search(searchQuery)" class="search__button"
      ><svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6673 16.6666L12.5808 12.5801M12.5808 12.5801C13.561 11.5999 14.1673 10.2457 14.1673 8.74992C14.1673 5.75838 11.7422 3.33325 8.75065 3.33325C5.75911 3.33325 3.33398 5.75838 3.33398 8.74992C3.33398 11.7415 5.75911 14.1666 8.75065 14.1666C10.2464 14.1666 11.6006 13.5603 12.5808 12.5801Z"
          stroke="#E9E9E9"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </i>
    <input
      id="search"
      type="search"
      @keydown="searchEnter($event)"
      @input="searchEnter($event)"
      v-model="searchQuery"
      class="search_filter"
      required
      placeholder="Search by Address / Txn Hash"
    />
    <!-- @input="searchEnter(query, $event)" -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SearchBar",
  computed: {
    searchQuery: {
      get() {
        return this.getSearchQuery;
      },
      set(value) {
        this.setSearchQueryAC(value);
      }
    },
    ...mapGetters("transactions", ["getSearchQuery"])
  },
  data() {
    return {
      isActive: false
    };
  },
  beforeUpdate() {
    this.searchQuery.length > 0
      ? (this.isActive = true)
      : (this.isActive = false);
  },
  mounted() {
    let address = this.$route.params.address;
    if (address) {
      this.setSearchQueryAC(address);
      this.isActive = true;
    }
  },
  methods: {
    search(query) {
      query = query.trim();

      if (query.length == 42) {
        return this.$router.push({
          name: "AddressTransactionResult",
          params: { address: query }
        });
      }

      if (query.length == 66) {
        return this.$router.push({
          name: "Transaction",
          params: { hash: query }
        });
      }
      if (this.$route.path !== "/not/found" && query.length >= 42) {
        this.$router.push({ name: "NotFound" });
      }
    },
    searchEnter(e) {
      let query = e.target.value;
      if (query) {
        console.log(e);
        console.log(query);
        if (e.key == "Enter") {
          this.search(query);
        }
        if (query.length > 0) {
          this.isActive = true;
          this.search(query);
        }
        if (query.length <= 0) {
          this.isActive = false;
        }
        this.setSearchQueryAC(query);
      }
    },
    resetSearch() {
      this.setSearchQueryAC("");
      this.isActive = false;
    },
    ...mapActions("transactions", ["setSearchQueryAC"])
  }
};
</script>

<style lang="postcss" scope>
.search_bar {
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  max-height: 46px;
  position: relative;
}

.search_filter {
  border-bottom: 1px solid #e9e9e9 !important;
  margin-bottom: 0 !important;
  color: #e9e9e9 !important;
  background-color: transparent !important;
  padding: 0 30px !important;
}

.icon_style {
  position: absolute;
  right: 5px !important;
  top: 0px !important;
  background: none !important;
}
nav i,
nav [class^="mdi-"],
nav [class*="mdi-"],
nav i.material-icons {
  line-height: 1 !important;
}
.search__button {
  height: 100% !important;
  z-index: 1;
  position: absolute;
  left: 5px !important;
  top: 0px !important;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.close_btn svg {
  width: 10px;
  height: 10px;
}
.close_btn {
  height: 100% !important;
  height: 100%;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
