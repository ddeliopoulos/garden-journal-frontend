<template>
  <div>
    <AddPlantForm @plant-update="updatePlantList"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AddPlantForm from '../components/AddPlantForm.vue'
import PlantListDisplay from '../components/PlantListDisplay.vue'

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

body{
  margin: 0;
}
</style>