import Eth from '@/services/getWeb3';

export default {
  state: {
    networkID: null,
    accounts: [],
  },
  getters: {
    networkName(state) {
      switch (state.networkID) {
        case "1":
          return 'Main Network';
        case "4":
          return 'Rinkeby Network';
        default:
          return 'Other Network';
      }
    }
  },
  mutations: {
    setNetworkID(state, id) {
      state.networkID = id;
    },
    setAccounts(state, accounts) {
      state.accounts = accounts;
    }
  },
  actions: {
    async setNetworkID({commit}) {
      let networkID = await Eth.net_version();
      commit('setNetworkID', networkID);
    },
    async setAccounts({commit}) {
      let accounts = await Eth.accounts();
      commit('setAccounts', accounts);
    },
    async initialize({commit, dispatch}) {
      await dispatch('setNetworkID');
      await dispatch('setAccounts');
    }
  },
};