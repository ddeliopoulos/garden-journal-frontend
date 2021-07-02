<template>
<div class="container">
  <h1>Plant List</h1>
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
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  background-color: white;
  width: 50%;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  float: right;
  border: 1px solid steelblue;
}
</style>