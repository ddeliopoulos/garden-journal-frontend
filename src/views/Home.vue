<template>
  <div id="app">
    <div id="add-plant-button">
      <AddPlantButton></AddPlantButton>
    </div>
  <div>
    <PlantListDisplay @delete-plant="deletePlant" :plants="plants"></PlantListDisplay>
  </div>
    <div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import PlantListDisplay from '../components/PlantListDisplay.vue'
import AddPlantButton from "@/components/AddPlantButton.vue";
import PlantDetails from "@/views/PlantDetails.vue";

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

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.add-plant-button{
  float: left;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}

</style>