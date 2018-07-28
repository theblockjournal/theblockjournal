<template>
  <nav id="menu" class="d-flex navbar text-white">
    <div class="d-flex">
      <div class="d-flex px-2 clickable" v-tooltip:bottom="'Switch mode'">
        <span class="d-flex" v-if="isVerifyMode" v-on:click="navigateTo('/')">
          <i class="material-icons mx-1">check</i>Verify
        </span>
        <span class="d-flex" v-else v-on:click="navigateTo('/verify')">
          <i class="material-icons mx-1">edit</i>Editor
        </span>
      </div>
      <div class="d-flex item px-2 clickable" v-on:click="save()" v-if="file" v-tooltip:bottom="'Save file'">
        <i class="material-icons">save</i>
      </div>
      <div class="d-flex item px-2 clickable" v-on:click="sign()" v-if="file" v-tooltip:bottom="'Publish signature'">
        <i class="material-icons">fingerprint</i>
      </div>
    </div>
    <div class="d-flex">
      <div class="config d-flex px-2 clickable nav-item dropdown">
        <i class="material-icons" data-toggle="dropdown">settings</i>
        <div class="dropdown-menu">
          <a class="dropdown-item d-flex" v-on:click="reset">
            <i class="material-icons">settings_backup_restore</i>
            <span>Reset app</span>
          </a>
          <a class="dropdown-item d-flex" v-on:click="dump" v-tooltip:right="'This includes files, signatures, and settings'">
            <i class="material-icons">vertical_align_bottom</i>
            <span>Download state</span>
          </a>
          <a class="dropdown-item d-flex" v-on:click="restore">
            <i class="material-icons">vertical_align_top</i>
            <span>Upload state</span>
          </a>
        </div>
      </div>
      <div class="d-flex px-2">
        <i class="material-icons px-2" v-tooltip:bottom="networkNameToolTip">public</i>
        <span>{{networkName}}</span>
      </div>
      <div class="d-flex px-2">
        <i class="material-icons px-2" v-tooltip:bottom="'You\'re using the v0 contract'">receipt</i>
        <span>v0</span>
      </div>
      <div class="d-flex px-2" v-tooltip:bottom="selectedAccountToolTip">
        <i class="material-icons px-2">account_circle</i>
        <select class="addressSelector" v-model="selectedAccount">
          <option v-for="(account, i) in $store.state.app.accounts" :value="account" class="text-dark">{{shortenedAccount(account)}}</option>
        </select>
      </div>
      <div class="d-flex px-2 clickable" @click="showInfoModal">
        <i class="material-icons">info</i>
      </div>
    </div>
  </nav>
</template>

<script>
import blockjournal from '@/services/blockJournal';

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
    async networkNameToolTip() {
      return `You're on the ${await this.networkName}`;
    },
  },
  computed: {
    file() {
      return this.$store.getters.currentFile;
    },
    selectedAccount: {
      get() {
        return this.$store.state.app.selectedAccount;
      },
      set(value) {
        this.$store.commit('selectAccount', this.$store.state.app.accounts.indexOf(value));
      },
    },
    selectedAccountToolTip() {
      return `Your Ethereum account: ${this.selectedAccount}`;
    },
    isVerifyMode() {
      return this.$route.name == 'Verify';
    },
  },
  methods: {
    save() {
      this.$root.$emit('save');
    },
    sign() {
      this.$root.$emit('sign');
    },
    switchMode() {
      this.$store.commit('setVerifyMode', !this.verifyMode);
    },
    reset: blockjournal.resetState,
    dump: blockjournal.dumpState,
    restore: blockjournal.restoreState,
    shortenedAccount(acc) {
      return `${acc.slice(0, 5)}...${acc.slice(-3)}`;
    },
    showInfoModal() {
      this.$root.$emit('showInfoModal');
    },
    navigateTo(path) {
      this.$router.push({ path });
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
  .config {
    .dropdown-menu {
      background-color: black;
      color: white;
      .dropdown-item {
        &:hover {
          background-color: #111111;
        }
      }
    }
  }
}
</style>
