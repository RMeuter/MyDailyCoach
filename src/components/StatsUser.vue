<template>
  <div>
    <b-container v-if="user.data && niveau"> 
      <b-row>
        <b-col cols="6">
          <h4> Salut {{user.data.displayName}} </h4>
        </b-col>
        <!-- ############################# Infos gamifier ############################# !-->     
        <Profil :user="user" :niveau="niveau" />
      </b-row>
      <!-- ############################# Presentation de l'application en trois points ############################# !-->     
      <b-row v-if="!user.data.parametre.NePlusVoirExplication">
        <b-col cols="12">
          <b-alert show variant="light" class="border-light" dismissible>
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
        </b-col> 
      </b-row>
      <b-row>
        <!-- ############################# Recommandation ############################# !-->     
        <div v-if="estMoment">
          <b-button @click="Add_PointBienEtre(getRecommandActivite().ptBienEtre)"
          :to="{name:'detail', params:{activite:getRecommandActivite(), estRecommande:true, nomActivite:getRecommandActivite().nom}}"
          >
          La Daily Activity est là !!
          </b-button>
        </div>  
        <!-- ############################# Graphique de l'utilisateur ############################# !-->     
        <b-col>
          <Chart />
        </b-col>
        <b-col>
          <Mixed />
        </b-col>
      </b-row>          
    </b-container>
    <b-container v-else>
      <div style="width:100%;height:0;padding-bottom:57%;position:relative;">
        <iframe 
        src="https://giphy.com/embed/3y0oCOkdKKRi0" 
        width="100%" height="100%" style="position:absolute" 
        frameBorder="0" class="giphy-embed" allowFullScreen
        >
        </iframe>
      </div>
    </b-container>
  </div>
</template>

<script>
import Chart from "./Charts/Chart";
import Mixed from "./Charts/Mixed";
import Profil from "./Profil";

import Acti from "../JsonFile/Activity.json";

import { mapGetters, mapActions } from 'vuex';
import Activite from "../models/Activite"

//https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
export default {
  name: "StatsUser",
  components:{
    Chart,
    Mixed,
    Profil
  },
  methods:{
     get_lvlImg(){
      return require(`../assets/LevelImage/${this.niveau.photoLevel}`)
    },
    progress(){
      return {width :Math.round(100*((this.user.data.pointBienEtre-this.niveau.nombreDePoint)/this.niveau.niveauSup))}
    },
    ...mapActions([
      "Add_PointBienEtre"
    ]),
    getRecommandActivite(){
      // Suite de fonction
      let a_activite = Acti.activite[0];
      const a_new_activite = new Activite(
        a_activite.nom,
            a_activite.image,
            a_activite.desc,
            a_activite.cat,
            a_activite.url,
            a_activite.IntensiteJour,
            a_activite.PointBienEtre,
          );
      //this.$store.dispatch("Add_PointBienEtre", a_new_activite.ptBienEtre)
      return a_new_activite
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      niveau : "niveauObtenu",
      estMoment : "estMomentRecommandation"
    }),
   
  },
  
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
