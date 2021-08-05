<template>
  <div id="plants-title">
    <h1>My Plants</h1>
  </div>
<div class="plant-list">
  <div class="single-plant-container" :key="plant.id" v-for="plant in plants">
    <Plant @delete-plant="$emit('delete-plant', plant.id)" @update-plant="$emit('update-plant')" :plant="plant"/>
  </div>
</div>
</template>

<script>
import Plant from './Plant.vue'
import AddPlantForm from "@/components/AddPlantForm";
import {defineComponent} from "vue";

export default defineComponent({
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

  emits:['delete-plant','update-plant'],

  props:{
    plants: Array
  },

  methods: {
    async updatePlantList() {
      const response = await fetch('/api/plants', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },

      });

      this.plants = await response.json();

      this.$emit('update-plant')

    },

    async addNewPlant(){
      const response = await fetch('/api/plants', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: "Edit to Add Name",
          type: "Edit to Add Type",
          date: "Edit to Add Date",
        }),
      })

      window.location.reload();

    },
  },



})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.single-plant-container{
  background-color: #bc3315;
  display: inline;
}

#plants-title h1{
  width:500px;
  margin: 0 auto;
  text-align: center;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>