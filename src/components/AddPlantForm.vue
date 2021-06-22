<template>
  <form>
    <h2>Add a Plant!</h2>
    <label>Plant Name: </label>
    <input :value="plantNameField" @input="updateText" required v-model="name"/>
    <label>Plant Type: </label>
    <input :value="plantTypeField" @input="updateText" v-model="type">
    <label>Date Planted: </label>
    <input :value="plantDateField" @input="updateText" v-model="date">
    <button @click="onFormSubmit" class="button">Submit</button>
  </form>

  <div id="listOfPlants"></div>
</template>

<script>
import {sendRequest} from "./request.ts";
const plantNameField = document.getElementById("plantNameField");
const plantTypeField = document.getElementById("plantTypeField");
const plantDateField = document.getElementById("plantDateField");
const listOfPlants = document.getElementById('listOfPlants');



export default {
  data() {

    return {
      name: '',
      type: '',
      date: ''
    }
  },
  methods: {
    createListOfPlants: function (callback) {
      sendRequest({
        method: 'GET',
        url: '/plants',
        data: null
      }).then(response => {
        if (response.status !== 200) {
          throw new Error(`status is ${this.status}`);
        }

        const listOfPlantsFromResponse = response.data;
        listOfPlants.innerHTML = '';

        for (let i = 0; i < listOfPlantsFromResponse.length; ++i) {
          const newDiv = document.createElement('div');
          newDiv.className = 'plant-box';
          listOfPlants.appendChild(newDiv);
          newDiv.innerText = `Plant Name: ${listOfPlantsFromResponse[i].nameOfPlant},
                \nDate Planted: ${listOfPlantsFromResponse[i].heightInInches}`;

        }
      });
    }



    onFormSubmit: function (event) {
      // `this` inside methods points to the current active instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        const plant = {

        };

        sendRequest({
          method: 'POST',
          url: '/plants/' + plantIdTextField.value;
          data: plant
        }).then(response => {
          if (response.status !== 200) {
            throw new Error(`status is ${this.status}`);
          }

          const plantId = response.data;

          console.log('created a plant', plantId, plant);

          // clear the input fields

          createListOfPlants();
        });
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