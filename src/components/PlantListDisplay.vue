<template>
  <div id="app">
    <div id="plants-title">
      <h1>My Plants</h1>
    </div>
  <div class="plant-list">
    <div class="single-plant-container" :key="plant.id" v-for="plant in plants">
      <Plant @delete-plant="$emit('delete-plant', plant.id)" @update-plant="$emit('update-plant')" @get-plant-info="$emit('get-plant-info')" :plant="plant"/>
    </div>
  </div>
  </div>
</template>

<script>
import Plant from '@/components/Plant.vue'
import AddPlantForm from "@/components/AddPlantForm.vue";

export default {
  name: "PlantListDisplay",

  data(){
    return{
      showAddPlantForm: false
    }
  },

  components: {
    Plant,
    AddPlantForm,
  },

  emits:['delete-plant','update-plant', 'get-plant-info'],

  props:{
    plants: Array
  },

}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}

.single-plant-container{
  display: block;
  width: 50%;

}

.plant-list{
  display: flex;
}

#plants-title h1{
  width:500px;
  margin: 0 auto;
  text-align: center;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>