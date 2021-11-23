<script lang="ts">
import {defineComponent, ref} from "vue";
import {uploadNewPlant} from '@/components/shared/BackendApi';

interface Plant {
  name: string
  type: string
  createdAt: string
  frequency: string
}

export default defineComponent({

  setup() {
    const plant = ref<Plant>({
      name: "",
      type: "",
      createdAt: "",
      frequency: ""
    })




    const onFormSubmit = async () => {
      console.log("DAYS TO MILLIS BEFORE",plant.value.frequency)

      const daysToMillis = (parseInt(plant.value.frequency) * 24 * 60 * 60 * 1000)


      await uploadNewPlant(plant.value.name, plant.value.type, (new Date(plant.value.createdAt)).getTime(), daysToMillis.toString())
      console.log("DAYS TO MILLIS AFTER",daysToMillis)

      window.location.reload()

      plant.value.name = "";
      plant.value.type = "";
      plant.value.createdAt = "";
      plant.value.frequency = ""
    }
    return {onFormSubmit, plant}
  }
})
</script>

<template>
  <div class="container">
    <label>Plant name: </label>
    <input v-model="plant.name" placeholder="Name of plant"
           required
           type="text">
    <br/>
    <label>Plant type: </label>
    <input v-model="plant.type" placeholder="Type of plant"
           type="text">
    <br/>
    <label>Date planted: </label>
    <input v-model="plant.createdAt"
           type="date">
    <br/>
    <label>Schedule: </label>
    <input v-model="plant.frequency" name="schedule" min="0" ><br/>
    <small id="hint_id_schedule" class="form-text text-muted">
      &#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;&#8195;
      the number of days between waterings
    <i>(e.g.  7)</i>
    </small>
   <br/>
    <button class="button" @click="onFormSubmit">Submit</button>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');
.text-muted {
  color: #6c757d!important;
}
.small {
  font-size: 80%;
  font-weight: 400;
}
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