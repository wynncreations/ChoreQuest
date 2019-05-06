import Vue from "vue";
import Router from "vue-router";
import store from './store'
import Home from './views/Home'
import Login from './views/Login'

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresAuth: false
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else if (to.matched.some(record => record.meta.requiresAdminAuth)) {
        if (store.getters.isLoggedIn && store.getters.isAdmin) {
            next();
            return;
        } else if (store.getters.isLoggedIn && !store.getters.isAdmin) {
            next("/");
        }
    } else {
        next();
    }
});

export default router;
