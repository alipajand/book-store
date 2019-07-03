import services from '../../api';

export default {
  namespaced: true,

  // -----------------------------------------------------------------
  state: {},

  // -----------------------------------------------------------------
  getters: {},

  // -----------------------------------------------------------------
  mutations: {},

  // -----------------------------------------------------------------
  actions: {
    get(context, filters) {
      return services.privates.getBookList(filters);
    },
    async add({ dispatch }, body) {
      await services.privates.addBook(body);
    },
    async update({ dispatch }, id) {
      await services.privates.updateBook(id);
      await dispatch('get');
    },
    async delete({ dispatch }, id) {
      await services.privates.deleteBook(id);
      await dispatch('get');
    }
  }
};
