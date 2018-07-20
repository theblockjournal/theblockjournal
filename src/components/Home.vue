<template>
  <div>
    <Menu/>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <Sidebar class="col-3 p-0"/>
        <Document class="col-9 p-0" ref="document" v-if="!sign"/>
        <Sign class="col-9 p-0" v-if="sign"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu';
import Sidebar from '@/components/Sidebar';
import Document from '@/components/Document';
import Sign from '@/components/Sign';

import Eth from '@/services/getWeb3';
import blockJournal from '@/services/blockJournal';
window.Eth = Eth;
console.log(blockJournal);

export default {
  name: 'Home',
  components: {
    Menu,
    Sidebar,
    Document,
    Sign,
  },
  computed: {
    sign() {
      return this.$store.getters.currentSign;
    },
  },
  data() {
    return {};
  },
};

</script>

<style scoped>

</style>
