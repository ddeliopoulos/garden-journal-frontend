<template>
<div class="container">
  <h1>Plant List</h1>
  {{name}} , {{type}}, {{date}}
</div>
</template>

<script>

export default {
  name: "PlantListDisplay",
  props: {
    name: String,
    type: String,
    date: String,
  },


  data(){
    return {
      name: this.name,
      type: this.type,
      date: this.date,
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

.container {
  background-color: white;
  width: 25%;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  float: right;
  border: 1px solid steelblue;
}

</style>