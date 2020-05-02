<template>
  <div id="app">
    <header>
      <h1>
        <router-link to="/master">My Daily Coach</router-link>
      </h1>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <footer>
      <p class="title">Application bien-être</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
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

header {
  font-size: 2em;
  color: #41b883;
  width: 100%;
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1em;
}

a {
  color: #41b883;
}

a:hover {
  color: white;
}

h1 {
  margin: 0;
}

footer {
  color: #41b883;
  text-align: center;
  width: 100%;
  position:absolute;
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
