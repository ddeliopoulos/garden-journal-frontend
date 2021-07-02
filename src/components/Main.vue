<template>
  <h1>GARDEN JOURNAL</h1>
  <div>
    <AddPlantForm @plant-update="updatePlantList"/>
    <PlantListDisplay @delete-plant="deletePlant" :plants="plants"></PlantListDisplay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddPlantForm from './AddPlantForm.vue'
import PlantListDisplay from './PlantListDisplay.vue'

export default defineComponent({
  name: 'App',

  data(){
    return{
      plants: [],
    }
  },

  components: {
    AddPlantForm,
    PlantListDisplay,
  },
  methods:{
    async deletePlant(id : any) {
      if (confirm('Are you sure, bitch?')) {
        const response = await fetch(`api/plants/${id}`, {
          method: 'DELETE'
        })

      this.plants = this.plants.filter((plant : any) => plant.id !== id)
      }
    },

    async updatePlantList() {
      const response = await fetch('/api/plants', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },

      });

      this.plants = await response.json();

    }
  },
  created() {
    this.updatePlantList();
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