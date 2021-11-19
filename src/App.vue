<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue"
import SliderWrapped from "@/components/wrapped/SliderWrapped.vue";

export default defineComponent({
  name: 'App',

  components: {
    Header, SliderWrapped,

  },
})
</script>

<template>
  <div id="app">

    <Header></Header>
    <router-view/>
  </div>
  <div class="slide-nav">
    <SliderWrapped :closeOnNavigation="true">
      <router-link to="/"><span class="icons" ><i class="fa fa-home"></i>My Garden</span></router-link>
      <router-link to="/privacy"><span class="icons"><i class="fas fa-lock"></i>Privacy</span></router-link>
      <router-link to="/about"><span class="icons-ab"><i class="fa fa-info-circle" style="font-size:20px"></i>
About</span></router-link>
    </SliderWrapped>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

#app {
  background-color: #E2E8F0;
}

.icons i{
  padding-right: 5px;/*space before the red outline*/
  margin-right: 5px;/*also between the red and blue*/
}

.slide-nav {
  width: 100%;
}

.logo-container h1 {
  color: black;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 200;
  position: relative;
  top: 15px;
  right: 10px;
}

.logo-container h1 span {
  font-weight: 800;
}

.navigation a li {
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.bm-burger-button {
  position: fixed;
  width: 36px;
  height: 30px;
  left: 20px;
  top: 30px;
  cursor: pointer;
  z-index: 99;
}

.bm-burger-bars {
  background-color: #373a47;
}

.line-style {
  position: absolute;
  height: 20%;
  left: 0;
  right: 0;
}

.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}

.bm-cross {
  background: #bdc3c7;
  position: relative;
  bottom: 18px;
  left: 14px;
}

.bm-cross-button {
  height: 24px;
  width: 24px;
}

.bm-menu {
  height: 100%; /* 100% Full-height */ /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  top: 80px;
  left: 0;
  background-color: #E2E8F0; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 20px;
}

.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}

.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 700;
  color: black;
  font-family: 'Josefin Sans', sans-serif;
}

</style>
