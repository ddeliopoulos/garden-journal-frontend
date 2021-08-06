<template>
  <div id="app">
  <div class="header">
    <div class="inner-header">
      <div class="logo-container">
        <h1>GARDEN<span>JOURNAL</span></h1>
      </div>
      <ul class="navigation">
        <router-link to="/">
          <a><li>Home</li></a>
        </router-link>
        <router-link to="/Plant-List">
          <a><li>Add Plant</li></a>
        </router-link>
        <a><li>Users</li></a>
      </ul>
    </div>
  </div>
  <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './views/Home.vue'

export default defineComponent({
  name: 'App',

  components: {
    Home,
  },


})
</script>

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

.header{
  width: 100%;
  height: 120px;
  display: block;
  background-color: #101010;
}

.inner-header{
  width: 1000px;
  height: 100%;
  display: block;
  margin: 0 auto;

}

.logo-container {
  height: 100%;
  display: table;
  float: left;
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

body{
  margin: 0;
  background: #eee;
}

.navigation{
  float:right;
  height: 100%;
}

.navigation a{
  height: 100%;
  display: table;
  float: left;
  padding: 0 20px;
}

.navigation a:last-child{
  padding-right: 0;
}

.navigation a li{
  display: table-cell;
  vertical-align: middle;
  height: 100%;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: bold;
}

</style>
