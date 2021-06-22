<template>
  <form>
    <h2>Add a Plant!</h2>
    <label>Plant Name: </label>
    <input type="plantName" required v-model="name">
    <label>Plant Type: </label>
    <input type="plantType" v-model="type">
    <label>Date Planted: </label>
    <input type="date" v-model="myDate">
    <button @click="onFormSubmit" type="button">Submit</button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      name: '',
      type: ''
    }
  },
  methods: {
    onFormSubmit(event) {
      // `this` inside methods points to the current active instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        console.log(event.target.tagName)
      }
    }
  }
};
</script>


<style>
form {
  width: 25%;
  margin: 30px auto;
  backgroud: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  float: left;
  border: 1px solid #FFFFFF;
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

.submit {
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
}

h2 {
  text-align: center;
  padding-top: -20px;
}
</style>