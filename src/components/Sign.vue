<template>
  <div id="sign">
    <div id="signView" class="container p-4">
      <div class="card border-0 my-2" v-on:click="viewSignFile" v-bind:class="{ clickable: file }">
        <div class="card-body">
          <div class="d-flex align-middle">
            <i class="material-icons d-flex pr-2" style="align-items: center">insert_drive_file</i>
            <div style="font-size: 1.5em">
              <span class="text-muted">File:</span>
              <span>{{sign.fileName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="verification card border-0 my-2">
        <div class="card-body">
          <h5 class="card-title">Verification</h5>
          <div class="d-flex">
            <i class="icon material-icons p-2">{{signVerification.icon}}</i>
            <div class="content d-flex w-100 p-2">{{signVerification.text}}</div>
          </div>
          <div class="d-flex" v-if="fileVerification">
            <i class="icon material-icons p-2">{{fileVerification.icon}}</i>
            <div class="content d-flex w-100 p-2">{{fileVerification.text}}</div>
          </div>
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
const createKeccakHash = require('keccak');

import blockJournal from '@/services/blockJournal';

let getTimeString = timestamp => moment(timestamp).toString();

export default {
  name: 'Sign',
  data() {
    return {};
  },
  computed: {
    sign() {
      return this.$store.getters.currentSign;
    },
    file() {
      return this.$store.getters.getFileByID(this.sign.fileID);
    },
    signVerification() {
      let sign = this.sign;
      if (!sign.verification) return {
        icon: 'remove_circle_outline',
        text: `This signature hasn't been verified yet`,
      };
      if (sign.verification.verified === false) return {
        icon: 'error_outline',
        text: `This signature failed verification.`,
      };
      return {
        icon: 'check_circle_outline',
        text: `This signature is valid. It was created on block ${sign.verification.block} at ${getTimeString(sign.verification.time)}`,
      };
    },
    fileVerification() {
      let [sign, file] = [this.sign, this.file];
      let fileHash = createKeccakHash('keccak256').update(file.content).digest('hex');
      if (!sign.verification || !sign.verification.verified) return;
      if (!file) return {
        icon: 'help_outline',
        text: `The file isn't stored with the editor.`,
      };
      if (sign.verification.signature !== `0x${fileHash}`) return {
        icon: 'error_outline',
        text: `This signature doesn't match with the file stored locally.`,
      };
      return {
        icon: 'check_circle_outline',
        text: `The signature matches with the file stored locally.`,
      };
    },
  },
  methods: {
    getTimeString,
    viewSignFile() {
      if (!this.file) return;
      this.$store.commit('selectFileByID', this.file.id);
    },
  },
};
</script>

<style scoped lang="scss">
#sign {
  background: #eeeeee;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 4em;
  overflow-x: auto;
  overflow-y: auto;
  #signView {
    .verification {
      .icon {
        font-size: 3em;
      }
      .content {
        align-items: center;
      }
    }
  }
}
</style>
