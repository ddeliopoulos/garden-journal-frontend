<script lang="ts">

import {defineComponent, onMounted, ref} from "vue";
import {deleteJournalEntry, filterEntriesByType, getBackendUrl} from "@/components/shared/BackendApi";
import WaterButton from "/src/components/WaterButton.vue"
import Popup from "@/components/Popup.vue";

interface Plant {
  name: string
  type: string
  createdAt: string
  id: number
  frequency: string
}

interface textEntry {
  createdAt: string
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

    const textEntry = ref<textEntry>({
      createdAt: "",
      mediaId: ""
    });

    const journalId = ref<JournalEntries>({
      id: "",
    })

    const waterDropletColor = ref("gray");
    const updateWaterDropletColor = () => filterEntriesByType("water", props.plant.id).then(allWaterEntries => {
      console.log("ALL ENTRIES: ",allWaterEntries)

      if  (allWaterEntries.length === 0) return;

      const timeElapsed = Date.now() - parseInt(allWaterEntries[0].createdAt)
      if (timeElapsed < props.plant.frequency) waterDropletColor.value = "green"
      else if(timeElapsed < (props.plant.frequency + 43200000)) waterDropletColor.value = "yellow"
      else if(timeElapsed >= (props.plant.frequency + 43200000)) waterDropletColor.value = "red"
      else console.log("Can't determine, something up.")

      console.log("WATERCOLOR: ", waterDropletColor.value)


    });
    updateWaterDropletColor();

    const saveJournalId = async (event: any) => {
      journalId.value.id = event;
      await updateWaterDropletColor();

    }
    const buttonTrigger = ref(false);

    const togglePopup = async () => {
      if (!buttonTrigger.value) {
        setTimeout(() => {
          buttonTrigger.value = false
        }, 2500);
      }
      buttonTrigger.value = !buttonTrigger.value
    }

    const deleteWaterJournal = async () => {
      await deleteJournalEntry(journalId.value.id)
    }

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


    onMounted(getLatestImageOrDefault)

    return {
      saveJournalId,
      deleteWaterJournal,
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
      journalId,
      waterDropletColor
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
    <button @click="togglePopup();" id="water-btn">
      <WaterButton @journalId="saveJournalId" :waterDropletColor="waterDropletColor" :plant="plant"></WaterButton>
    </button>
    <Popup
        v-if="buttonTrigger"
        :togglePopup="() => togglePopup('buttonTrigger')">
      <h2>Journal posted.
        <button @click="deleteWaterJournal" class="undo-journal-watering">Undo</button>
      </h2>
      <i class="fas fa-times fa-lg" @click="togglePopup()"></i>
      <br/>
    </Popup>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

.fas {
  position: relative;
  top: -35px;
  right: -25px;
  cursor: pointer;
}

.undo-journal-watering {
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

.undo-journal-watering:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

.undo-journal-watering:disabled {
  background-color: #FAFBFC;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959DA5;
  cursor: default;
}

.undo-journal-watering:active {
  background-color: #EDEFF2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}

.undo-journal-watering:focus {
  outline: 1px transparent;
}

.undo-journal-watering:before {
  display: none;
}

.undo-journal-watering::-webkit-details-marker {
  display: none;
}

.type-date-display {
  padding: 10px 0 10px 0;
}

.type-date{
  position: relative;
  top: -10px
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
  height: 210px;
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
  height: 270px;
}

h4 {
  display: inline;
  color: black;
}

</style>