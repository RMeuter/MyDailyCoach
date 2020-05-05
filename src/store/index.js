import Vue from "vue";
import Vuex from "vuex";

import dictLevel from "../JsonFile/levelUser.json"

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
        niveauObtenu(state){
            for (var i = 0; i < dictLevel.niveau.length; i++){
                if(state.user.data.pointBienEtre >= dictLevel.niveau[i].nombreDePoint){
                    return dictLevel.niveau[i];
                } 
            }
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
            /**
             * Ici on compare seulement avec la dernière fois que l'utilisateur a vu la recommandation
             * mais le problème est que il peut etre voir la recommandation jusque 2 heure du mat et donc comptez pour le jour
             * d'après 
             * 
             */
            let date = new Date();
            if (state.user.data.dernierRecommandationVu != date.toLocaleDateString())
                state.user.data.pointBienEtre += nombreAAjouter;
        },
        SET_DERNIERE_RECOMMANDATION_VU(state){
            /**
             * Ici on compare seulement avec la dernière fois que l'utilisateur a vu la recommandation
             * mais le problème est que il peut etre voir la recommandation jusque 2 heure du mat et donc comptez pour le jour
             * d'après 
             * 
             */
            let date = new Date();
            state.user.data.dernierRecommandationVu += date.toLocaleDateString();
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
        },
        Add_PointBienEtre({ commit }, ajoutPoint) { 
            /**
             * Lui au lieu de faire store.commit (), il choppe directement commit
             * Et donc il commit directement apres
             * */ 
            commit("SET_DERNIERE_RECOMMANDATION_VU");
            if (ajoutPoint) {
                commit("SET_POINT_BIEN_ETRE", ajoutPoint );
            } else {
                commit("SET_POINT_BIEN_ETRE", 0);
            }
        },
    },
    strict: true,
});