<template>
  <div class="plantEditor">
  <router-link :to="'/'" class="back btn">Back</router-link>
  <h1>Plant Information</h1>
    <div class="form-group">
      <b>Name: </b> {{plant.name}}<br>
      <b>Type:</b>
      <b>Date:</b>

      <label for="plantDescription">Plant Description</label>

      <input type="text" id='plantDescription' class='form-control' placeholder='Add new plant description here' v-model='plantDescription'>
      <button @click="onEditSubmit" class="button">Save Plant</button>
    </div>
  </div>

</template>

<script>

import {defineComponent} from 'vue';

export default defineComponent( {
  name: "PlantEditorDisplay.vue",
  props:{
    plant: Object
  },

})

</script>

<style scoped>

</style>