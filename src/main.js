import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';

import tooltipDirective from '@/directives/tooltip';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

Vue.directive('tooltip', tooltipDirective);

(async () => {
  await store.dispatch('initialize');

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  });
})();
