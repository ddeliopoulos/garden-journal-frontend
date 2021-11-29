<script lang="ts">
import AddJournalButton from "@/components/AddJournalButton.vue"
import JournalEntryRow from "@/components/JournalEntryRow.vue";
import {deletePlantById, filterEntriesByType, getBackendUrl, getPlantById} from "@/components/shared/BackendApi";
import {useRoute} from 'vue-router'
import {defineComponent, onMounted, ref} from "vue";
import Popup from "@/components/Popup.vue";
import {isLoggedIn} from "@/components/wrapped/gapi";

interface JournalEntry {
  id: string
  plantId: string
  createdAt: string
  type: string
  mediaId: string
  data: string
}

interface PlantType {
  name: string
  type: string
  createdAt: string
  id: string
}

export default defineComponent({
  name: 'PlantDetails',
  components: {JournalEntryRow, AddJournalButton, Popup},

  setup() {
    const route = useRoute()
    const id = route.params.id
    let src = ""

    const plantImageUrl = ref("")
    const humanDate = ref();
    const journalEntries = ref<JournalEntry[]>([])

    const journalEntry = ref<JournalEntry>({
      id: "",
      plantId: "",
      createdAt: "",
      type: "",
      mediaId: "",
      data: ""
    })

    const plant = ref<PlantType>({
      name: "",
      type: "",
      createdAt: "",
      id: ""
    })

    console.log("CREATED AT", plant.value.createdAt)

    const reloadEntriesByType = async (type: string | null) => journalEntries.value = await filterEntriesByType(type, id);


    const filterAudioEntries = async () => await reloadEntriesByType('audio');
    const filterImageEntries = async () => await reloadEntriesByType('image');
    const filterWaterEntries = async () => await reloadEntriesByType('watering');
    const filterTextEntries = async () => await reloadEntriesByType('text');
    const loadJournalEntries = async () => await reloadEntriesByType(null);

    const getLatestImage = async () => {
      console.log("getting latest image")
      let img;

      const images = (await filterEntriesByType('image', id));

      console.log("latest image value: ", images)
      if (images.length === 0) {
        src = "/default-plant-img.jpg"
        console.log(src)
      } else {

        journalEntry.value.mediaId = images[0].mediaId
        src = getBackendUrl() + '/media/' + journalEntry.value.mediaId
      }
      plantImageUrl.value = src;
    }

    // const updateCustomAudio = async (event: any) => {
    //   props.journalEntry.data = event;
    //   console.log(props.journalEntry.data)
    // }
    const buttonTrigger = ref(false);

    const togglePopup = async () => {
      if (!buttonTrigger.value) {
        setTimeout(() => {
          buttonTrigger.value = false;
        }, 2500);
      }
      buttonTrigger.value = !buttonTrigger.value
    }
    const goBack = () => {
      window.history.back();
    }

    const getPlantInfo = async () => {
      const response = await getPlantById(id);
      plant.value = await response.json()
      humanDate.value = new Date(plant.value.createdAt).toLocaleDateString()
    }

    const deletePlant = async () => {
      await deletePlantById(id)
    }

    [getPlantInfo, loadJournalEntries, getLatestImage].forEach((fn: any) => onMounted(fn));

    return {
      buttonTrigger,
      togglePopup,
      humanDate,
      src,
      plantImageUrl,
      journalEntries,
      journalEntry,
      plant,
      filterWaterEntries,
      goBack,
      deletePlant,
      filterTextEntries,
      loadJournalEntries,
      filterAudioEntries,
      filterImageEntries,
      getBackendUrl
    }
  }
})
</script>

