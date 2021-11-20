<script lang="ts">

import {defineComponent, onMounted, ref} from "vue";
import {filterEntriesByType, getBackendUrl, uploadJournalEntry, uploadMedia} from "@/components/shared/BackendApi";
import WaterButton from "/src/components/WaterButton.vue"
import Popup from "@/components/Popup.vue";

interface Plant {
  id: number
  createdAt: string
}

interface JournalEntry {
  journalId: string
  mediaId: string
  type: string
  data: string
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

    const journalEntry = ref<JournalEntry>({
      journalId: "",
      mediaId: "",
      type: "",
      data: ""
    })

    const popupTriggers = ref ({
      buttonTrigger: false,
    });

    const togglePopup = async () => {
      console.log("Attempting to post a Text Journal")
      const dataUploadResponse = await uploadMedia(journalEntry.value.type, journalEntry.value.data)
      journalEntry.value.mediaId = await (dataUploadResponse.text());
      await uploadJournalEntry(plantId, journalEntry.value.journalId, journalEntry.value.type, journalEntry.value.mediaId)
      popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger
    }

    const getLatestImageOrDefault = async () => {
      console.log("getting latest image or default")
      let img, src;
      const images = (await filterEntriesByType('image', plantId));

      if (images.length === 0) {
        src = "/default-plant-img.jpg"
      } else {
        journalEntry.value.mediaId = images[0].mediaId
        src = getBackendUrl() + '/media/' + journalEntry.value.mediaId
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
      Popup,
      popupTriggers,
      togglePopup,
      searchPlantsUsingBar,
      plantImageUrl,
      getLatestImageOrDefault,
      getBackendUrl,
      humanDate,
      plantId,
      latestImg,
      journalEntry
    }
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
    <button @click="() => togglePopup('buttonTrigger')" id="water-btn" >
      <WaterButton></WaterButton>
    </button>
    <Popup
        v-if="popupTriggers.buttonTrigger"
        :togglePopup="() => togglePopup('buttonTrigger')">
      <h2>Journal entry posted for watering plant!</h2>
    </Popup>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

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