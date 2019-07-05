import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import globalMethods from './methods';

Vue.config.performance = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = process.env.NODE_ENV !== 'production';

/**
 * main vue
 */
new Vue({
  router,
  store,
  render: h => h(App),

  /**
   * Check routes for first time
   */
  beforeCreate() {
    const { access_token: accessToken, token_type: tokenType, expires_in: expiresIn } = globalMethods.getUrlParams();
    if (accessToken) {
      localStorage.setItem('exp', expiresIn);
      this.$store.commit('auth/saveToken', `${tokenType} ${accessToken}`);
    }

    /**
     * if user couldn't access to a page redirect to home page
     */
    if (globalMethods.routerGuard(this.$route)) {
      router.push({ name: 'home' });
    }

    /**
     * fetch and check isLogin flag
     */
    this.$store.dispatch('auth/checkToken');

    /**
     * if the user focus on each window
     */
    window.onfocus = () => {
      this.$store.dispatch('auth/checkToken');
    };
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
