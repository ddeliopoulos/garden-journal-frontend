<template>
    <div class="center">
      <div class="circle">
        <div class="wave"></div>
      </div>
    </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import Popup from "@/components/Popup.vue";

export default defineComponent({
  name: "WaterButton",
  components: {Popup},

  setup() {
    console.log("setting up water button")

    return {}


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
  /*cursor:pointer;*/
  cursor: url("https://i.postimg.cc/yNLChR5G/watering-can-small.png") 50 20, not-allowed;

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

</style>