<template>
<div class="container">
  <h1>My Plants</h1>
  <el-button class="addPlantBtn" type="success" icon="el-icon-plus" circle></el-button>
  <div :key="plant.id" v-for="plant in plants">
    <Plant @delete-plant="$emit('delete-plant', plant.id)" :plant="plant"/>
  </div>
</div>
</template>

<script>
import Plant from './Plant.vue'
import {defineComponent} from "vue";

export default defineComponent({
  name: "PlantListDisplay",

  components: {
    Plant,
  },

  emits:['delete-plant'],

  props:{
    plants: Array
    }

})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.addPlantBtn{

}

.container {
  background-color: white;
  width: 54%;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid steelblue;

}

h1{
  text-align: center;
  margin: 10px auto;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>