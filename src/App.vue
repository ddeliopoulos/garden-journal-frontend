<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue"

export default defineComponent({
  name: 'App',

  components: {
    Header,
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

</style>
