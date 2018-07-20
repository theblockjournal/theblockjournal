<template>
  <div id="sign">
    <div id="signView" class="container p-4">
      <h3>{{sign.fileName}} <span class="text-muted">v0</span></h3>
      <div class="card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">Verification</h5>
          <i class="material-icons">check_circle_outline</i>
        </div>
      </div>
      <div class="card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">Signature details</h5>
          <p class="card-text">Retrieved from local storage</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex">
            <i class="material-icons px-2">fingerprint</i>
            <span class="text-muted">{{sign.signature}}</span>
          </li>
          <li class="list-group-item d-flex">
            <i class="material-icons px-2">account_circle</i>
            <span class="text-muted">{{sign.sender}}</span>
          </li>
          <li class="list-group-item d-flex">
            <i class="material-icons px-2">access_time</i>
            <span class="text-muted">{{getTimeString(sign.time)}}</span>
          </li>
          <li class="list-group-item d-flex">
            <i class="material-icons px-2">bookmark</i>
            <span class="text-muted">{{sign.txHash}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import blockJournal from '@/services/blockJournal';

export default {
  name: 'Sign',
  data() {
    return {};
  },
  computed: {
    sign() {
      return this.$store.getters.currentSign;
    },
  },
  methods: {
    getTimeString: (timestamp)=> {
      return moment(timestamp).toString();
    },
  }
};
</script>

<style scoped lang="scss">
#sign {
  background: #eeeeee;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 4em;
}
</style>
