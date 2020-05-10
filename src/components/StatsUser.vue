<template>
  <div>
    <b-container v-if="user.data"> 
      <b-row >
        <b-col cols="6">
          <h4> Salut {{user.data.displayName}}</h4>
        </b-col>
        <!-- ############################# Infos gamifier ############################# !--> 
        <b-collapse  id = "Profil"  class = "mt-2" > 
          <b-card > 
            <Profil :user="user" />
          </b-card > 
        </b-collapse > 
      </b-row>
      
      <!-- ############################# Presentation de l'application en trois points ############################# !-->     
      <b-row v-show="user.data.parametre.NePlusVoirExplication">
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

      <b-row class="mt-3 ">
        <b-col align="center"> 
          <b-button  v-b-toggle.Profil  variant = "primary" > Toggle Collapse </b-button> 
        </b-col>
      </b-row>
      
        <!-- ############################# Recommandation ############################# !-->  
      <b-row class="mt-1 mb-4">
        <b-col align="center">    
          <div v-show="estMoment">
            <b-button
            class="col-4"
            @click="Add_PointBienEtre(getRecommandActivite().ptBienEtre)"
            :to="{name:'detail', params:{activite:getRecommandActivite(), estRecommande:true, nomActivite:getRecommandActivite().nom}}" id="dailyActivity">
              La Daily Activity est là !!
            </b-button>
          </div>  
        </b-col>
      </b-row>

        <!-- ############################# Graphique de l'utilisateur ############################# !-->   
        <b-row>  
        <b-col v-show="user.data.parametre.capteurPas">
          <GraphiquePas />
        </b-col>
        <b-col>
          <GraphiquePointCoeur />
        </b-col>
        <b-col v-show="user.data.parametre.capteurSommeil">
          <GraphiqueSommeil />
        </b-col>
        <b-col>
          <GraphiqueBPM />
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
// ##### Composante 
import GraphiquePas from "./Charts/GraphiquePas";
import GraphiquePointCoeur from "./Charts/GraphiquePointCoeur";
import GraphiqueSommeil from "./Charts/GraphiqueSommeil";
import GraphiqueBPM from "./Charts/GraphiqueFrequenceCardiaque"
import Profil from "./Profil";

// ##### Model et getter 
import { mapGetters, mapActions } from 'vuex';
import Activite from "../models/Activite";
import { db } from "../main.js";

// ##### Donnee importer et fonction rajouter
import data from "../JsonFile/userDataFit"
import regulation from "../utils/regulation"
import calculPointIntensiteJournaliere from "../utils/recommandation"



export default {
  name: "StatsUser",
  firestore() {
    return{ 
      activites : db.collection("Activites"),
    }
  },
  components:{
    GraphiquePas,
    GraphiquePointCoeur,
    GraphiqueSommeil,
    GraphiqueBPM,    
    Profil,
  },
  methods:{
    ...mapActions([
      "Add_PointBienEtre"
    ]),
    async getRecommandActivite(){
      let a_activite = calculPointIntensiteJournaliere(data, regulation, this.activites);
      const a_new_activite = new Activite(
        a_activite.nom,
        a_activite.image,
        a_activite.desc,
        a_activite.cat,
        a_activite.url,
        a_activite.IntensiteJour,
        a_activite.PointBienEtre,
      );
      return a_new_activite
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      estMoment : "estMomentRecommandation"
    }),
  },
};

</script>

<style scoped>
#dailyActivity{
  background-color: #FDAB72;
  color: black;
  border: none;
}
</style>
