<template>
  <div>

    <b-container >
      <h4 class="alert-heading text-center mb-5">Bienvenue Bob</h4>
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
    <div v-if="outHourButtonShow">
      <b-link href="/signin">Accès à la recommandation de la journée</b-link>
    </div>
  </div>
</template>

<script>
import Chart from "./Charts/Chart";
import Mixed from "./Charts/Mixed";

export default {
  name: "MyTest",

  components:{
    Chart,
    Mixed
  },
  methods:{
    firstTime(){
      return true
    }
  },
  computed: {
    outHourButtonShow(){
      let date = new Date();
      return date.getHours()>=0 && date.getHours()<=2;
    },
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
