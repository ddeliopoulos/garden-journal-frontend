<script lang="ts">
import {ref} from "vue";
import {uploadNewPlant} from '@/components/shared/BackendApi';

interface Plant {
  name: string
  type: string
  createdAt: string
}

export default {

  setup() {
    const plant = ref<Plant>({
      name: "",
      type: "",
      createdAt: ""
    })

    const onFormSubmit = async () => {
      await uploadNewPlant(plant.value.name, plant.value.type, (new Date(plant.value.createdAt)).getTime())

      window.location.reload()

      plant.value.name = "";
      plant.value.type = "";
      plant.value.createdAt = "";
    }
    return {onFormSubmit, plant}
  }
}
</script>

<template>
  <div class="container">
    <label>Plant Name: </label>
    <input v-model="plant.name" placeholder="Name of plant"
           required
           type="text">
    <br/>
    <label>Plant Type: </label>
    <input v-model="plant.type" placeholder="Type of plant"
           type="text">
    <br/>
    <label>Date Planted: </label>
    <input v-model="plant.createdAt"
           type="date">
    <br/>
    <button class="button" @click="onFormSubmit">Submit</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

label {
  padding: 5px;
  display: block;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  float: left;
}

input {
  width: 25%;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 16px;
  margin: 15px 15px 15px 55px;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  background-image: linear-gradient(to right, #141e30, #243b55);
  border-radius: 8px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 18px;
}

h1 {
  text-align: center;
  margin: 10px auto;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>