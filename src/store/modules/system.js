export default {
  namespaced: true,
  state: {
    env: process.env.NODE_ENV, // 开发环境
    routerPath: {}
  },
  getters: {
    routerPath: (state) => state.routerPath
  },
  actions: {
    changeRouterPath: ({ commit }, routerPath) => commit('UPDATE_ROUTER_PATH', routerPath)
  },
  mutations: {
    UPDATE_ROUTER_PATH: (state, routerPath) => {
      state.routerPath = routerPath;
    }
  }
};
