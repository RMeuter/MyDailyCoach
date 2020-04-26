<template>
  <div>
    <header>
      <template v-if="user.loggedIn">
        <div class="display-name">{{user.data.displayName}} is logged in</div>        
        <button class="nav-link signout" @click.prevent="signOut">Sign Out</button>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link to="login" class="nav-link">Login</router-link>
        </li>
      </template>
    </header>



    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as firebase from "firebase";

export default {
  name: "Master",
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
