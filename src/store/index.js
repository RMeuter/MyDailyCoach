import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// Vidéo tuto pour comprendre le fonctionnement :
// https://www.youtube.com/watch?v=OjM7hzcdBrs
export default new Vuex.Store(
    {
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
        dateRecommandation(state){
            let date = new Date();
            let dateRecommand = new Date();
            dateRecommand.setHours(state.user.data.momentRecommandation[0]);
            dateRecommand.setMilliseconds(state.user.data.momentRecommandation[1]);
            return date >= dateRecommand && date <= dateRecommand.setHours(dateRecommand.getHours + 2);
        },
        dejaRecuPointRecommandation(state){
            var date = new Date();
            return state.dernierRecommandationVu == date.toLocaleDateString();
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
        SET_POINT_BIEN_ETRE(state, nombreAAjouter){
            state.user.data.pointBienEtre += nombreAAjouter
        }
    },
    actions: {
        fetchUser({ commit }, data) { 
            /**
             * Lui au lieu de faire store.commit (), il choppe directement commit
             * Et donc il commit directement apres
             * */ 
            commit("SET_LOGGED_IN", data !== null);
            if (data.extra) {
                let obj = {
                    uid : data.user.uid,
                    displayName: data.user.displayName,
                    momentRecommandation : data.extra.momentRecommandation,
                    dernierRecommandationVu : data.extra.dernierRecommandationVu,
                    pointBienEtre : data.extra.pointBienEtre,
                    parametre : data.extra.useParametre,
                };
                commit("SET_USER", obj );
            } else {
                commit("SET_USER", null);
            }
        }
    },
    strict: true,
});