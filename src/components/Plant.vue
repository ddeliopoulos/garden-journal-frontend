<template>
  <div class="garden">
      <div class="plant-card" >
        <router-link style="text-decoration: none; color: inherit;" :to="{name: 'PlantDetails', params: {id: plant.id}}">
        <h2><b></b> {{ plant.name }}</h2>
      <div class="image-cropper">
        <img src="../assets/default-plant.jpg" alt="default-plant-image" class="default-plant">
      </div>
          <br/>
      <b><h4>Type: </h4>
          <p>{{plant.type}}</p>
          <br/>
      <h4>Date: </h4>
          <p>{{plant.date}}</p>
          <br/></b>
        </router-link>
  </div>
  </div>
</template>
<script>


export default {
  name: 'Plant',

  props: {
    plant: Object,
  },

  methods:{
    directToDetailPlantPage(id){
      console.log(id)
      this.$router.push({name: 'PlantDetails'})
    }
  },
}

</script>

<style scoped>

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

p{
  letter-spacing: 1px;
  color: #06466e;
  display: inline;
}
.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}

.default-plant {
  display: inline-block;
  margin: auto;
  height: 100%;
  width: auto;
}

.plant-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.plant-card{
  background-color: antiquewhite;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  margin: auto;
  width: 190px;
  border:1px solid black;
}

h2{
  display: inline-block;
  color: floralwhite;
  font-size: 23px;
  font-weight: bold;
  width: 70%;
  height: 30px;
  line-height: 25px;
  margin: auto;
  text-shadow: 2px 2px 3px #2c3e50;
  text-align: center;

}

h4{
  display: inline;
  color: black;
}

</style>