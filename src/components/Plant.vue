<script lang="ts">

import {onMounted, ref} from "vue";
import gapi from '@/components/shared/gapi.ts';
import {getBackendUrl} from "@/components/shared/backendUrl";

interface Plant {
  id: number
  createdAt: string
}

interface JournalEntry {
  journalId: string
  mediaId: string
}

export default {
  props: {
    plant: {
      type: Object as () => Plant,
      required: true
    }
  },

 setup(props : any){

   let plantId = props.plant.id
   const humanDate = ref(new Date(props.plant.createdAt).toLocaleDateString())
   const latestImg = ref("")

   const journalEntry = ref<JournalEntry>({
     journalId: "",
     mediaId: ""
   })
   const filterEntriesByType = async (type: string | null) => {
     const response = await fetch(`${getBackendUrl()}/plants/${plantId}/journal-entries${type ? `?type=${type}` : ''}`, {
       method: 'GET'
     })
     return await response.json();
   }

   const getLatestImage = async () => {
     console.log("getting latest image")
     latestImg.value = (await filterEntriesByType('image'))

     let img = JSON.parse(JSON.stringify(latestImg.value[0]))

     journalEntry.value.mediaId = img.mediaId
     return img.mediaId;

     //console.log(journalEntry.value.mediaId)
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

   onMounted(getLatestImage)

    return{
     getLatestImage,
      getBackendUrl,
      humanDate,
      plantId,
      latestImg,
      journalEntry
    }
 }
}

</script>

<template>
  <div class="garden">
    <div class="plant-card">
      <router-link style="text-decoration: none; color: inherit;" :to="{name: 'PlantDetails', params: {id: plant.id}}">
        <h2><b></b> {{ plant.name }}</h2>
        <div class="image-cropper">
          <img :src="getBackendUrl() + '/media/' + journalEntry.mediaId" alt="default-plant-image" class="default-plant">
        </div>
        <br/>
        <b>
          <h4>Type: </h4>
          <p>{{ plant.type }}</p>
          <br/>
          <h4>Date: </h4>
          <p>{{ humanDate }}</p>
          <br/>
        </b>
      </router-link>
    </div>
  </div>

</template>

<style scoped>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

p {
  letter-spacing: 1px;
  color: #06466e;
  display: inline;
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
  right: 18px;
}

.plant-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.plant-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  width: 190px;
}

h2 {
  display: inline-block;
  color: #06466e;
  font-size: 23px;
  font-weight: bold;
  width: 70%;
  height: 30px;
  line-height: 25px;
  margin: auto;
  text-align: center;

}

h4 {
  display: inline;
  color: black;
}

</style>