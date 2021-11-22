<template>
  <div class="popup">
    <div class="popup-inner">
      <slot/>
<!--      <button class="popup-close" @click="togglePopup()">-->
        <i class="fas fa-times fa-lg" @click="togglePopup()"></i>
<!--      </button>-->
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";


export default defineComponent({
  name: "Popup",
  props: {
    togglePopup: {
      type: Function as PropType<() => void>
    },
  }
})
</script>

<style scoped lang="scss">
.fas{
  position: relative;
  bottom: 60px;
  cursor: pointer;
  left: 145px;

}

.popup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.2);

  .popup-inner{
    background: white;
    padding: 32px;
  }
}

.popup-inner{
  background: white;
  padding: 32px;
}

</style>