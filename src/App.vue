<template>
  <div id="app">
    <header>
      <template v-if="user.loggedIn">
       <b-container >
          <b-row align-h="center">
            <b-col lg="11">
             <b-navbar toggleable="lg" type="light" >
                <b-navbar-brand ><H1>My Daily Coach</H1> </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                  <!-- Right aligned nav items -->
                  <b-navbar-nav class="ml-auto">   
                    <b-button v-b-toggle.collapse-1 variant="white">Paramètre</b-button>               
                    <b-button variant="danger" @click.prevent="signOut">Se déconnecter</b-button>
                  </b-navbar-nav>
                </b-collapse>
              </b-navbar>
            </b-col>
          </b-row>
        </b-container >
      </template>
      <template v-else>
         <b-container >
          <b-row align-h="start">
            <b-col align-self="start">
              <h1 class="mb-5">
                My Daily Coach
              </h1>
            </b-col>
          </b-row>
        </b-container >
      </template>
    </header>

    <b-container>
      <b-row>        
        <b-collapse id="collapse-1" class="mt-2 col-12">
          <b-card class="row text-center">
            <b-col class="mb-4">
              <p class="card-text">Quel horraire de recommandation voulez vous ?</p>
              <b-button v-b-toggle.collapse-1-inner size="sm">Modifiez</b-button>
              <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card>
                  <div class="col-md-6">
                    <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                      <input type="text" id="dark-version-example" class="form-control" placeholder="Select time">
                      <label for="dark-version-example">Dark version, 24 hours</label>
                      <i class="fas fa-envelope  input-prefix"></i>
                    </div>
                  </div>
                </b-card>
              </b-collapse>
            </b-col>
            <b-col  class="mb-4">
              <p class="card-text">Quel capteur voulez vous ?</p>
              <b-button v-b-toggle.collapse-2-inner size="sm">Modifiez</b-button>
              <b-collapse id="collapse-2-inner" class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-col>
            <b-col  class="mb-4">
              <p class="card-text">Quel capteur voulez vous ?</p>
              <b-button v-b-toggle.collapse-3-inner size="sm">Modifiez</b-button>
              <b-collapse id="collapse-3-inner" class="mt-2">
                <b-card>Hello!</b-card>
              </b-collapse>
            </b-col>
          </b-card>
        </b-collapse>
      </b-row>
    </b-container>

    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <footer>
      <p class="title">Application bien-être</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as firebase from "firebase";
export default {
  name: "App",
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

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #2c2c32;
  color: white;
}

.title {
  font-weight: bold;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

header {
  font-size: 2em;
  color: #41b883;
  width: 100%;
  text-align: right;
  padding-top: 1em;
  padding-bottom: 1em;
}

a {
  color: #41b883;
}

a:hover {
  color: white;
}

h1 {
  margin: 0;
}

footer {
  color: #41b883;
  text-align: center;
  width: 100%;
  position:absolute;
  bottom:0;
  padding-top:50px;
  height:50px;
}

footer a {
  color: white;
}

footer a:hover {
  color: #35495e;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.mentions {
  font-size: 0.8em;
}
.credits {
  font-size: 0.6em;
}

.view {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}
</style>
