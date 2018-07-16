import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import AsyncComputed from 'vue-async-computed'

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

store.dispatch('initialize');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
