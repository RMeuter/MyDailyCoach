<template>
  <div class="p-2">
    <b-container>
      <b-row class="pb-3">
        <b-button class="back" to="/activites" variant="info">Retour aux activités</b-button>
      </b-row>
      
      <b-row class="titre mb-5" :style="css_styles">
        <h2 class="col-12 text-center mt-2 pt-3">
          <span v-show="estRecommande"> Ma Daily activité :</span>
          {{activite.nom}}
        </h2>
        <h5 class="col-12 text-left mb-3">Catégorie : {{activite.categorie}}</h5>
        <h5 v-show="estRecommande" class="col-12 mb-3">Vous obtenez {{activite.PointBienEtre}} points Bien-Etre</h5>
      </b-row>

      <b-row :style="css_styles" class="border-dark pt-3">
        <b-col lg="4" class="pb-3" align="center">  
          <b-img thumbnail fluid :src="get_img_activite(activite.get_image())" :alt="activite.nom"></b-img>
        </b-col>
        <b-col lg="8" class="">  
          <p>{{activite.description}}</p>
        </b-col>
        
        <b-col cols="12" class="rounded pt-2 pb-2"  >
          <b-embed
              type="iframe"
              aspect="16by9"
              :src="activite.url"
              allowfullscreen
          ></b-embed>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Activite from "../models/Activite"

export default {
  name: "Detail",
  props: {
    activite: Activite,
    estRecommande: Boolean
  },
  methods: {
    get_img_activite(){
      return require(`../assets/Activite/${this.activite.get_image()}`)
    }
  },
  computed:{
    css_styles() {
      return { "background-color": this.activite.couleur }; 
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (typeof vm.activite === "undefined") {
        next({ name: "activites" });
      } else {
        next();
      }
    });
  }
};
</script>
<style scoped>
.titre{
   box-shadow: 0px 2px 10px grey;
}
.border-dark{
   box-shadow: 0px 2px 10px grey;
}
</style>