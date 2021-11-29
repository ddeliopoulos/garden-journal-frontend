<template>
    <div class="center">
      <div :class="`circle circle-${waterDropletColor}`"  @click="uploadWaterJournalEntry">
        <div class="wave"></div>
      </div>
    </div>

</template>

<script lang="ts">
import {defineComponent, ref, toRefs} from "vue";
import Popup from "@/components/Popup.vue";
import {uploadWateringEntry} from "@/components/shared/BackendApi";

interface Plant {
  id: number
}

export default defineComponent({
  name: "WaterButton",
  components: {Popup},
  emits: ['journalId'],
  props: {
    plant: {
      type: Object as () => Plant,
      required: true
    },
    waterDropletColor: String
  },

  setup(props, {emit}) {

    console.log("im in button",props.waterDropletColor)

    const {waterDropletColor} = toRefs(props)


    const uploadWaterJournalEntry = async () => {
      console.log("Attempting to post a Watering Journal")
      const journalId = await uploadWateringEntry(props.plant.id)
      const jId = await journalId.json();
      emit('journalId', jId)
      console.log("Watering Journal Successfully Posted!")
    };


    return {uploadWaterJournalEntry, waterDropletColor}


  }

})
</script>

<style scoped lang="css">


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  background-color: #262626;
}

.circle {
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  bottom: -5px;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.circle:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.circle:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.circle:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.circle:focus {
  outline: 1px transparent;
}

.circle:before {
  display: none;
}

.circle::-webkit-details-marker {
  display: none;
}


.center {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circle {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  cursor: url("/watering-can-small.png") 50 20, pointer;
}

.wave {
  background-color: #3f68c5;
  position: absolute;
  top: 110%;
  height: 200%;
  width: 200%;
  border-radius: 38%;
  left: -50%;
  transform: rotate(360deg);
  transition: all .5s ease;
  animation: wave 10s linear infinite;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(3600deg);
  }
}

.circle:hover .wave {
  top: 0%;
}


.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.circle-red {
  background-color: red;
}

.circle-red:hover {
  background-color: red;
}

.circle-green {
  background-color: green;
}

.circle-green:hover {
  background-color: green;
}

.circle-yellow {
  background-color: yellow;
}
.circle-yellow:hover {
  background-color: yellow;
}
</style>