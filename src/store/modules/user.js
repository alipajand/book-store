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
        commit('save', response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    async update({ commit, dispatch }) {
      try {
        const response = await services.shared.updateUser();
        commit('save', response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    async delete({ commit, dispatch }) {
      try {
        const response = await services.shared.deleteUser();
        commit('save', response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
