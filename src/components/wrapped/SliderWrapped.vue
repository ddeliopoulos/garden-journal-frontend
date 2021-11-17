<script>
import { Slide } from 'vue3-burger-menu';

export default {
  name: "SliderWrapped",
  components: {Slide}
}
</script>

<template>
  <Slide width="200">
    <slot></slot>
  </Slide>
</template>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>