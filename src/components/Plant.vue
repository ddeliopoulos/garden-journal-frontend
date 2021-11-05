<script lang="ts">

import {onMounted, ref} from "vue";
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
   const plantImageUrl = ref("");

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

   const getLatestImageOrDefault = async () => {
     console.log("getting latest image or default")
     let img, src;
     const images = (await filterEntriesByType('image'));

     if(images.length === 0){
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

    return{
      plantImageUrl,
      getLatestImageOrDefault,
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
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

.type-date-display{
  padding: 10px 0 10px 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h2{
  padding: 10px 0 10px 0;
  position: relative;
  top: 1px;
}
p{
  position: relative;
  top:5px;
}
p, h2 {
  letter-spacing: 1px;
  color: #06466e;
  display: inline;
  font-family: 'Josefin Sans', sans-serif;
  overflow: hidden;
  white-space:nowrap;
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
}

h4 {
  display: inline;
  color: black;
}

</style>