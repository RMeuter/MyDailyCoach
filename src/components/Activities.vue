<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-list-group>
            <b-list-group-item href="#" active 
            class="flex-column align-items-start bg-dark"
            v-for="activite in activities" 
            :key="activite">
              <b-container>
                <b-row>
                  <b-col class="mb-4 text-center">
                    <h5 class="mb-1">{{activite.name}}</h5>  
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>  
                    <b-img thumbnail fluid :src="get_img_activite(activite)" alt="Image 1">yep</b-img>
                  </b-col>
                  <b-col>
                    <p class="mb-1">
                      {{activite.desc}}
                    </p>
                    <b-list-group>
                      <b-list-group-item class="bg-dark">
                        Pour une journée intensive sur 10 :
                        <b-badge variant="primary" pill>{{activite.IntensiteJour}}</b-badge>
                      </b-list-group-item>
                      <b-list-group-item class="bg-dark">
                        Point Bien etre en jeu :
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
//import { db } from '../main.js';
import data from "../JsonFile/Activity.json";

export default {
  name: "Activity",
  data(){
    return{
      activities:data.activite,
      newActivitie:""
    }
  },
  methods:{
    get_img_activite(activite){
      return require(`../assets/Activite/${activite.image}`)
    }
  }
  /*
  firestore(){
    return{
      activities: db.collection("activities"),
    }
  }
  */
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