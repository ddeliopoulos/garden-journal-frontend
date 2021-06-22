<template>
  <h1>GARDEN JOURNAL</h1>
  <AddPlantForm/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddPlantForm from './components/AddPlantForm.vue'

export default defineComponent({
  name: 'App',
  components: {
    AddPlantForm,
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body{
  margin: 0;
  background: #eee;
}
</style>