<template>
  <section class="relative py-16 bg-gray-300">
    <div class="container mx-auto px-4">
      <div class="move-down">
        <div class="relative flex flex-col bg-white w-full shadow-xl rounded-lg -mt-64">
          <div class="px-6">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div class="relative">
                </div>
              </div>


              <Popup
                  v-if="buttonTrigger"
                  :togglePopup="() => togglePopup('buttonTrigger')">
                <h2><br/>Delete plant?
                  <button @click="deletePlant" class="delete-plant-btn">DELETE</button>
                </h2>
                <div class="pos-x">
                  <i class="fas fa-times fa-lg" @click="togglePopup()"></i>
                  <br/>
                </div>
              </Popup>


              <div class="delete-plant-icon" @click="togglePopup()">
                <i class="far fa-trash-alt fa-lg"></i>
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              </div>
              <div class="w-full lg:w-4/12 px-4 lg:order-1">
              </div>
              <button class="go-back-btn" role="button" @click="goBack()">Go Back</button>
            </div>
            <div class="add-journal-button">
            </div>
            <div class="text-center mt-12">
              <div class="move-left">
                <div class="image-cropper">
                  <img :src="plantImageUrl" alt="latest-img" class="img">
                </div>
                <h3 class="text-4xl font-semisolid leading-normal mb-2 text-gray-800 mb-2">
                  {{ plant.name }}
                </h3>
                <div class="plant-info">
                  <div class="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i class="fa fa-leaf mr-2 text-lg text-gray-500"></i>
                    {{ plant.type }}
                  </div>
                  <div class="fas fa-map-marker-alt mb-2 text-gray-700 mt-10">
                    <i class=" mr-2 text-lg text-gray-500"></i>
                    PA, United States
                  </div>
                  <div class="move-date">
                    <div class="mb-2 text-gray-700">
                      <i class="fa fa-calendar mr-2 text-lg text-gray-500"></i>
                      <b>{{ humanDate }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-9/12 px-4">
            <AddJournalButton/>
          </div>
          <div class="mt-10 py-10 border-t border-gray-300 text-center">
            <h2>JOURNAL ENTRIES</h2>
            <div class="timeline">
              <button class="filter-img-btn" @click="loadJournalEntries"> All</button>
              <button class="filter-txt-btn" @click="filterTextEntries"> Text</button>
              <button class="filter-audio-btn" @click="filterAudioEntries"> Audio</button>
              <button class="filter-img-btn" @click="filterImageEntries"> Image</button>
              <button class="filter-water-btn" @click="filterWaterEntries"> Watered</button>
              <br/><br/>
              <br/>
              <div v-for="journalEntry in journalEntries" :key="journalEntry.id" class="single-plant-container">
                <JournalEntryRow :journalEntry="journalEntry"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

.move-down {
  position: relative;
  top: 20px;
}

html {
  background-color: #E2E8F0;
}

.go-back-btn {
  appearance: none;
  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.go-back-btn:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.go-back-btn:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.go-back-btn:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.go-back-btn:focus {
  outline: 1px transparent;
}

.go-back-btn:before {
  display: none;
}

.go-back-btn::-webkit-details-marker {
  display: none;
}

.pos-x {
  position: relative;
  top: -50px;
  right: -225px;

}

.delete-plant-btn {
  appearance: none;
  background-color: #FAFBFC;
  border: 3px solid red;
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: red;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.delete-plant-btn:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.delete-plant-btn:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.delete-plant-btn:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.delete-plant-btn:focus {
  outline: 1px transparent;
}

.delete-plant-btn:before {
  display: none;
}

.delete-plant-btn::-webkit-details-marker {
  display: none;
}

.plant-info {
  position: relative;
  bottom: 20px;
}

.delete-plant-icon {
  cursor: pointer;
  position: relative;
  top: 15px;
  left: 600px;
}

.container {
  position: relative;
  top: 20px;
}

.filter-txt-btn, .filter-audio-btn, .filter-img-btn, .filter-water-btn {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 6px 22px;
  background-color: #181A18;
  border-radius: 8px;
  color: #FFF;
  font-size: 13px;
  font-weight: 700;
  position: relative;
  margin: 5px;
}

.move-left {
  position: relative;
  left: 20px;
  width: 725px;
  height: 350px;
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
}

.move-date {
  position: relative;
  top: -26px;
}

.fas {
  position: relative;
  top: -35px;
  right: -25px;
  cursor: pointer;
}

.image-cropper {
  width: 220px;
  height: 200px;
  position: relative;
  overflow: hidden;
  margin: auto;
  top: 5px;
  border-radius: 20px;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%
}

body {
  margin: 0
}

img {
  border-style: none;
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

.mt-10 {
  margin-top: 2.5rem
}

.mt-12 {
  margin-top: 3rem
}


.px-4 {
  padding-left: 1rem;
  padding-right: 1rem
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
  position: relative;
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


.text-gray-700 {
  color: #4a5568
}

.text-gray-800 {
  color: #2d3748
}

.text-sm {
  font-size: 0.875rem;
  position: relative;
  top: 7px;
  right: 5px;
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

.w-full {
  width: 100%
}

h2 {
  font-family: 'Josefin Sans', sans-serif;
  position: relative;
  bottom: 10px;
  color: #181A18;
}

</style>
