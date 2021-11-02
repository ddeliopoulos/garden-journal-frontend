<script lang="ts">
import WaterDroplet from "@/components/WaterDroplet.vue";
import router from "@/router";
import AddJournalButton from "@/components/AddJournalButton.vue"
import JournalEntryRow from "@/components/JournalEntryRow.vue";
import {getBackendUrl} from "@/components/shared/backendUrl";
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";


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


export default {
  name: 'PlantDetails',
  components: {JournalEntryRow, AddJournalButton, WaterDroplet},

  props: {
    journalEntry: {
      type: Object as () => JournalEntry,
      required: true
    }
  },

  setup(props : any) {
    const route = useRoute()
    const id = route.params.id


    const plantImageUrl = ref("");
    let src = ""

    const plant = ref<PlantType>({
      name: "",
      type: "",
      createdAt: "",
      id: ""
    })
    console.log("CREATED AT", plant.value.createdAt)
    const humanDate = ref();

    const journalEntries = ref<JournalEntry[]>([]);

    const journalEntry = ref<JournalEntry>({
      id: "",
      plantId: "",
      createdAt: "",
      type: "",
      mediaId: "",
      data: ""
    })


    const filterEntriesByType = async (type: string | null) => {
      const response = await fetch(`${getBackendUrl()}/plants/${id}/journal-entries${type ? `?type=${type}` : ''}`, {
        method: 'GET'
      })
      return await response.json();
    }
    const reloadEntriesByType = async (type: string | null) => journalEntries.value = await filterEntriesByType(type);

    const filterAudioEntries = async () => await reloadEntriesByType('audio');
    const filterImageEntries = async () => await reloadEntriesByType('image');
    const filterTextEntries = async () => await reloadEntriesByType('text');
    const loadJournalEntries = async () => await reloadEntriesByType(null);

    const getLatestImage = async () => {
      console.log("getting latest image")
      let img;

        const images = (await filterEntriesByType('image'));

      console.log("latest image value: ",images)
        if(images.length === 0){
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

    const getPlantInfo = async () => {
      const response = await fetch(`${getBackendUrl()}/plants/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      plant.value = await response.json()
      humanDate.value = new Date(plant.value.createdAt).toLocaleDateString()
    }

    const deletePlant = async () => {
      if (confirm('Are you sure, bitch?')) {
        await fetch(`${getBackendUrl()}/plants/${id}`, {
          method: 'DELETE'
        })
        await router.push('/');
      }
    }

    [getPlantInfo, loadJournalEntries, getLatestImage].forEach((fn: any) => onMounted(fn));

    return {
      humanDate,
      src,
      plantImageUrl,
      journalEntries,
      journalEntry,
      plant,
      deletePlant,
      filterTextEntries,
      loadJournalEntries,
      filterAudioEntries,
      filterImageEntries,
      getBackendUrl
    }
  }
}
</script>

<template>
  <section class="relative py-16 bg-gray-300">
    <div class="container mx-auto px-4">
      <div class="relative flex flex-col bg-white w-full shadow-xl rounded-lg -mt-64">
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
          <AddJournalButton @updateCustomAudio="updateCustomAudio" />
        </div>
        <div class="mt-10 py-10 border-t border-gray-300 text-center">
          <div class="timeline">

            Filter by:
            <button @click="filterTextEntries" class="filter-txt-btn"> Text</button>
            <button @click="filterAudioEntries" class="filter-audio-btn"> Audio</button>
            <button @click="filterImageEntries" class="filter-img-btn"> Image</button>
            <button @click="loadJournalEntries" class="filter-img-btn"> All</button>
            <br/><br/>

            <h3>JOURNAL ENTRIES</h3>
            <br/>
            <div class="single-plant-container" :key="journalEntry.id" v-for="journalEntry in journalEntries">
              <JournalEntryRow :journalEntry="journalEntry"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
html {
  background-color: #E2E8F0;
}

.plant-info {
  position: relative;
  bottom: 20px;
}

.container {
  position: relative;
  top: -31px;
}

.filter-txt-btn, .filter-audio-btn, .filter-img-btn {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 6px 22px;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
  border-radius: 8px;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  margin: 5px;
}

.move-left {
  width: 725px;
  height: 350px;
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
}

.move-date {
  position: relative;
  top: -26px;
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 27px;
  position: relative;
  top: 10px;
  left: 600px;
  cursor: pointer;
}

.fas {
  position: relative;
  top: -35px;
}

.image-cropper {
  width: 220px;
  height: 200px;
  position: relative;
  overflow: hidden;
  margin: auto;
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

.-mt-64 {
  position: relative;
  bottom: 30px;
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
  top: 10px;
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

</style>
