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
  <div class="timestamp">
    <b>{{humanDate.date}}</b> <br/>
  </div>
  <div v-if="journalEntry.type.startsWith('image')">
    <div class="image-cropper">
      <img alt="test" :src="journalEntry.dataUrl"/>
    </div>
    </div>
    <div v-else-if="journalEntry.type.startsWith('audio')">
      <div class="audio-container">
        <h3 class="audio-title">Audio Journal Update: {{journalEntry.id}}</h3>
        <audio controls>
          <source :src="journalEntry.dataUrl" type="audio/mpeg">
        </audio>
      </div>
    </div>
  <div v-else-if="journalEntry.type.startsWith('text')">
    <div class="text-container">
      <div class="text-entry"> <br/>
        {{journalEntry.data}}
      </div>
    </div>
  </div>
  <div v-else>No supporto for this typo! {{journalEntry.type}}</div>
</div>

</template>



<style scoped>

body {
  background-color: #f9f9f9;
  font: normal 1em / 1.5em BlinkMacSystemFont, -apple-system, 'Segoe UI', roboto, helvetica, arial, sans-serif;
}

h1 {
  font-size: 1.5em;
  color: #555;
  text-align: center;
}

h3.audio-title{
  position: relative;
  left: 80px;
}

audio {
  display:block;
  margin: auto;
}

.audio-container{
  position: relative;
  top: 35px;
}

.text-entry{
  float: left;
  text-align: left;
  display: inline-block;
  padding: .5em;
  line-height: 1.5em;
  position: relative;
  top: -17px;
  /*padding: 7px;*/
}

.timestamp{
  float: right;
  position: relative;
  left: -10px;
  top: 10px;
}

.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  margin: auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.garden-journals-container{
  display: inline-block;
  margin: 10px;
  height: 160px;
  width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
}

</style>