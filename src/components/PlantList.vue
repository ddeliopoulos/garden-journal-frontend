<script>
import {ref, watch} from "vue";

export default {
  setup(){
    const plants = ref([])

    watch(
        () => [...plants.value],
        async () => {
      const response = await fetch("api/plants");
      plants.value = await response.json();
    });

    return{ plants };
  }
}
</script>

<template>
  dfgdfg
  <table class="single-plant-container" :key="plant.id" v-for="plant in plants">
    {{plant.name}}
  </table>
</template>

<style scoped>

</style>