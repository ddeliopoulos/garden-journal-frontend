<script lang="ts">
import {defineComponent, ref} from "vue";
import { uploadNewPlant} from '@/components/shared/BackendApi';

interface Plant {
  name: string
  type: string
  createdAt: string
  frequency: string
  id: string
}

export default defineComponent({

  name: "AddPlantForm",
  emits: ["plantId", "daysToMillis"],

  setup(props, {emit}) {

    const plant = ref<Plant>({
      name: "",
      type: "",
      createdAt: "",
      frequency: "",
      id: ""
    })

    const daysToMillis = ref();

    const onFormSubmit = async () => {
      console.log("DAYS TO MILLIS BEFORE", plant.value.frequency)

      daysToMillis.value  = (parseInt(plant.value.frequency) * 24 * 60 * 60 * 1000)


      const getPlantId = await uploadNewPlant(plant.value.name, plant.value.type, (new Date(plant.value.createdAt)).getTime(), daysToMillis.value.toString())
      console.log("DAYS TO MILLIS AFTER", daysToMillis.value)

      plant.value.id = await getPlantId.json()
      console.log("New uploaded plant Id: ", plant.value.id)

      emit("plantId", plant.value.id)
      emit("daysToMillis", daysToMillis.value)


      // const checkIfWateredRecently =  Date.now()-

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
    <div class="image-cropper">
      <img height="250" width="300" class="default-img-add-plant" src="/default-plant-img.jpg" alt=""/>
    </div>
    <label class="label-text">Plant name: </label>
    <input class="add-plant-input" v-model="plant.name" placeholder="Name of plant"
           required
           type="text">
    <br/>
    <label class="label-text">Plant type: </label>
    <input class="add-plant-input" v-model="plant.type" placeholder="Type of plant"
           type="text">
    <br/>
    <label class="label-text">Date planted: </label>
    <!--    <div class="date-label">-->
    <input class="add-plant-input" v-model="plant.createdAt"
           type="date">
    <!--    </div>-->
    <br/>
    <label class="label-text">Schedule: </label>
    <input class="add-plant-input" v-model="plant.frequency" name="schedule" min="0"><br/>
    <small id="hint_id_schedule" class="form-text text-muted">
      the number of days between waterings
      <i>(e.g. 7)</i>
    </small>
    <br/>
    <button class="button" @click="onFormSubmit">Submit</button>
  </div>

</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

.default-img-add-plant {
  position: relative;
}

.image-cropper {
  width: 300px;
  height: 250px;
  position: relative;
  right: -240px;
  bottom: -40px;
  overflow: hidden;
  margin: auto;
  border-radius: 20px;
}

.container {
  position: relative;

}

.text-muted {
  color: #6c757d !important;
}

.small {
  font-size: 80%;
  font-weight: 400;
}

.add-plant-input {
  border: none;
  border-bottom: 1px solid #ccc;
  height: 40px;
  width: 35%;
  position: relative;
  top: -240px;
  left: -95px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
}

#hint_id_schedule {
  position: relative;
  left: -60px;
  top: -240px;
}

.label-text {
  font-size: 20px;
  font-family: 'Josefin Sans', sans-serif;
  margin: 10px 0 0px 35px;
  display: flex;
  flex-direction: row;
  position: relative;
  left: -50px;
  top: -200px;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 8px 16px;
  background-image: linear-gradient(to right, #141e30, #243b55);
  border-radius: 8px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  width: 25%;
  top: -150px;

}

//
//h1 {
//  text-align: center;
//  margin: 10px auto;
//  font-family: Catamaran, serif;
//  text-decoration: underline;
//}
</style>