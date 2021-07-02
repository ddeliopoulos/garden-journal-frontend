<template>
  <div class="plant-container">
    <h3>Name: {{ plant.name }}</h3>
    <i @click="onDelete(plant.id) " class="fas fa-times"></i>
    <p>Type:{{plant.type}} Date: {{plant.date}}</p>
  </div>
</template>

<script>

import {defineComponent} from 'vue';

export default defineComponent({
  name: "Plant.vue",
  props:{
    plant: Object
  },

  methods:{
    onDelete(id){
      this.$emit('delete-plant', id)
    }
  },
})
</script>


<style scoped>
.fas{
  color: red;
  float: right;
}

.plant-container{
  background-color: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>