<template>
  <div class="plant-container">
    <h2><b>Name:</b> {{ plant.name }}</h2>
    <button @click="onDelete(plant.id) " class="deleteBtn">Delete</button>
    <router-link class="editBtn" :to="`/plant?id=${plant.id}`">Edit</router-link>
    <p>
      <b>Type:</b>  {{plant.type}}<br><b>Date:  </b>{{plant.date}}
    </p>
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

p{
  letter-spacing: 2px;
  margin-left: 15px;
}

.deleteBtn{
  float: right;
  margin-right: 15px;
  box-shadow:inset 0 1px 0 0 #cf866c;
  background: #d0451b linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  border-radius:3px;
  border:1px solid #942911;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-size:13px;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0 1px 0 #854629;
}

.editBtn{
  float: right;
  margin-right: 15px;
  box-shadow:inset 0 1px 0 0 #54a3f7;
  background: #007dc1 linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
  border-radius:3px;
  border:1px solid #124d77;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-size:13px;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0 1px 0 #154682;
}

.plant-container{
  background-color: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}

h2{
  background: #2c3e50;
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0 0 0 1px #5F5A4B, 1px 1px 6px 1px rgba(10, 10, 0, 0.5);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: bold;
  height: 24px;
  line-height: 20px;
  margin: 12px 0 !important;
  padding: 5px 0 5px 10px;
  text-shadow: 2px 2px 3px #2c3e50;
  text-align: center;
}

</style>