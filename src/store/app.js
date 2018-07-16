import Eth from '@/services/getWeb3';

export default {
  state: {
    networkID: null,
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
  },
  actions: {
    async setNetworkID({commit}) {
      let networkID = await Eth.net_version();
      commit('setNetworkID', networkID);
    },
    async initialize({commit, dispatch}) {
      await dispatch('setNetworkID');
    }
  },
};