<template>
  <div class="popup">
    <div class="popup-inner">
      <slot/>
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
  position: absolute;
  top: -100px;
  left: 300px;
}

.eh{
  position: relative;
}

.popup{
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */


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