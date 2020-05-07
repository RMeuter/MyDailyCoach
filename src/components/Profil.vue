<template>
  <b-container> 
  <b-row> 
    <b-col lg = 5>
      <b-img :src="get_lvlImg()" fluid alt="Fluid image"></b-img> <br>
    </b-col>
    <b-col lg = 7>
      Mon niveau : <i>{{niveau.nomNiveau}}</i>
      <b-progress 
      :value="user.data.pointBienEtre" 
      :max="niveau.niveauSup"
      show-progress animated
      ></b-progress>
      {{niveau.commentaire}} <br>
    </b-col>
    
  </b-row>
  </b-container>
</template>

<script>

export default {
  name: "StatsUser",
  props:{
      niveau:{},
      user:{}
  },
  methods:{
     get_lvlImg(){
      return require(`../assets/LevelImage/${this.niveau.photoLevel}`)
    }
  },
  
};

</script>
