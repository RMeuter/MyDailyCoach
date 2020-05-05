import Vue from "vue";
import Vuex from "vuex";

import dictLevel from "../JsonFile/levelUser.json"

import { db } from "../main.js";
import fonctionChangementParametre from "./construitJSONParametre"

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
        estMomentRecommandation(state){
            let date = new Date(state.user.data.dernierRecommandationVu);
            let dateRecommand = new Date();
            dateRecommand.setHours(state.user.data.momentRecommandation[0]);
            dateRecommand.setMinutes(state.user.data.momentRecommandation[1]);
            return date >= dateRecommand && date <= dateRecommand.setHours(dateRecommand.getHours + 4);
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
            let date = new Date();
            if (state.user.data.dernierRecommandationVu != date.toLocaleDateString()){
                state.user.data.pointBienEtre += nombreAAjouter;
                db.collection("UserExtraInfos").doc(state.user.data.uid).update(
                    {pointBienEtre: state.user.data.pointBienEtre}
                );
            }
        },
        SET_DERNIERE_RECOMMANDATION_VU(state){
            let date = new Date();
            state.user.data.dernierRecommandationVu = date.getTime();
            db.collection("UserExtraInfos").doc(state.user.data.uid).update(
                {dernierRecommandationVu: state.user.data.dernierRecommandationVu}
            );
        }, 
        SET_MOMENT_RECOMMANDATION(state, nouvelleHeure){
            db.collection("UserExtraInfos").doc(state.user.data.uid).update(
                {momentRecommandation: nouvelleHeure}
            );
            state.user.data.momentRecommandation = nouvelleHeure;
        }, 
        SET_PARAMETRE(state, idParams, parametre){
            let arrayParams = fonctionChangementParametre(idParams, parametre); 
            db.collection("UserExtraInfos").doc(state.user.data.uid).update(
                arrayParams[0]
            );
            state.user.data.parametre[arrayParams[1]] = parametre; 
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
            commit("SET_DERNIERE_RECOMMANDATION_VU");
            commit("SET_POINT_BIEN_ETRE", ajoutPoint );
        },
        Modify_Params({ commit }, idParams, parametre) {
            commit("SET_PARAMETRE", idParams, parametre);
        },
        Modify_MomentRecommandation({ commit }, nouvelleHeure) {
            commit("SET_MOMENT_RECOMMANDATION", nouvelleHeure );
        },
    },
    strict: true,
});