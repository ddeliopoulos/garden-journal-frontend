<script lang="ts">

interface Plant {
  name: string
  type: string
  date: string
  thirstLevel: string
  id: number
}

export default {
  props: {
    plant: {
      type: Object as () => Plant,
      required: true
    }
  },
}

</script>

<template>
  <div class="garden">
    <div class="plant-card">
      <router-link style="text-decoration: none; color: inherit;" :to="{name: 'PlantDetails', params: {id: plant.id}}">
        <h2><b></b> {{ plant.name }}</h2>
        <div class="image-cropper">
          <img src="../assets/default-plant.jpg" alt="default-plant-image" class="default-plant">
        </div>
        <br/>
        <b>
          <h4>Type: </h4>
          <p>{{ plant.type }}</p>
          <br/>
          <h4>Date: </h4>
          <p>{{ plant.date }}</p>
          <br/>
        </b>
      </router-link>
    </div>
  </div>

</template>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

p {
  letter-spacing: 1px;
  color: #06466e;
  display: inline;
}

.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}

.default-plant {
  display: inline-block;
  margin: auto;
  height: 100%;
  width: auto;
}

.plant-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.plant-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  margin: auto;
  width: 190px;
}

h2 {
  display: inline-block;
  color: #06466e;
  font-size: 23px;
  font-weight: bold;
  width: 70%;
  height: 30px;
  line-height: 25px;
  margin: auto;
  text-align: center;

}

h4 {
  display: inline;
  color: black;
}

</style>