<script lang="ts">
import Plant from '@/components/Plant.vue'
import AddPlantButton from "@/components/AddPlantButton.vue"
import {ref, onMounted} from 'vue'
import {getBackendUrl} from "@/components/shared/backendUrl";

interface PlantType {
  name: string
  type: string
  date: string
  thirstLevel: string
  id: number
}
interface JournalEntry {
  dataUrl: string
}

export default {
  name: "PlantListDisplay",
  components: {Plant, AddPlantButton},

  setup() {
    const plants = ref<PlantType[]>([]);
    const journalEntry = ref<JournalEntry[]>([])
    let plantId = ref("")

    const loadPlants = async () => {
      const response = await fetch(`${getBackendUrl()}/plants`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      plants.value = await response.json();

      plantId.value = plants.value[0].id.toString()

    }
    const bla = () => console.log('bla');


    onMounted(loadPlants)

    return {
      plants
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
          <div id="add-plant-button">
            <AddPlantButton></AddPlantButton>
          </div>
          <div class="plant-list">
            <div class="plant-garden">
              <div class="single-plant-container" :key="plant.id" v-for="plant in plants">
                <Plant :plant="plant"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Catamaran:wght@500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
}

.move-down{
  position: relative;
  top: 65px;
}

h1{
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

code {
  font-family: monospace, monospace;
  font-size: 1em
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

html {
  box-sizing: border-box;
  font-family: sans-serif
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

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5
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

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit
}

a {
  color: inherit;
  text-decoration: inherit
}

code {
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
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

.flex {
  display: -webkit-box;
  display: flex
}

.group:hover .group-hover\:block {
  display: block
}

.flex-col {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column
}

.mx-auto {
  margin-left: auto;
  margin-right: auto
}


.mb-2 {
  margin-bottom: 0.5rem
}

.mb-6 {
  margin-bottom: 1.5rem
}

.mt-10 {
  margin-top: 2.5rem
}

.mt-12 {
  margin-top: 3rem
}

.-mt-64 {
  margin-top: -10rem;
  position: relative;
  bottom: 50px;
}

.min-w-0 {
  min-width: 0;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem
}

.relative {
  position: relative
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
}

.text-center {
  text-align: center
}

.text-gray-700 {
  color: #4a5568
}

.break-words {
  overflow-wrap: break-word
}

.w-full {
  width: 100%
}
.single-plant-container{
  margin: auto;
  display: inline-block;
  padding: 5px;
}

.plant-list{
  display: inline-block;
  width: 100%;
}

#plants-title h1{
  width:500px;
  margin: 0 auto;
  text-align: center;
  font-family: Catamaran, serif;
  text-decoration: underline;
}
</style>