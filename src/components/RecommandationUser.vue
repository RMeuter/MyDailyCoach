<template>
  <div>
    <header>
      <template v-if="user.loggedIn">
        <div class="display-name">{{user.data.displayName}} is logged in</div>        
        <button class="nav-link signout" @click.prevent="signOut">Sign Out</button>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link to="/signin" class="nav-link">Login</router-link>
        </li>
      </template>
    </header>



    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as firebase from "firebase";

/**
 * Savoir l'intensité d'éffort de la journée sera basé sur 
 * l'éffort et le temps d'éffort 
 * Au début recommandation aléatoire, puis avec les points
 * et enfin algo ML
 * 
 * Pour l'ajout des points on peut essayer de voir du coté de sa moyenne
 * habituelle on prend le summary a partir des 3 dernières
 * semaines (temps de mise en place des habitudes) (merci le bucket !)
 * selon google => moyenne
 * Si passe au dessus il y a plus d'éffort..
 * On additionne par variable et par le taux de dépassement
 * exemple : moyenne 1000 pas jour
 * S'il fait 3000 pas (il a un ratio de 3x son score habituelle donc
 * plus trois points !)
 */
export default {
  name: "Recommandation",
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "signin"
          });
        });
    },
    
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped>
header {
  width: 100%;
  font-size: 1em;
  display: flex;
  flex-direction: row;
  justify-content: right;
}
button.nav-link.signout {
  padding: 0.4em;
  background-color: tomato;
  color: white;
  text-align: center;
  border-radius: 5px;
  border: none;
}
.display-name {
  margin-right: 2em;
}
</style>
