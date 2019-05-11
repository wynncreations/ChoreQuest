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
    plugins: [
        createPersistedState({
          getState: key => Cookies.getJSON(key),
          setState: (key, state) =>
            Cookies.set(key, state, { expires: 3, secure: false })
        })
    ],
    getters: {
        me: state => state.me,
        users: state => state.users,
        authStatus:  state => state.authStatus,
        token: state => state.token,
        isLoggedIn: state => !!state.token

    },
    actions:{
        login({commit}, me){
            return new Promise(async(resolve,reject)=>{
                fetch('/api/login',{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(me)
                })
                .then(resp => resp.json())
                .then(resp => {
                    localStorage.setItem("token", resp.token);
                    commit("updateMe", resp.me);
                    commit("authSuccess", resp.token);
                    resolve(resp);
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    commit("authError");
                    reject(err);
                })
            })
        },
        register({commit},user){
            return new Promise(async (resolve, reject)=>{
                fetch('/api/register',{
                    method: "Post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then(resp => resp.json())
                .then(resp => {
                    localStorage.setItem("token", resp.token);
                    commit("updateMe", resp.me);
                    commit("authSuccess", resp.token);
                    resolve(resp);
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    commit("authError");
                    reject(err);
                })
            })
        }
    },
    mutations:{
        updateMe(state, me){
            state.me = me;
        },
        authSuccess(state, token) {
            state.authStatus = "success";
            state.token = token;
          },
          authError(state) {
            state.authStatus = "error";
          },
          logout(state) {
            state.authStatus = "";
            state.token = "";
            state.me = {};
          }
    }

});
