import globalMethods from '../../methods';
import services from '../../api';

export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {
    login: false
  },

  // -----------------------------------------------------------------
  getters: {
    isLogin: state => state.login
  },

  // -----------------------------------------------------------------
  mutations: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = false;
    },
    saveToken({ commit }, token) {
      localStorage.setItem('token', token);
    }
  },

  // -----------------------------------------------------------------
  actions: {
    /**
     * check user's token
     * @param commit
     * @param dispatch
     */
    checkToken({ commit, dispatch }) {
      if (globalMethods.getToken() && !globalMethods.isTokenExpire()) {
        commit('login');
      } else {
        dispatch('resetToken');
      }
    },

    /**
     * logout processes
     * @param dispatch
     * @returns {Promise<void>}
     */
    async logout({ dispatch }) {
      await services.shared.logout();
      dispatch('resetToken');
    },

    /**
     * remove all login and storages
     * @param commit
     */
    resetToken({ commit }) {
      commit('logout');
      localStorage.clear();
    }
  }
};
