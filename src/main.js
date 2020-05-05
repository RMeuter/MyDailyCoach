import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from "./store";

// ########### Firebase #############
import * as firebase from "firebase";
import VueFirestore from 'vue-firestore';

// ########### Bootstrap #############
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import "@/helpers/filters";

Vue.config.productionTip = false

// ############## firebase ##############
const config = {
  apiKey: "AIzaSyD6czB7vsdnpAFW_NOS6tGyNGkzawNGGZI",
  authDomain: "happyevening.firebaseapp.com",
  databaseURL: "https://happyevening.firebaseio.com",
  projectId: "happyevening",
  storageBucket: "happyevening.appspot.com",
  messagingSenderId: "776464730949",
  appId: "1:776464730949:web:28ccf2bd57a7afa5350c2c",
  measurementId: "G-KM3FPZMGT5"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  // https://firebase.google.com/docs/database/web/read-and-write
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

// ############## Vue ##############
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

