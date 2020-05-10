import Vue from "vue";
import Vuex from "vuex";

import { db } from "../main.js";
import fonctionChangementParametre from "./construitJSONParametre"

Vue.use(Vuex);

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
            let date = new Date(); 
            let dateRecommand = new Date();
            dateRecommand.setHours(state.user.data.momentRecommandation[0]);
            dateRecommand.setMinutes(state.user.data.momentRecommandation[1]);
            return date >= dateRecommand && date <= dateRecommand.setHours(dateRecommand.getHours() + 4);
        },
        niveauObtenu(state){
            db.collection("niveauUtilisateur")
            .orderBy("niveauSup", "asc")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if(state.user.data.pointBienEtre <= doc.data().niveauSup){
                        return doc.data();
                    }
                })
            });
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
            let derDate = new Date(state.user.data.dernierRecommandationVu);
            if (derDate > date.setHours(date.getHours()-20)){
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
        SET_PARAMETRE(state, parametre){
            let arrayParams = fonctionChangementParametre(parametre[0], parametre[1]); 
            console.log(arrayParams);
            db.collection("UserExtraInfos").doc(state.user.data.uid).update(
                arrayParams[0]
            );
            state.user.data.parametre[arrayParams[1]] = parametre[1];
             
        }
    },
    actions: {
        fetchUser({ commit }, data) { 
            commit("SET_LOGGED_IN", data !== null);
            console.log("data !== null")
            console.log(data !== null)
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
        Modify_Params({ commit }, parametre) {
            commit("SET_PARAMETRE", parametre);
        },
        Modify_MomentRecommandation({ commit }, nouvelleHeure) {
            commit("SET_MOMENT_RECOMMANDATION", nouvelleHeure );
        },
    },
    strict: true,
});