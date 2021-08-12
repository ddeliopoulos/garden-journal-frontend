<script>
import { Slide } from 'vue3-burger-menu';

export default {
  name: "SliderWrapped",
  components: {
    Slide
  }
}
</script>

<template>
  <Slide>
    <slot></slot>
  </Slide>
</template>

<style scoped>

</style>