import { createStore } from "vuex";

const store = createStore({
  state: {
    catalog: [],
  },
  mutations: {
    SET_CATALOG(state, catalog) {
      state.catalog = catalog;
    },
  },
  getters: {
    GET_BY_ID(state) {
      return (id) => state.catalog?.find(({ ID }) => ID === id);
    },
  },
});

export default store;
