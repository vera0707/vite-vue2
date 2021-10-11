const setSession = (field, result) => sessionStorage.setItem(field, result);
const getSession = (filed) => sessionStorage.getItem(filed);
const jsonParse = (obj) => JSON.parse(obj) || null;
const parseSession = (field) => jsonParse(getSession(field));

export default {
  namespaced: true,
  state: {
    currentUser: getSession('username') || '非法用户',
    userId: getSession('userId') || null,
    userInfo: parseSession('userInfo') || {},
    userToken: (getSession('userToken') || '').replace(/"/g, '') || {},
    menuList: parseSession('menuList') || [],
    activeMenu: null,
    roles: [],
    staticData: {}
  },
  getters: {
    currentUser: (state) => state.currentUser,
    userInfo: (state) => state.userInfo,
    userId: (state) => state.userId,
    userToken: (state) => state.userToken,
    staticData: (state) => state.staticData,
    menuList: (state) => state.menuList,
    activeMenu: (state) => state.activeMenu
  },
  actions: {
    login({ commit }, { CODE, ID, token, province = '1300', provinceName = '河北' }) {
      commit('SET_CURRENT_USER', CODE || 'admin');
      commit('SET_USER_ID', ID);
      commit('SET_USER_TOKEN', token);
      commit('SET_USER_INFO', { username: CODE, province, provinceName });

      setSession('username', CODE);
      setSession('userId', ID);
      setSession('userToken', token);
      setSession('userInfo', JSON.stringify({ username: CODE, province, provinceName }));
    },
    logout({ commit }) {
      sessionStorage.clear();

      commit('SET_CURRENT_USER', null);
      commit('SET_USER_ID', null);
      commit('SET_USER_INFO', null);
      commit('SET_MANU_LIST', []);
      commit('SET_USER_TOKEN', null);
    },
    setActiveMenu({ dispatch, commit }, path) {
      return dispatch('getMenuList').then((menuList) => {
        let activeMenu = null;
        const findCodePath = (data = [], CODE = null) => {
          for (let i = 0; i < data.length; i++) {
            const rootCode = CODE || data[i].CODE;
            if (activeMenu) return;
            if (data[i].VIEWNAME === path) activeMenu = rootCode;
            else if (data[i].CHILDREN) findCodePath(data[i].CHILDREN, rootCode);
            else if (data[i].menu_list) findCodePath(data[i].menu_list, rootCode);
          }
        };
        findCodePath(menuList, null);
        commit('SET_ACTIVE_MENU', activeMenu);
      });
    },
    getStaticData({ commit }, data) {
      commit('SET_STATIC_DATA', data);
    }
  },
  mutations: {
    SET_CURRENT_USER: (state, currentUser) => {
      state.currentUser = currentUser;
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_USER_TOKEN: (state, userToken) => {
      state.userToken = userToken;
    },
    SET_STATIC_DATA: (state, data) => {
      state.staticData = data;
    },
    SET_MANU_LIST: (state, menuList) => {
      state.menuList = menuList;
    },
    SET_ACTIVE_MENU: (state, activeMenu) => {
      state.activeMenu = activeMenu;
    }
  }
};
