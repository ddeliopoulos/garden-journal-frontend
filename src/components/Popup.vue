<template>
  <div class="popup">
    <div class="popup-inner">
      <slot/>
      <button class="popup-close">
        close popup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup"
}
</script>

<style scoped lang="scss">

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