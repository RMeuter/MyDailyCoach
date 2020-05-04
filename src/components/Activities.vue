<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item href="#" active 
            class="flex-column align-items-start bg-dark"
            v-for="activite in actiz" 
            :key="activite">
              <b-container>
                <b-row>
                  <b-col class="mb-4 text-center">
                    <h5 class="mb-1">{{activite.nom}}</h5>  
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>  
                    <b-img thumbnail fluid :src="get_img_activite(activite.get_image())" :alt="activite.nom">yep</b-img>
                  </b-col>
                  <b-col>
                    <p class="mb-1">
                      {{activite.desc}}
                      <router-link
                      :to="{name:'detail', params:{activite:activite, estRecommande:false, nomActivite:activite.nom}}"
                      >Lien vers l'activité !</router-link> 
                    </p>
                    <b-list-group>
                      <b-list-group-item class="bg-dark">
                        Pour une journée intensive sur 10 :
                        <b-badge variant="primary" pill>{{activite.intenDay}}</b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="bg-dark">
                        Point Bien etre en jeu :
                        <b-badge variant="primary" pill>{{activite.ptBienEtre}}</b-badge>
                      </b-list-group-item>
                    </b-list-group> 
                  </b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//import { db } from '../main.js';
import data from "../JsonFile/Activity.json";
import Activite from "../models/Activite"

export default {
  name: "Activites",
  data(){
    return{
      activities:data.activite,
      newActivitie:""
    }
  },
  methods:{
    get_img_activite(nomPic){
      return require(`../assets/Activite/${nomPic}`)
    }
  },
  computed:{
    actiz(){
      let mapped_teams = [];
      if (data.activite.length) {
        console.log(data.activite)
        data.activite.forEach(a_activite => {
          console.log(a_activite);
          const a_new_activite = new Activite(
            a_activite.nom,
            a_activite.image,
            a_activite.desc,
            a_activite.cat,
            a_activite.url,
            a_activite.IntensiteJour,
            a_activite.PointBienEtre,
          );
          mapped_teams.push(a_new_activite);
        })
        return mapped_teams;
      } else {
        return mapped_teams;
      }
    }
  }

};
</script>

<style>
a,
a.router-link-exact-active.router-link-active {
  text-decoration: none !important;
}

a:hover,
a.router-link-exact-active.router-link-active:hover {
  text-decoration: none !important;
  color: white !important;
}

a {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}


h2 {
  font-size: 0.6em;
  margin: 0;
  padding: 0;
}
</style>