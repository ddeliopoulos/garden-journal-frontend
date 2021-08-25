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
    <SliderWrapped :closeOnNavigation="true" >
      <router-link to="/"><span>My Garden</span></router-link>
      <router-link to="/privacy"><span>Privacy</span></router-link>
      <router-link to="/about"><span>About</span></router-link>
    </SliderWrapped>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}

.slide-nav{
 position: relative;
  bottom: 500px;
}

html{
  background-color: #E2E8F0;
}
.logo-container h1 {
  color: white;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 200;
}

.logo-container h1 span {
  font-weight: 800;
}

body {
  margin: 0;
}

.navigation a {
  height: 100%;
  display: table;
  float: left;
  padding: 0 20px;
}

.navigation a:last-child {
  padding-right: 0;
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
  top: 65px;
  cursor: pointer;
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
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  top: 50px;
  left: 0;
  background-color: rgb(63, 63, 65); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
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
  color: white;
}

</style>
