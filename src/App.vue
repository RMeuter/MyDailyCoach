<template>
  <div id="app">
    
    <Entete/>
    <!-- ############################## Transition #################################  !-->
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    
    <!-- ############################## Footer #################################  !-->
    <BasDePage/>
  </div>
</template>

<script>
import Entete from "./components/EnTete"
import BasDePage from "./components/BasDePage"
export default {
   name: "App",
   components:{
     Entete,
     BasDePage
   }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #2c2c32;
  color: white;

}

.title {
  font-weight: bold;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

footer {
  color: #41b883;
  text-align: center;
  width: 100%;
  bottom:0;
  padding-top:50px;
  height:50px;
}

footer a {
  color: white;
}

footer a:hover {
  color: #35495e;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.mentions {
  font-size: 0.8em;
}
.credits {
  font-size: 0.6em;
}

.view {
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
}
</style>
