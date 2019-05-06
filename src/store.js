import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        me: {},
        users: null,
        authStatus: "",
        token: localStorage.getItem("token") || ""
    },
    getters: {
        me: state => state.me,
        users: state => state.users,
        authStatus:  state => state.authStatus,
        token: state => state.token
    },
    actions:{
        
    }
});
