import uuid from 'uuid';

export default {
  state: {
    signs: [],
  },
  getters: {},
  mutations: {
    addSign(state, sign) {
      sign.id = uuid.v4();
      state.signs.push(sign);
    },
  },
  actions: {
    
  },
};