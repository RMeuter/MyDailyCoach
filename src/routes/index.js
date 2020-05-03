
import Vue from 'vue'
import Router from 'vue-router'
import * as firebase from "firebase";
// ############# Components #############
import Master from "../components/Master";
import Signin from "../components/Signin";
import Stats from '../components/StatsUser.vue';
import Recom from "../components/RecommandationUser.vue";
import Activities from "../components/Activities.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: '*',
            redirect: '/signin'
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
        },
        {
            path: '/home',
            name: 'master',
            component: Master,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/stats',
            name: 'stats',
            component: Stats,
            meta: {
                requiresAuth: false // ############### Attention pour un accès plus rapide en mode test mis en place du false
            }
        },
        {
            path: '/',//activities',
            name: 'activities',
            component: Activities,
            meta: {
                requiresAuth: false // ############### Attention pour un accès plus rapide en mode test mis en place du false
            }
        },
        {
            path: '/myDailyActivity',
            name: 'myDailyActivity',
            component: Recom,
            meta: {
                requiresAuth: false // ############### Attention pour un accès plus rapide en mode test mis en place du false
            }
        }, 

    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser
    if (requiresAuth && !currentUser) {
        next('/signin')
    } else if (requiresAuth && currentUser) {
        next()
    }else if (!to.matched.length && (requiresAuth && currentUser)){ // Pour les erreur 404 si connecter 
        next("/home")
    }else if (!to.matched.length && (requiresAuth && !currentUser)){ // Pour les erreur 404 si non connecter
        next("/signin")
    } else {
        next()
    }
})

export default router;