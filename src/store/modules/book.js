export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {
    books: []
  },

  // -----------------------------------------------------------------
  getters: {
    get: state => state.books
  },

  // -----------------------------------------------------------------
  mutations: {
    save: (state, data) => {
      state.books = data;
    }
  },

  // -----------------------------------------------------------------
  actions: {
    get({ commit, dispatch }) {
    },
    add({ commit, dispatch }) {
    },
    update({ commit, dispatch }) {
    },
    delete({ commit, dispatch }) {
    }
  }
};
