<script lang="ts">
import Plant from '@/components/Plant.vue'
import AddPlantButton from "@/components/AddPlantButton.vue"
import {ref} from 'vue'
import {loadAllPlants} from "@/components/shared/BackendApi";
import SearchBar from "@/components/SearchBar.vue"
import {getAuthToken, getBasicProfile, isLoggedIn} from "@/components/wrapped/gapi";

interface PlantType {
  name: string
  type: string
  createdAt: string
  id: number
}

interface JournalEntry {
  dataUrl: string
}

export default {
  name: "PlantListDisplay",
  components: {Plant, AddPlantButton, SearchBar},

  setup() {
    const plants = ref<PlantType[]>([]);
    const searchBarVal = ref("");
    const searchFilteredList = ref<PlantType[]>([]);
    const showFilteredList = ref(false);

    console.log(searchBarVal.value)

    const loadPlants = async () => {
      showFilteredList.value = false;
      const response = await loadAllPlants()
      plants.value = await response.json();
    }

    function searchValue(value: any) {
      searchBarVal.value = value;
      console.log("USING THIS VALUE TO FILTER :  ", searchBarVal.value)
      showFilteredList.value = true;
      searchFilteredList.value = plants.value.filter(plant => {
        return plant.name.toLowerCase().includes(searchBarVal.value.toLowerCase())
      })
    }

    function filteredList() {
      console.log("IAM FILTERING INCLUDING THIS VALUE : ", searchBarVal.value)
      return plants.value.filter(plant => {
        return plant.name.toLowerCase().includes(searchBarVal.value.toLowerCase())
      })
    }

    //const token = async ()=> await getAuthToken()

    getBasicProfile().then(console.log)

    loadPlants()
    return {
      searchFilteredList,
      showFilteredList,
      loadPlants,
      searchValue,
      searchBarVal,
      plants,
      filteredList
    }
  }
}
</script>

<template>
  <div class="relative py-16 bg-gray-300">
    <div class="container mx-auto px-4">
      <div class="move-down">
        <div class="relative flex flex-col bg-white w-full shadow-xl rounded-lg -mt-64">
          <div class="text-center mt-12">
            <SearchBar @emitSearchText="searchValue"></SearchBar>
            <div id="add-plant-button">
              <AddPlantButton></AddPlantButton>
            </div>
            <div v-for="plant in searchFilteredList" v-if="showFilteredList" :key="plant.id" class="single-plant-container">
              <Plant :plant="plant"/>
            </div>
            <div v-for="plant in plants" v-else :key="plant.id" class="single-plant-container">
              <Plant :plant="plant"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');


* {
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
}


h1 {
  padding: 30px;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible
}

a {
  background-color: transparent
}

b,
strong {
  font-weight: bolder
}

small {
  font-size: 80%
}

img {
  border-style: none;
}

button,
input,
button,
input {
  overflow: visible
}

button {
  text-transform: none
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText
}

legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal
}

progress {
  vertical-align: baseline
}

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box;
  padding: 0
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px
}

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit
}

details {
  display: block
}

template {
  display: none
}

[hidden] {
  display: none
}

*,
*::before,
*::after {
  box-sizing: inherit
}

blockquote,
dl,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p {
  margin: 0
}

button {
  background: transparent;
  padding: 0
}

button:focus {
  outline: 5px auto -webkit-focus-ring-color

}

ul {
  list-style: none;
  margin: 0;
  padding: 0
}

*,
*::before,
*::after {
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0
}

hr {
  border-top-width: 1px
}

img {
  border-style: solid
}

button,
[role="button"] {
  cursor: pointer
}

table {
  border-collapse: collapse
}


img,
svg,
canvas,
iframe {
  display: block;
}

img {
  max-width: 100%;
  height: auto
}

.container {
  width: 100%
}

@media (min-width: 640px) {
  .container {
    max-width: 640px
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px
  }
}

@media not print {
  .form-checkbox::-ms-check {
    border-width: 1px;
    color: transparent;
    background: inherit;
    border-color: inherit;
    border-radius: inherit
  }
}

.bg-white {
  background-color: #fff
}

.bg-gray-300 {
  background-color: #e2e8f0
}

.rounded-lg {
  border-radius: 0.5rem
}

.mx-auto {
  margin-left: auto;
  margin-right: auto
}

.mt-12 {
  margin-top: 3rem
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
  position: relative;
  top: 20px;
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
}

.text-center {
  text-align: center
}

.w-full {
  width: 100%
}

.single-plant-container {
  margin: auto;
  display: inline-block;
  padding: 0 10px 10px 10px;
}

#plants-title h1 {
  width: 500px;
  margin: 0 auto;
  text-align: center;
  font-family: Catamaran, serif;
  text-decoration: underline;
}

</style>