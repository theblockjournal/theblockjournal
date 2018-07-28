<template>
  <div>
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
import Sidebar from '@/components/Sidebar';
import Document from '@/components/Document';
import Sign from '@/components/Sign';

import blockJournal from '@/services/blockJournal';

console.log(blockJournal);

export default {
  name: 'Editor',
  components: {
    Sidebar,
    Document,
    Sign,
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
