<script lang="ts">
import PlantListDisplay from '../components/PlantListDisplay.vue'

export default {
  name: 'App',
  components: {
    PlantListDisplay,
  },

  data() {
    return {
      plants: [],
    }
  },
}
</script>

<template>
  <div id="home">
    <div>
      <PlantListDisplay :plants="plants"></PlantListDisplay>
    </div>
  </div>
</template>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>