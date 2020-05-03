<template>
  <div>
    <b-container >
      <b-row>
        <b-col cols="4">
          <h4 class="alert-heading text-center mb-5">Bienvenue {{user}} </h4>
        </b-col>
        <b-col offset="1" cols="3">
          <b-button v-b-toggle.collapse-1 variant="white">Paramètre</b-button>
        </b-col>
        <b-col cols="4">
          <b-button variant="danger" @click.prevent="signOut">Se déconnecter</b-button>
        </b-col>
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
      <b-row v-if="firstTime"> 
        <b-alert show variant="light" dismissible>
          <p>Voici comment fonctionne l'application :</p>
          <b-alert show variant="primary">
            Vous devez installer Google Fit pour nous permettre de recupérer votre activité !
            </b-alert>
          <b-alert show variant="secondary">
            Vous choisissez l'heure de votre Daily Activity !
            </b-alert>
          <b-alert show variant="success">
            Profitez pleinnement de notre application ! 
            </b-alert>
        </b-alert>
      </b-row>
      <b-row>
        <b-col>
          <Chart />
        </b-col>
        <b-col>
          <Mixed />
        </b-col>
      </b-row>          
    </b-container>
    <div ><!-- v-if="outHourButtonShow">!-->
      <b-link href="/signin">Accès à la recommandation de la journée</b-link>
    </div>
  </div>
</template>

<script>
import Chart from "./Charts/Chart";
import Mixed from "./Charts/Mixed";
import { mapGetters } from "vuex";
import * as firebase from "firebase";

export default {
  name: "StatsUser",
  components:{
    Chart,
    Mixed
  },
  methods:{
    signOut() {
       firebase
       .auth()
       .signOut()
       .then(() =>
        this.$router.replace({name : "signin"})
       )
    },
    firstTime(){ // ça doit passer en props !
      return true
    }
  },
  computed: {
      outHourButtonShow(){
        let date = new Date();
        return date.getHours()>=0 && date.getHours()<=2;
    }
  },
  ...mapGetters({
      user:"user",
  })
  
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
</style>
