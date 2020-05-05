<template>
    <b-col  cols="12">
        <b-col cols="6">
        <b-img :src="get_lvlImg()" fluid alt="Fluid image"></b-img> <br>
        </b-col>
        <b-col cols="6">
        Votre nombre de point : {{niveau.nombreDePoint}} --- Votre progression : {{user.data.pointBienEtre}}
        <div class="progress">
            <div 
            class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            :aria-valuenow="user.data.pointBienEtre" 
            :aria-valuemin="niveau.nombreDePoint" 
            :aria-valuemax="niveau.niveauSup" :style="progress">
            </div>
        </div>
        {{niveau.commentaire}} <br>
        </b-col>
    </b-col>
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
    },
    progress(){
      return {width :Math.round(100*((this.user.data.pointBienEtre-this.niveau.nombreDePoint)/this.niveau.niveauSup))}
    }
  },
  
};

</script>