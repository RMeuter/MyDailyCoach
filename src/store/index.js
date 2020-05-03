import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// Vidéo tuto pour comprendre le fonctionnement :
// https://www.youtube.com/watch?v=OjM7hzcdBrs
export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        dataRecommandation(state){
            let date = new Date();
            let dateRecommand = new Date();
            dateRecommand.setHours(state.user.data.momentRecommandation[0]);
            dateRecommand.setMilliseconds(state.user.data.momentRecommandation[1]);
            return date >= dateRecommand && date <= dateRecommand.setHours(dateRecommand.getHours + 2);
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    actions: {
        fetchUser({ commit }, user) { 
            /**
             * Lui au lieu de faire store.commit (), il choppe directement commit
             * Et donc il commit directement apres
             * */ 
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email,
                    momentRecommandation:[23, 30],// user.momentRecommandation,
                    useParametre: user.useParametre,
                    pointBienEtre: user.pointBienEtre
                });
            } else {
                commit("SET_USER", null);
            }
        }
    },
    strict: true,
});