import globalMethods from '../../methods';

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
    checkToken({ commit, dispatch }) {
      if (localStorage.getItem('token') && !globalMethods.isTokenExpire()) {
        commit('login');
      } else {
        dispatch('resetToken');
      }
    },
    resetToken({ commit }) {
      commit('logout');
      localStorage.clear();
    }
  }
};
