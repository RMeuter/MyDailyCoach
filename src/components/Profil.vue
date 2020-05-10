<template>
  <b-container> 
  <b-row> 
    <b-col lg = 5>
      <b-img :src="get_lvlImg()" fluid alt="Fluid image"></b-img> <br>
    </b-col>
    <b-col lg = 7>
      Je suis <i>{{niveau().nomNiveau}}</i>
      <b-progress 
      :value="user.data.pointBienEtre" 
      :max="niveau().niveauSup"
      show-progress animated
      ></b-progress>
      {{niveau().commentaire}} <br>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import { db } from "../main.js";

export default {
  name: "StatsUser",
  props:{
      user:{}
  },
  firestore(){
    return{
      niveaux : db
        .collection("niveauUtilisateur")
        .where("nombreDePoint", "<=", this.user.data.pointBienEtre)
        .orderBy("nombreDePoint", "asc")
    }
  },
  methods:{
    niveau(){
      return this.niveaux[0]
    },
    get_lvlImg(){
      return require(`../assets/LevelImage/${this.niveau().photoLevel}`)
    }
  },
  
};

</script>
