<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row m-0" v-if="!verifyMode">
        <Sidebar class="col-3 p-0"/>
        <Document class="col-9 p-0" ref="document" v-if="!sign"/>
        <Sign class="col-9 p-0" v-if="sign"/>
      </div>
      <div class="row m-0" v-else>
        <Verify class="col-12 p-0"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import Document from '@/components/Document';
import Sign from '@/components/Sign';
import Verify from '@/components/Verify';

import Eth from '@/services/getWeb3';
import blockJournal from '@/services/blockJournal';

window.Eth = Eth;
console.log(blockJournal);

export default {
  name: 'Home',
  components: {
    Sidebar,
    Document,
    Sign,
    Verify,
  },
  computed: {
    sign() {
      return this.$store.getters.currentSign;
    },
    verifyMode() {
      return this.$store.state.app.verifyMode;
    },
  },
  data() {
    return {};
  },
};

</script>

<style scoped>

</style>
