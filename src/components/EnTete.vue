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
                    Parametre capteur pas
                  </b-form-checkbox>
                  <b-form-checkbox v-model="Sommeil" size="lg" switch>
                    Parametre sommeil
                  </b-form-checkbox>
                  <b-col offset="4" cols="4" class="p-4">
                    <b-button @click="modifCapteur()" variant="light">
                      J'enregistre ! 
                    </b-button>
                  </b-col>
              </b-col>
              <b-col class="m-4">
                <h4 class="card-text m-4">Autre parametre :</h4>
                  <b-form-checkbox v-model="Presentation" size="lg" switch>
                    Affichez le menue de présentation
                  </b-form-checkbox>
                  <b-col offset="4" cols="4" class="p-4">
                    <b-button @click="Modify_Params([0, Presentation])">
                    J'enregistre !
                    </b-button>
                  </b-col>
              </b-col>
              <b-col  class="mb-4">
                <h4 class="col-12 card-text text-dark m-4">Heure de recommandation :</h4>
                  Votre heure de recommandation actuelle : {{formatHeure()}}
                <b-col offset="4" cols="4" text-variant="primary">
                  <b-time v-model="momentReco"></b-time>
                </b-col>
                <b-col offset="4" cols="4" class="p-4">
                  <b-button @click="Modify_MomentRecommandation(stringConvertArrayNumber())">
                    J'enregistre !
                  </b-button>
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

var nomVar = ["Presentation", "Pas", "Sommeil"]  

export default {
  data(){
    return{
      Presentation:false,
      Pas:false,
      Sommeil:false,
      momentReco:null,
    }
  },
   methods: {
     modifCapteur(){
       for(let param in [1, 2]){
         this.Modify_Params([param, this[nomVar[param]]])
       }
     },
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
      "Modify_Params"
    ]),
    formatHeure(){  
      if(this.user){
        if( "momentRecommandation" in this.user.data)
          return (this.user.data.momentRecommandation).join(":")
        else
          return null
      }
    },
    stringConvertArrayNumber(){
      return ((this.momentReco.slice(0,5)).split(":")).map(a => {return parseInt(a)})
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
    
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
