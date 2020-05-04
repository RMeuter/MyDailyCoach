<template>
  <div class="country container" :style="css_styles">
    <b-col>  
        <b-img thumbnail fluid :src="get_img_activite()" :alt="activite.name">yep</b-img>
    </b-col>
    <h2>{{activite.nom}}</h2>
    <h3>{{activite.cat}}</h3>
    <b-container>
        <b-row>
            <b-col>
                {{activite.desc}}
            </b-col>
            <b-col>
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
  name: "Details",
  props: {
    activite: Activite
  },
  data() {
    return {
      
    };
  },
  methods: {
    get_img_activite(){
      return require(`../assets/Activite/${this.activite.pic}`)
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