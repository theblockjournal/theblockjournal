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
    <div>
      <span>{{networkName}}</span>
      <span>v0</span>
      <select class="addressSelector">
        <option v-for="account in accounts">{{account}}</option>
      </select>
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
    accounts: {
      async get() {
        return this.$store.state.app.accounts.map(acc=> {
          return `${acc.slice(0, 5)}...${acc.slice(-3)}`;
        });
      },
      default() {
        return ['Loading accounts...'];
      }
    },
  },
  computed: {
    file() {
      return this.$store.state.fileStore.currentFile;
    },
  },
  methods: {
    save() {
      this.$parent.$refs.document.save();
    },
    sign() {
      this.$parent.$refs.document.sign();
    },
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
