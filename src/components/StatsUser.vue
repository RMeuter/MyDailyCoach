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
        </b-col> 
      </b-row>
      <b-row>
        <!-- ############################# Graphique de l'utilisateur ############################# !-->     
        <b-col>
          <Chart />
        </b-col>
        <b-col>
          <Mixed />
        </b-col>
      </b-row>          
    <div v-if="this.$store.getters.dateRecommandation">
        <router-link
          :to="{name:'detail', params:{activite:activite, estRecommande:true, nomActivite:activite.nom}}"
        >Lien vers l'activité !</router-link>
    </div>
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
import { mapGetters } from 'vuex';



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
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      niveau : "niveauObtenu"
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
