<template>
  <div id="home">
  <div>
    <PlantListDisplay :plants="plants"></PlantListDisplay>
  </div>
    <div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PlantListDisplay from '../components/PlantListDisplay.vue'

export default defineComponent({
  name: 'App',

  data(){
    return{
      plants: [],
    }
  },

  components: {
    PlantListDisplay,
  },

  methods:{
    async deletePlant(id) {
      if (confirm('Are you sure, bitch?')) {
        const response = await fetch(`api/plants/${id}`, {
          method: 'DELETE'
        })

        this.plants = this.plants.filter((plant) => plant.id !== id)
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

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


</style>