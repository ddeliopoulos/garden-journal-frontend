<template>
  <div id="water-droplet-container">
    <h3>click to water plant</h3>
    <div v-if="true" >
      <img id="water-plant-icon-red" src="../assets/water-droplet-red.png" alt="red-droplet" class="red-droplet">
    </div>
<!--    <div v-else-if="plant.waterState === 'yellow'">-->
<!--      <img id="water-plant-icon-yellow" src="../assets/water-droplet-yellow.png" alt="yellow-droplet" class="yellow-droplet">-->
<!--    </div>-->
<!--    <div v-else>-->
<!--      <img id="water-plant-icon-blue" src="../assets/water-droplet-blue.png" alt="blue-droplet" class="blue-droplet">-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "WaterDroplet",

  props:{
    plant: Object,
  },

  methods: {
    waterToSatisfyPlant(id) {
      this.plant.thirstLevel = "satisfied";

    }
  }
}
</script>

<style scoped>

#water-plant-icon-red{
  width: 50px;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;

}

h3{
  color: #06466e;
}
#water-plant-icon-yellow{
  width: 50px;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
  background: url("../assets/water-droplet-yellow.png");
}
#water-plant-icon-blue{
  width: 50px;
  height: 50px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
  background: url("../assets/water-droplet-blue.png");
}
</style>