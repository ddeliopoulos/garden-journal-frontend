<template>
<div>
  <AddPlantButton></AddPlantButton>
</div>
  <div>
    <PlantListDisplay @delete-plant="deletePlant" :plants="plants"></PlantListDisplay>
  </div>
  <div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlantListDisplay from '../components/PlantListDisplay.vue'
import AddPlantButton from "@/components/AddPlantButton.vue";

export default defineComponent({
  name: 'App',

  data(){
    return{
      plants: [],
    }
  },

  components: {
    AddPlantButton,
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
  background: #eee;
}

</style>