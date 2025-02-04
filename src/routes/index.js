
import Vue from 'vue'
import Router from 'vue-router'
import * as firebase from "firebase";

// ############# Components ############
import Signin from "../components/Signin";
import Stats from '../components/StatsUser.vue';
import Activites from "../components/Activities.vue";
import Activite from "../components/Activite.vue";

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
            path: '/stats',
            name: 'stats',
            component: Stats,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/activites',
            name: 'activites',
            component: Activites,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/activites/:nomActivite',
            name: 'detail',
            component: Activite,
            props:true,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser
    if (requiresAuth && !currentUser) {
        next('/signin')
    }else if (!to.matched.length && (requiresAuth && currentUser)){ // Pour les erreur 404 si connecter 
        next("/stats")
    }else if (!to.matched.length && (requiresAuth && !currentUser)){ // Pour les erreur 404 si non connecter
        next("/signin")
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

export default router;