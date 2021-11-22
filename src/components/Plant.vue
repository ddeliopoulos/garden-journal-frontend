<script lang="ts">

import {defineComponent, onMounted, ref} from "vue";
import {filterEntriesByType, getBackendUrl, uploadJournalEntry, uploadMedia} from "@/components/shared/BackendApi";
import WaterButton from "/src/components/WaterButton.vue"
import Popup from "@/components/Popup.vue";

interface Plant {
  id: number
  createdAt: string
}

interface textEntry {
  createdAt: string
  data: string
  type: string
  mediaId: string;
}
interface JournalEntries {
  id: string
}

export default defineComponent({
  components: {WaterButton, Popup},
  props: {
    plant: {
      type: Object as () => Plant,
      required: true
    },
    searchText: String
  },

  setup(props: any) {

    let plantId = props.plant.id
    const humanDate = ref(new Date(props.plant.createdAt).toLocaleDateString())
    const latestImg = ref("")
    const plantImageUrl = ref("");
    const searchPlantsUsingBar = ref(props.searchText)

    console.log(props.plant.id)

    const textEntry = ref<textEntry>({
      createdAt: "",
      data: "You've watered your plant!",
      type: "text/plain",
      mediaId: ""
    });
    const journalId = ref<JournalEntries>({
      id: "",
    })


    const buttonTrigger = ref (false);

    const togglePopup = async () => {
      console.log("IM IN THE PARENT PROP METHOD")
      buttonTrigger.value = !buttonTrigger.value
    };


    // const postTextJournal = async () => {
    //   console.log("Attempting to post a Text Journal")
    //   const dataUploadResponse = await uploadMedia(textEntry.value.type, textEntry.value.data)
    //   textEntry.value.mediaId = await (dataUploadResponse.text());
    //   await uploadJournalEntry(plantId, journalId.value.id, textEntry.value.type, textEntry.value.mediaId )
    //   window.location.reload()
    //   console.log("Text Successfully Posted!")
    // };

    const getLatestImageOrDefault = async () => {
      console.log("getting latest image or default")
      let img, src;
      const images = (await filterEntriesByType('image', plantId));

      if (images.length === 0) {
        src = "/default-plant-img.jpg"
      } else {
        textEntry.value.mediaId = images[0].mediaId
        src = getBackendUrl() + '/media/' + textEntry.value.mediaId
      }
      plantImageUrl.value = src;
    }
    //
    // const getLatestImage = async () => {
    //   const response = await fetch(`${getBackendUrl()}/journal-entries?plantId=${plantId}&_sort=createdAt&_order=desc&type=image`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-type': 'application/json',
    //       'X-Auth-Token': gapi.getAuthToken()
    //     },
    //   })
    //   journalEntry.value = await response.json();
    //
    //   latestImg.value = journalEntry.value[0].dataUrl
    //
    // }

    onMounted(getLatestImageOrDefault)

    return {

      //postTextJournal,
      Popup,
      buttonTrigger,
      togglePopup,
      searchPlantsUsingBar,
      plantImageUrl,
      getLatestImageOrDefault,
      getBackendUrl,
      humanDate,
      plantId,
      latestImg,
      textEntry,
      journalId}
  }
})
</script>

<template>
  <div class="garden">
    <div class="plant-card">
      <router-link :to="{name: 'PlantDetails', params: {id: plant.id}}" style="text-decoration: none; color: inherit;">
        <h2><b></b> {{ plant.name }}</h2>
        <div class="image-cropper">
          <img :src="plantImageUrl" alt="default-plant-image" class="default-plant">
        </div>
        <div class="type-date-display">
          <p class="type-date">
            <b>
              {{ plant.type }}
              <br/>
              {{ humanDate }}
            </b>
          </p>
        </div>
      </router-link>
    </div>
    <button @click="togglePopup();" id="water-btn" >
      <WaterButton :plant="plant"></WaterButton>
    </button>
    <Popup
        v-if="buttonTrigger"
        :togglePopup="() => togglePopup('buttonTrigger')" >
      <h2>Journal posted. <button>Undo</button> </h2>
      <br/>
      <button class="post-watering-btn">POST</button>
    </Popup>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');


.post-watering-btn {
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
  top: 15px;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}

.post-watering-btn:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.post-watering-btn:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.post-watering-btn:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.post-watering-btn:focus {
  outline: 1px transparent;
}

.post-watering-btn:before {
  display: none;
}

.post-watering-btn::-webkit-details-marker {
  display: none;
}

.type-date-display {
  padding: 10px 0 10px 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#water-btn {
  position: relative;
  top: 6px;
}

h2 {
  padding: 10px 0 10px 0;
  position: relative;
  top: 1px;
}

.plant-card {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

p {
  position: relative;
  top: 5px;
  text-overflow: ellipsis
}

p, h2 {
  letter-spacing: 1px;
  color: #06466e;
  display: inline;
  font-family: 'Josefin Sans', sans-serif;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bolder;
  position: relative;
}

.image-cropper {
  width: 150px;
  height: 140px;
  position: relative;
  overflow: hidden;
  margin: auto;
}

.default-plant {
  display: inline-block;
  height: 100%;
  width: auto;
  position: relative;
}

.plant-card:hover {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

.garden {
  position: relative;
  bottom: 6em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  width: 190px;
  height: 280px;
}

h4 {
  display: inline;
  color: black;
}

</style>