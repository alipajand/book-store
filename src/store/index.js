import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import book from './modules/book';

Vue.use(Vuex);

/**
 * import modules
 */
export default new Vuex.Store({
  modules: {
    auth,
    user,
    book
  },
  strict: process.env.NODE_ENV !== 'production'
});
