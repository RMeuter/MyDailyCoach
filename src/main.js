import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from "./store";

// ########### Firebase #############
import * as firebase from "firebase";
import VueFirestore from 'vue-firestore';
import config from "./firebase"

// ########### API ########### 
import VueGAPI from "vue-gapi";
import apiConfig from "./ApiConnect"

// ########### Bootstrap #############
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// ########### Autre #############
import "@/helpers/filters";


// ############## firebase ##############
firebase.initializeApp(config);
export const db = firebase.firestore();


Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  console.log("interroge firebase !");
  if(user){
    if ("uid" in user){
      db
      .collection("UserExtraInfos")
      .doc(user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          var use = doc.data();
          store.dispatch("fetchUser", {user:user, extra:use});
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    } else {
      store.dispatch("fetchUser", user);
    }
  }
});

// ############## Pluggin ##############
Vue.use(BootstrapVue);
Vue.use(VueFirestore);
Vue.use(VueGAPI, apiConfig);

// ############## Vue ##############
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

