<template>
  <nav id="menu" class="d-flex navbar text-white">
    <div class="d-flex">
      <div class="item p-2 clickable" v-on:click="save()" v-if="file">
        <i class="material-icons">save</i>
      </div>
      <div class="item p-2 clickable" v-on:click="sign()" v-if="file">
        <i class="material-icons">fingerprint</i>
      </div>
    </div>
    <div class="d-flex">
      <div class="d-flex px-2">
        <i class="material-icons px-2">public</i>
        <span>{{networkName}}</span>
      </div>
      <div class="d-flex px-2">
        <i class="material-icons px-2">receipt</i>
        <span>v0</span>
      </div>
      <div class="d-flex px-2">
        <i class="material-icons px-2">account_circle</i>
        <select class="addressSelector" v-model="selectedAccount">
          <option v-for="account in $store.state.app.accounts" :value="account">{{shortenedAccount(account)}}</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
import Eth from '@/services/getWeb3';

export default {
  name: 'Menu',
  data() {
    return {};
  },
  asyncComputed: {
    networkName: {
      async get() {
        return this.$store.getters.networkName;
      },
      default() {
        return 'Loading network...';
      }
    },
  },
  computed: {
    file() {
      return this.$store.state.fileStore.currentFile;
    },
    selectedAccount: {
      get() {
        return this.$store.state.app.selectedAccount;
      },
      set(value) {
        this.$store.commit('selectAccount', this.$store.state.app.accounts.indexOf(value));
      }
    },
  },
  methods: {
    save() {
      this.$parent.$refs.document.save();
    },
    sign() {
      this.$parent.$refs.document.sign();
    },
    shortenedAccount(acc) {
      return `${acc.slice(0, 5)}...${acc.slice(-3)}`;
    }
  },
};
</script>

<style scoped lang="scss">
#menu {
  background: #000000;
  height: 4em;
  align-items: center;
  .item {
    color: white;
  }
  .addressSelector {
    background: none;
    border: none;
    color: white;
  }
}
</style>
