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
    const routerGuard = globalMethods.routerGuard(this.$route);
    if (routerGuard) {
      router.push({ name: 'home' });
    }
  }
}).$mount('#app');

/**
 * Check routes in route changed
 */
router.beforeEach((to, from, next) => {
  const routerGuard = globalMethods.routerGuard(to);
  if (routerGuard) {
    router.push({ name: 'home' });
  }

  next();
});
