<script lang="ts">
import {ref} from "vue";

interface Plant {
  name: string
  type: string
  date: string
}

export default {

  setup() {
    const plant = ref<Plant>({
      name: "",
      type: "",
      date: "",
    })

    const onFormSubmit = async () => {
      await fetch('/api/plants', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: plant.value.name,
          type: plant.value.type,
          date: plant.value.date,
          thirstLevel: "dying"
        }),
      })

      window.location.reload()

      plant.value.name = "";
      plant.value.type = "";
      plant.value.date = "";

    }
    return {onFormSubmit, plant}
  }
}
</script>

<template>
  <div class="container">
    <label>Plant Name: </label>
    <input type="text" placeholder="Name of plant"
           v-model="plant.name"
           required>
    <br/>
    <label>Plant Type: </label>
    <input type="text" placeholder="Type of plant"
           v-model="plant.type">
    <br/>
    <label>Date Planted: </label>
    <input type="date"
           v-model="plant.date">
    <br/>
    <button @click="onFormSubmit" class="button">Submit</button>
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
  padding: 15px 25px;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
  border-radius: 8px;

  color: #FFF;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

h1 {
  text-align: center;
  margin: 10px auto;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>