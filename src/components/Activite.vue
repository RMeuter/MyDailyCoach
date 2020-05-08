<template>
  <div class="p-2">
    <b-container>
      <b-row>
        <h2 class="col-12 text-center m-3">
          <span v-show="estRecommande"> Ma Daily activité :</span>
          {{activite.nom}}
        </h2>
        <h5 class="col-12 text-left mb-5">Catégorie : {{activite.categorie}}</h5>
        <h5 v-show="estRecommande" class="col-12 mb-5">Vous obtenez {{activite.PointBienEtre}} points Bien-Etre</h5>
      </b-row>
        <b-row>
            <b-card :style="css_styles" :img-src="get_img_activite()" img-alt="Card image" img-left class="mb-3 col-12 border-dark">
              <b-card-text>
                {{activite.description}}
              </b-card-text>
            </b-card>
            <b-col cols="12" class=" border-dark rounded" :style="css_styles">
                <b-embed
                    type="iframe"
                    aspect="16by9"
                    :src="activite.url"
                    allowfullscreen
                ></b-embed>
            </b-col>
        </b-row>
    </b-container>
    <router-link class="back" to="/stats">Retour sur l'accueil</router-link>
    <router-link class="back" to="/activites">Retour sur les différentes activités</router-link>
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