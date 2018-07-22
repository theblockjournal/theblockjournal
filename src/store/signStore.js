import uuid from 'uuid';
import blockJournal from '@/services/blockJournal';

export default {
  state: {
    signs: [],
    currentSignID: null,
  },
  getters: {
    getSignByID: (state) => (id) => {
      return state.signs.find(sign => sign.id === id);
    },
    getSignsByFileID: (state) => (fileID) => {
      return state.signs.filter(sign => sign.fileID === fileID);
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
    addVerification(state, {id, verification}) {
      let signIndex = state.signs.findIndex(s => s.id === id);
      state.signs[signIndex].verification = verification;
    },
    clearVerifications(state) {
      for (let sign of state.signs) {
        sign.verification = undefined;
      }
    },
    selectSignByID(state, signID) {
      state.currentSignID = signID;
    },
    selectFileByID(state) {
      state.currentSignID = null;
    },
  },
  actions: {
    async verifySignature({getters, state, commit}, {signID}) {
      let sign = getters.getSignByID(signID);
      let verification = await blockJournal.getVerifiedEntry(sign.sender, sign.signature);
      // if(!verification.verified) return;
      commit('addVerification', {id: signID, verification});
    },
    async verifyAllSignatures({state, dispatch}) {
      let verificationPromises = [];
      state.signs.forEach(s=> verificationPromises.push(dispatch('verifySignature', {signID: s.id})));
      return Promise.all(verificationPromises);
    },
    async initialize({commit, dispatch}) {
      commit('clearVerifications');
      await dispatch('verifyAllSignatures');
    }
  },
};