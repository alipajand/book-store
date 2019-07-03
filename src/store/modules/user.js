import services from '../../api';

export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {
    info: []
  },

  // -----------------------------------------------------------------
  getters: {
    get: state => state.info
  },

  // -----------------------------------------------------------------
  mutations: {
    save: (state, data) => {
      state.info = data;
    }
  },

  // -----------------------------------------------------------------
  actions: {
    async get({ commit }) {
      try {
        const response = await services.shared.getUserInfo();
        console.log(response);
        commit('save', response.data);
      } catch (e) {
      }
    },
    update({ commit, dispatch }) {
    },
    delete({ commit, dispatch }) {
    }
  }
};
