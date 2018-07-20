import uuid from 'uuid';

export default {
  state: {
    signs: [],
    currentSignID: null,
  },
  getters: {
    getSignByID: (state) => (id) => {
      return state.signs.find(sign => sign.id === id);
    },
    currentSign(state) {
      return state.signs.find(sign => sign.id === state.currentSignID);
    },
  },
  mutations: {
    addSign(state, sign) {
      sign.id = uuid.v4();
      state.signs.push(sign);
    },
    selectSignByID(state, signID) {
      state.currentSignID = signID;
    },
    selectFileByID(state) {
      state.currentSignID = null;
    },
  },
  actions: {
    
  },
};