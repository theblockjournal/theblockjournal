import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

// import userStore from './user';
// import errorStore from './error';
import app from './app';
import fileStore from './fileStore';
import signStore from './signStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // user: userStore,
    // error: errorStore,
    app,
    fileStore,
    signStore,
  },
  plugins: [createPersistedState()],
});
