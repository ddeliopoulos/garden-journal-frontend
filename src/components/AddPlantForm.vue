<template>
  <div class="container">
    <h1>Add Plant</h1>
    <label>Plant Name: </label>
      <input type="text" placeholder="Name of plant"
             v-model="name"
             required>
    <br/>
    <label>Plant Type: </label>
      <input type="text" placeholder="Type of plant"
             v-model="type">
    <br/>
    <label>Date Planted: </label>
      <input type="date"
             v-model="date">
    <br/>
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

      this.$emit('plant-update', data)

      this.name = "";
      this.type = "";
      this.date = "";

    }
  }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');



.container {
  flex-direction: column;
  min-height: 20vh;  width: 50%;
  margin: 30px auto;
  background-color: white;
  border-radius: 10px;
  border: 1px solid steelblue;
}

label {

  padding: 5px;
  display: block;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  width: 25%;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size:16px;
  margin: 15px 15px 15px 55px;
}

button {
  margin: 35px auto;
  display: block;
  box-shadow:inset 0 1px 0 0 #54a3f7;
  background: #007dc1 linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
  border-radius:3px;
  border:1px solid #124d77;
  cursor:pointer;
  color:#ffffff;
  font-size:18px;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0 1px 0 #154682;

}

h1{
  text-align: center;
  margin: 10px auto;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>