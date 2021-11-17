<script lang="ts">
import AddPlantForm from "@/components/AddPlantForm.vue";
import {ref} from "vue";

export default {
  name: 'AddPlantButton',
  components: {AddPlantForm},

  setup() {
    const showAddPlantForm = ref(false);

    return {showAddPlantForm}
  }
}
</script>

<template>
  <div id="add-plant-btn">
    <button class="add-plant-button" @click="showAddPlantForm = true">Add Plant</button>
    <transition name="fade" appear>
      <div class="plant-form-overlay" v-if="showAddPlantForm" @click="showAddPlantForm = false"></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showAddPlantForm">
        <div class="close-form-button" @click="showAddPlantForm = false"></div>
        <AddPlantForm/>
      </div>
    </transition>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
}

.close-form-button {
  position: absolute;
  right: 15px;
  top: 12px;
  width: 25px;
  height: 25px;
  opacity: 0.3;
}

.close-form-button:hover {
  opacity: 1;
}

.close-form-button:before, .close-form-button:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}

.close-form-button:before {
  transform: rotate(45deg);
}

.close-form-button:after {
  transform: rotate(-45deg);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 800px;
  max-height: 600px;
  background-color: #FFF;
  border-radius: 16px;
  padding: 25px;
}

.add-plant-button {
  appearance: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  color: white;
  position: relative;
  bottom: 5em;
  margin: 25px;
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
  box-sizing: border-box;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  font-weight: bolder;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.add-plant-button:hover {
  box-shadow: 2px 2px rgba(0, 0, 0, 0.6);
}

.plant-form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>