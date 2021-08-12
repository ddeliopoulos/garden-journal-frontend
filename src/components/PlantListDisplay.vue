<script lang="ts">
import Plant from '@/components/Plant.vue'
import AddPlantButton from "@/components/AddPlantButton.vue"
import { ref , onMounted} from 'vue'

interface PlantType {
  name: string
  type: string
  date: string
  thirstLevel: string
  id: number
}

export default {
  name: "PlantListDisplay",
  components: {Plant, AddPlantButton},

  setup() {
    const plants = ref<PlantType[]>([]);

    const loadPlants = async () => {
      const response = await fetch('/api/plants', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      plants.value = await response.json();

    }

    onMounted(loadPlants)

    return {plants}
  }
}
</script>

<template>
  <div id="plant-list-display">
    <div id="plants-title">
      <h1>My Garden</h1>
    </div>
    <div id="add-plant-button">
      <AddPlantButton></AddPlantButton>
    </div>
  <div class="plant-list">
    <div class="plant-garden">
    <div class="single-plant-container" :key="plant.id" v-for="plant in plants">
      <Plant :plant="plant"/>
    </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

h1{
padding: 30px;
}

.single-plant-container{
  margin: auto;
  display: inline-block;
  padding: 5px;
}

.plant-list{
  display: inline-block;
  width: 100%;
}

#plants-title h1{
  width:500px;
  margin: 0 auto;
  text-align: center;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>