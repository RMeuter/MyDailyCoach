<template>
  <div>
    <b-container>
      <b-row class="pt-3">
        <b-col>
          <b-list-group>
            <b-list-group-item href="#" active 
            class="flex-column align-items-start bg-dark"
            v-for="activite in actiz" 
            :key="activite.nom">
              <b-container>
                <b-row>
                  <b-col class="mb-4 text-center">
                    <h5 class="mb-1">{{activite.nom}}</h5>  
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>  
                    <b-img thumbnail fluid :src="get_img_activite(activite.get_image())" :alt="activite.nom"></b-img>
                  </b-col>
                  <b-col>
                    <p class="mb-1">
                      {{activite.description}}
                      <router-link
                      :to="{name:'detail', params:{activite:activite, estRecommande:false, nomActivite:activite.nom}}"
                      >Lien vers l'activité !</router-link> 
                    </p>
                    <b-list-group>
                      <b-list-group-item class="bg-dark">
                        Pour une journée intensive sur 10 :
                        <b-badge variant="primary" pill>{{activite.IntensiteJour}}</b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="bg-dark">
                        Point Bien-Etre en jeu :
                        <b-badge variant="primary" pill>{{activite.PointBienEtre}}</b-badge>
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


import Activite from "../models/Activite"
import {db} from "../main";

export default {
  name: "Activites",
  firestore(){
    return{
      activites : db.collection("Activites")
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
      if (this.activites.length) {
        this.activites.forEach(a_activite => {
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

</style>