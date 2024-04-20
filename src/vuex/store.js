import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        collapsed: false,
        isActive: true,
        isShow: 1,
        userInfo: {},
        menus: []
    },
    getters: {
    },
    mutations: {
        collapse: function (state) {
            state.collapsed = !state.collapsed;
        },
        collapseToTrue: function () {
            state.collapsed = true;
        },
        collapseToFalse: function () {
            state.collapsed = false;
        },
        isActiveToTrue: function () {
            state.isActive = true;
        },
        isActiveToFalse: function () {
            state.isActive = false;
        },
        isShowModify: function (state, show) {
            state.isShow = show;
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menus) => {
            state.menus = menus;
        },
    },
    actions: {
        setUserInfo (context, userInfo) {
            context.commit('SET_USERINFO', userInfo);
            
        },
        setMenus (context, menus) {
            context.commit('SET_MENU', menus);
            
        }
    },
    modules: {
    },
    plugins: [createPersistedState()]
})