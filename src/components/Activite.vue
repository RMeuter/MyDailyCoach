<template>
  <div class="p-2">
    <b-container>
      <b-row>
        <h2 class="col-12 text-center m-3">{{activite.nom}}</h2>
        <h5 class="col-12 text-left mb-5">Catégorie : {{activite.cat}}</h5>
      </b-row>
        <b-row>
            <b-card :style="css_styles" :img-src="get_img_activite()" img-alt="Card image" img-left class="mb-3 col-12 border-dark">
              <b-card-text>
                {{activite.desc}}
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
    <router-link class="back" to="/activites">Retour sur les différentes activités</router-link>
  </div>
</template>

<script>
import Activite from "../models/Activite"

export default {
    /**
 *  this.nom = a_nom;
    this.cat = a_cat;
    this.pic = a_pic;
    this.color = a_color; ######
    this.desc = a_desc;
    this.url = a_url;
    this.intenDay = a_intenDay;
    this.ptBienEtre = a_ptBienEtre;
 * 
 */
  name: "Detail",
  props: {
    activite: Activite
  },
  methods: {
    get_img_activite(){
      return require(`../assets/Activite/${this.activite.pic}`)
    }
  },
  computed:{
    css_styles() {
      return { "background-color": this.activite.color }; //création dynamique de style css
    }
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