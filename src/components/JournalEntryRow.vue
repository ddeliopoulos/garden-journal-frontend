<script lang="ts">
import {ref, onMounted} from "vue";

interface JournalEntry {
  id: string
  plantId: string
  createdAt: string
  type: string
  data: string,
  dataUrl: string
}

export default {
  props: {
    journalEntry: {
      type: Object as () => JournalEntry,
      required: true
    }
  },

  setup() {
    const humanDate = ref<any>({
      date: ""
    })

    const setTimeStamp = async ()  => {
      const date = new Date()
      date.setTime(Date.now())
      humanDate.value.date = date.toLocaleString();
    }
    setTimeStamp()

    return {setTimeStamp, humanDate}
  }
}
</script>

<template>
<div class="garden-journals-container">
  <div class="image-cropper">
    <div v-if="journalEntry.type.startsWith('image')">
      <img alt="test" :src="journalEntry.dataUrl"/>
    </div>
    <div v-else-if="journalEntry.type.startsWith('audio')">

    </div>
    <div v-else>No supporto for this typo! {{journalEntry.type}}</div>
  </div>
  <div class="garden-journal-row">
    <br/> <b>{{humanDate.date}}</b>
  </div>
</div>


</template>



<style scoped>

.image-cropper {
  width: 140px;
  height: 140px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  top: 5px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.garden-journals-container{
  display: inline-block;
  margin: 10px;
  height: 150px;
  width: 70%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */

}

</style>