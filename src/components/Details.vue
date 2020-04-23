<template>
  <div class="country container" :style="css_styles">
    <h2>{{team.name}}</h2>
    <h3>{{team.continent}}</h3>
    <div class="victories">
      <img
        v-for="(victory,index) in team.victories"
        :key="index"
        :src="get_world_cup_img()"
        class="world-cup"
        height="32px"
      />
    </div>
    <Chart :team="team" />
    <router-link class="back" to="/countries">go back</router-link>
  </div>
</template>

<script>
import Team from "../models/Team";
import Chart from "./Chart";

export default {
  name: "Details",
  components: {
    Chart
  },
  props: {
    team: Team
  },
  data() {
    return {
      css_styles: {
        color: this.team.color //création dynamique de style css
      }
    };
  },
  methods: {
    get_world_cup_img() {
      return require(`@/assets/world-cup.png`);
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //si team n'a pas été communiqué via l'attribut props, on redirige vers la vue master
      if (typeof vm.team === "undefined") {
        next({ name: "master" });
      } else {
        next();
      }
    });
  }
};
</script>

<style scoped>
.back {
  font-size: 0.3em;
}

a,
a.router-link-exact-active.router-link-active {
  text-decoration: none !important;
}

a:hover,
a.router-link-exact-active.router-link-active:hover {
  text-decoration: none !important;
  color: white !important;
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.country {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  padding: 0.5em;
}

.flag {
  width: 3rem;
  display: block;
}

h2 {
  font-size: 0.6em;
  margin: 0;
  padding: 0;
}
h3 {
  font-size: 0.4em;
  margin: 0;
  padding: 0;
}

div.victories {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>