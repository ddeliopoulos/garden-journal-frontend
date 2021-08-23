<script lang="ts">
import CallableChild from './CallableChild.vue';
import {ref} from "vue";

export default {
  name: "CallingParent",
  components: {
    CallableChild
  },
  setup() {
    const child = ref<any>(null);

    const buttonClicked = () => {
      child.value.beCalled('Im drunk ' + (Math.random() > 0.5 ? 'yo' : "eyyy"));
    };

    return {
      buttonClicked,
      child
    };
  }
}
</script>

<template>
  <CallableChild ref="child"></CallableChild>
  <button @click="buttonClicked">yellow</button>
</template>

<style scoped>

</style>