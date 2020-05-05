<template>
  <header>  
    <!-- ##################################### Mode connecter ######################################### !-->
    <template v-if="user.loggedIn">
      <b-container >
        <b-row align-h="center">
          <b-col lg="11">
            <b-navbar toggleable="lg" type="light" >
              <b-navbar-brand ><H1>My Daily Coach</H1> </b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">   
                  <b-button v-b-toggle.collapse-1 variant="white">Paramètre</b-button>               
                  <b-button variant="danger" @click.prevent="signOut">Se déconnecter</b-button>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
          </b-col>
        </b-row>
        <b-row>        
          <b-collapse id="collapse-1" class="mt-2 col-12">
            <b-card class="row text-left">
              <b-col class="m-4">
                <h4 class="card-text m-4">Mes parametres capteur :</h4>
                  <b-form-checkbox v-model="Pas" size="lg" switch>
                    Parametre capteur pas {{Pas}}
                  </b-form-checkbox>
                  <b-form-checkbox v-model="Sommeil" size="lg" switch>
                    Parametre sommeil {{user.data.parametre.PointCoeur}}
                  </b-form-checkbox>
              </b-col>
              <b-col class="m-4">
                <h4 class="card-text m-4">Autre parametre :</h4>
                  <b-form-checkbox v-model="Presentation" size="lg" switch>
                    Affichez le menue de présentation
                  </b-form-checkbox>
              </b-col>
              <b-col  class="mb-4">
                <h4 class="col-12 card-text m-4">Heure de recommandation :</h4>
                <b-col cols="12">
                  <b-form-input v-model="Time" id="type-time" type="time"></b-form-input>
                  {{Time}}
                </b-col>
              </b-col>
            </b-card>
          </b-collapse>
        </b-row>
      </b-container >
    </template>
    <!-- ##################################### Mode Non connecter ######################################### !-->
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as firebase from "firebase";

export default {
  data(){
    return{
      Time:this.user.data.momentRecommandation,
      Pas:true,//this.user.data.parametre.NombreDePas,
      Sommeil:false,//this.user.data.parametre.PointCoeur,
      Presentation:this.user.data.parametre.NePlusVoirExplication
    }
  },
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
    ...mapActions([
      "Modify_MomentRecommandation",
      "SET_PARAMETRE"
    ])
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
