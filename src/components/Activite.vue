<template>
  <div class="p-2">
    <b-container>
      <b-row class="pb-3">
        <b-button class="back" to="/activites" variant="info">Retour aux activitées</b-button>
      </b-row>
      
      <b-row class="titre mb-5" :style="css_styles">
        <h2 :style="css_styles" class="col-12 text-center mt-2 pt-3">
          <span v-show="estRecommande"> Ma Daily activité :</span>
          {{activite.nom}}
        </h2>
        <h5 class="col-12 text-left mb-3">Catégorie : {{activite.categorie}}</h5>
        <h5 v-show="estRecommande" class="col-12 mb-3">Vous obtenez {{activite.PointBienEtre}} points Bien-Etre</h5>
      </b-row>

      <b-row :style="css_styles" class="border-dark">
        <b-card :style="css_styles" :img-src="get_img_activite()" img-alt="Card image" img-left class="mb-3 p-0 col-12 ">
          <b-card-text>
            {{activite.description}}
          </b-card-text>
        </b-card>
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
      return { "background-color": this.activite.couleur }; //création dynamique de style css
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //si team n'a pas été communiqué via l'attribut props, on redirige vers la vue master
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
 .container{
    background-color: ;
  }
.border-dark{
  border: 2px solid;
}
</style>