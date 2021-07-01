<template>
  <h1>GARDEN JOURNAL</h1>
  <div>
    <AddPlantForm @update-plant-list="updatePlantList"/>
    <PlantListDisplay></PlantListDisplay>

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
      name: '',
      type: '',
      date: '',
    }
  },

  components: {
    AddPlantForm,
    PlantListDisplay,
  },
  methods:{
    updatePlantList(event: any) {
      this.name = event.name;
      this.type = event.type;
      this.date = event.date;
    }
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