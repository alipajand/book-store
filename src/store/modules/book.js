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
    bookInfo(context, id) {
      return services.privates.getBookById(id);
    },
    async add({ dispatch }, body) {
      await services.privates.addBook(body);
    },
    async update({ dispatch }, { id, body }) {
      await services.privates.updateBook(id, body);
    },
    async delete({ dispatch }, id) {
      await services.privates.deleteBook(id);
    }
  }
};
