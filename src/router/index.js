import Vue from 'vue';
import Router from 'vue-router';
import Shared from './_shared.js';

const routes = [];
Vue.use(Router);
Shared.routes().map(item => {
  routes.push(item);
});

export default new Router({
  mode: 'history',
  routes: routes,

  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});
