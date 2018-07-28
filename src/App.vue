<template>
  <div id="app">
    <Menu/>
    <router-view/>
    <InfoModal/>
  </div>
</template>

<script>
import Menu from './components/Menu';
import InfoModal from './components/InfoModal';

export default {
  name: 'App',
  components: {
    Menu,
    InfoModal,
  },
};
</script>

<style lang='scss'>
@import '~@/styles/custom-bootstrap';
</style>
