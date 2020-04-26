<template>
  <section class="container">
    <div class="country" :style="css_styles">
      <router-link
        :style="css_styles"
        :to="{name:'details', params:{team:team,countryName:team.name}}"
      >
        <img class="flag" :src="get_flag_img()" />
        <h2>{{team.name}}</h2>
      </router-link>
    </div>
  </section>
</template>

<script>
import Activity from "../models/Activity";

export default {
  name: "Country",
  props: {
    activity: Activity
  },
  methods: {
  },
  computed: {
    css_styles() {
      return { color: this.activity.color }; //création dynamique de style css
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

.country {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  padding: 0.5em;
}

.world-cup,
.flag {
  width: 3rem;
}

h2 {
  font-size: 0.6em;
  margin: 0;
  padding: 0;
}
</style>