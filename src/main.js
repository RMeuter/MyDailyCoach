import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import * as firebase from "firebase";
import store from "./store";

import VueFirestore from 'vue-firestore';

import "@/helpers/filters";

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false
//Vue.config.silent = true

/*
// handle page reloads
let app
firebaseconfig.auth.onAuthStateChanged(user => {
  console.log(user)
  if (!app) {
    app = new Vue({
      el: '#app',
      
      render: h => h(App)
    })
  }
})
*/

Vue.use(VueFirestore);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

