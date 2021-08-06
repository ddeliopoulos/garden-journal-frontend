<template>
  asd;ajds'akdsasd
  <div class="plant-card">
      <h2><b></b> {{ plant.name }}</h2>
      <div class="image-cropper">
        <img src="../assets/default-plant.jpg" alt="default-plant-image" class="default-plant">
      </div>

      <WaterDroplet/>

      <b><h4>Type: </h4>
        <p>{{plant.type}}</p>
        <br/>
        <h4>Date: </h4>
        <p>{{plant.date}}</p>
        <br/></b>
  </div>
</template>

<script>
import Plant from "@/components/Plant.vue";
import WaterDroplet from "@/components/WaterDroplet.vue";


export default {
  name: 'PlantDetails',

  props:{
    plants: Object
  },

  components: {
    Plant,
    WaterDroplet,
  },

    data()
    {
      return {
        name: this.name,
        type: this.type,
        date: this.date,
        thirstLevel: this.thirstLevel,
      }
    },

  methods:{
    async getPlantInfo(){
      const response = await fetch('/api/plants', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })

      this.plants = await response.json();

      const data = await response.json()


      this.$emit('get-plant-info', data)

      window.location.reload();
    }
  },

  emits: ['get-plant-info'],
  created(){
    this.getPlantInfo()
  }
}

</script>

<style scoped>

</style>
