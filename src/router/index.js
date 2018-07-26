import Vue from 'vue';
import Router from 'vue-router';
import Editor from '@/components/Editor';
import Verify from '@/components/Verify';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: Editor,
    },
    {
      path: '/verify',
      name: 'Verify',
      component: Verify,
    },
  ],
});
