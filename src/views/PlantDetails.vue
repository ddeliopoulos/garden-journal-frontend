<template>
  <div>{{plant}} </div>


<!--  asd;ajds'akdsasd-->
<!--  <div class="plant-card">-->
<!--      <h2><b></b> {{ plant.name }}</h2>-->
<!--      <div class="image-cropper">-->
<!--        <img src="../assets/default-plant.jpg" alt="default-plant-image" class="default-plant">-->
<!--      </div>-->

<!--      <WaterDroplet/>-->

<!--      <b><h4>Type: </h4>-->
<!--        <p>{{plant.type}}</p>-->
<!--        <br/>-->
<!--        <h4>Date: </h4>-->
<!--        <p>{{plant.date}}</p>-->
<!--        <br/></b>-->
<!--  </div>-->
</template>

<script>
import Plant from "@/components/Plant.vue";
import WaterDroplet from "@/components/WaterDroplet.vue";


export default {
  name: 'PlantDetails',

  props:{
    id: String
  },

  components: {
    Plant,
    WaterDroplet,
  },

  data(){
    return{
      plant: null
    }
  },

  methods:{
    async getPlantInfo(){
      console.log(this.id);
      const response = await fetch(`/api/plants/${this.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })


      // const plant = await response.json();
      //
      // console.log(data);
      this.plant = await response.json()
    }
  },
  created(){
    this.getPlantInfo()
  }
}

</script>

<style scoped>

</style>
