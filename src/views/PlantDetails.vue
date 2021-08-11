<template>
  <section v-if="!isLoading" class="relative py-16 bg-gray-300">
    <div class="container mx-auto px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div class="relative">
              </div>
            </div>
            <div class="delete-plant-icon" @click=deletePlant()>
              <i class="far fa-window-close"></i>
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-1">
            </div>
          </div>
          <div class="text-center mt-12">
            <div class="image-cropper">
              <img src="../assets/default-plant.jpg" alt="default-plant-image" class="default-plant">
            </div>
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              {{ plant.name }}
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
              <i class="fa fa-leaf mr-2 text-lg text-gray-500"></i>
              {{ plant.type }}
            </div>
            <div class="fas fa-map-marker-alt mb-2 text-gray-700 mt-10">
              <i class=" mr-2 text-lg text-gray-500"></i>
              United States, PA
            </div>
            <div class="mb-2 text-gray-700">
              <i class="fa fa-calendar mr-2 text-lg text-gray-500"></i>
              {{ plant.date }}
            </div>
          </div>
          <div class="mt-10 py-10 border-t border-gray-300 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <h2>Journal Entry</h2><br/>
                <div>
                  <div class="form-group shadow-textarea">
                    <textarea name="styled-textarea" id="styled"  rows="3" placeholder="Write something here..."></textarea>
                  </div>
                  <button type="button" @click="onFormSubmit()" class="btn btn-light btn-lg btn-rounded float-end">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WaterDroplet from "@/components/WaterDroplet.vue";


export default {
  name: 'PlantDetails',

  props: {
    id: String,
  },

  components: {
    WaterDroplet,
  },

  data() {
    return {
      isLoading: true,
      plant: null
    }
  },

  methods: {
    async onFormSubmit() {
      const response = await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          entry: this.entry,

        }),
      })

      const data = await response.json()


      this.entry = "";

      window.location.reload();

    },
    async deletePlant() {
      if (confirm('Are you sure, bitch?')) {
        const response = await fetch(`/api/plants/${this.id}`, {
          method: 'DELETE'
        })
        console.log("im here")
        await this.$router.push('/');
        window.location.reload();
      }
    },

    async getPlantInfo() {
      console.log(this.id);
      const response = await fetch(`/api/plants/${this.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      this.plant = await response.json()
    },

  },

  async created() {
    await this.getPlantInfo()
    this.isLoading = false;
  }
}
</script>

<style scoped>

.fa-window-close{
  color: red;
  font-size: 27px;
  position: relative;
  top: 10px;
  left: 600px;
  cursor: pointer;
}

h2{
  float: left;
}

textarea#styled {
  width: 600px;
  height: 120px;
  border: 3px solid #cccccc;
  padding: 5px;
  font-family: Tahoma, sans-serif;
  background-position: bottom right;
  background-repeat: no-repeat;
}

.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: auto;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%
}

body {
  margin: 0
}

main {
  display: block
}

h1 {
  font-size: 2em;
  margin: 0.67em 0
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
  border-style: none
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

.border-gray-300 {
  border-color: #e2e8f0
}

.rounded-lg {
  border-radius: 0.5rem
}

.border-t {
  border-top-width: 1px
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

.flex-wrap {
  flex-wrap: wrap
}

.justify-center {
  -webkit-box-pack: center;
  justify-content: center
}

.font-semibold {
  font-weight: 600
}

.font-bold {
  font-weight: 700
}

.leading-normal {
  line-height: 1.5
}

.mx-auto {
  margin-left: auto;
  margin-right: auto
}

.mt-0 {
  margin-top: 0
}

.mr-2 {
  margin-right: 0.5rem
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
  margin-top: -16rem
}

.min-w-0 {
  min-width: 0
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem
}

.py-10 {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem
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


.text-gray-500 {
  color: #a0aec0
}

.text-gray-600 {
  color: #718096
}

.text-gray-700 {
  color: #4a5568
}

.text-gray-800 {
  color: #2d3748
}

.text-sm {
  font-size: 0.875rem
}

.text-lg {
  font-size: 1.125rem
}

.text-4xl {
  font-size: 2.25rem
}

.uppercase {
  text-transform: uppercase
}

.break-words {
  overflow-wrap: break-word
}

.w-full {
  width: 100%
}

</style>
