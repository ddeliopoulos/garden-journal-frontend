<template>
  TESTING PAGE
<WaterButton/>
<br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <button @click="() => togglePopup('buttonTrigger')">OPEN POPUP</button>

  <Popup
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')">
    <h2>My Button Popup</h2>
  </Popup>

</template>

<script lang="ts">
import WaterButton from "/src/components/WaterButton.vue"
import Popup from "@/components/Popup.vue";
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "Testing",
  components: {Popup, WaterButton},
  setup() {
    const popupTriggers = ref ({
      buttonTrigger: false,
    });

    function togglePopup(){
      popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger
    }

    return {Popup, popupTriggers, togglePopup}
  }
})
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>