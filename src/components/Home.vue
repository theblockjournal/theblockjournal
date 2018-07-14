<template>
  <div>
    <Menu/>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <Sidebar class="col-3 p-0"/>
        <Document class="col-9 p-0" ref="document"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu';
import Sidebar from '@/components/Sidebar';
import Document from '@/components/Document';

import Eth from '@/services/getWeb3';
window.Eth = Eth;

export default {
  name: 'Home',
  components: {
    Menu,
    Sidebar,
    Document,
  },
  data() {
    return {};
  },
};

</script>

<style scoped>

</style>
