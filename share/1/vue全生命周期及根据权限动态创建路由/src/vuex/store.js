import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, payload) {
      state.routes = payload.routes;
    }
  },
  actions: {
    setRoutes(context, obj) {
      context.commit("setRoutes", obj);
    },
    addRoutes(context, obj) {
      let routes = [...context.state.routes, ...obj.routes];
      context.commit("setRoutes", {routes:routes});
    }
  }
});
