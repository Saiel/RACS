import Vue from 'vue';
import VueRouter from 'vue-router';

import App from 'components/App/App.vue';
import pagesRoutes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: pagesRoutes,
  mode: 'history',
});

const app = new Vue({
  el: '.App',
  components: {
    App,
  },
  render(h) {
    return h('App');
  },
  router,
});
