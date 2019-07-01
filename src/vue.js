import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import globalMethods from './methods';

Vue.config.performance = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = process.env.NODE_ENV !== 'production';

window.vueApp = new Vue({
  router,
  store,
  render: h => h(App),

  /**
   * Check routes for first time
   */
  beforeCreate() {
    /**
     * Check for blocked or forbidden pages
     */
    const to = this.$route;
    globalMethods.routerGuard(to, router);
  }
}).$mount('#app');

/**
 * Check routes in route changed
 */
router.beforeEach((to, from, next) => {
  globalMethods.routerGuard(to, router);

  next();
});
