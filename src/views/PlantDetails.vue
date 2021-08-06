<template>
  FAK
</template>

<script>

import { defineComponent } from 'vue';
import Plant from "@/components/Plant.vue";


export default defineComponent({
  name: 'PlantDetails',

  props: {
    plant: Object,
  },

  components: {
    Plant,
  },

  data() {
    return {
      name: this.name,
      type: this.type,
      date: this.date,
      thirstLevel: this.thirstLevel,
    }
  },

  emits: ['get-plant-info'],


})
</script>

<style scoped>

</style>
