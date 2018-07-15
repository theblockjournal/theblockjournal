<template>
  <nav id="menu" class="d-flex navbar text-white">
    <div>
      <div class="item p-2 clickable" v-on:click="save()" v-if="file">
        <i class="material-icons">save</i>
      </div>
    </div>
    <div>
      <span>{{networkName}}</span>
      <span>v0</span>
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
        let networkNumber = await Eth.net_version();
        switch (networkNumber) {
          case "1":
            return 'Main Network';
          case "4":
            return 'Rinkeby Network';
          default:
            return 'Other Network';
        }
      },
      default() {
        return 'Loading network...';
      }
    }
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
}
</style>
