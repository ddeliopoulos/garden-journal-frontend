<template>
  <div class="container">
    <h1>Add a Plant!</h1>
    <label>Plant Name: </label>
      <input type="text"
             v-model="name"
             required>

    <label>Plant Type: </label>
      <input type="text"
             v-model="type">

    <label>Date Planted: </label>
      <input type="text"
             v-model="date">

    <button @click="onFormSubmit" class="button">Submit</button>
  </div>
</template>

<script>
//emit an event from the button component
export default {
  name: 'AddPlantForm',
  emits: ['plant-update'],

 data(){
    return {
      name: '',
      type: '',
      date: '',
    }
 },

  methods: {
    async onFormSubmit() {
      const response = await fetch('/api/plants', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: this.name,
          type: this.type,
          date: this.date,
        }),
      })

      const data = await response.json()

      console.log("")

      this.$emit('plant-update', data)

    }
  }
}
</script>


<style scoped>
.container {
  width: 25%;
  margin: 30px auto;
  background-color: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  float: left;
  border: 1px solid steelblue;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}


button {
  cursor: pointer;
  background: #0066A2;
  color: white;
  border-style: outset;
  border-color: #0066A2;
  height: 50px;
  width: 100px;
  font: bold 15px arial, sans-serif;
  text-shadow: none;
  margin-top: 25px;
  margin-left: 180px;
}

h2 {
  text-align: center;
  padding-top: -20px;
}
</style>