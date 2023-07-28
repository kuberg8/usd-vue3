import { createStore } from "vuex";

const store = createStore({
  state: {
    catalog: []
  },
  mutations: {
    SET_CATALOG(state, catalog) {
      state.catalog = catalog;
    },
  },
});

export default store;
