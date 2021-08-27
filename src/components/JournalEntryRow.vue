<script lang="ts">
import {onUnmounted, ref} from "vue";

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

    const enlargeImg = ref(false)

    const enlargeImage = async () => {
      enlargeImg.value = !enlargeImg.value
    }



    const setTimeStamp = async ()  => {
      const date = new Date()
      date.setTime(Date.now())
      humanDate.value.date = date.toLocaleString();
    }


    return {setTimeStamp, humanDate, enlargeImage, enlargeImg }
  }
}
</script>

<template>



<div class="garden-journals-container">
  <div class="timestamp">
    <b>{{humanDate.date}}</b> <br/>
  </div>

  <div v-if="journalEntry.type.startsWith('image')">
    <div class="modal">
      <label class="modal__label" for="modal__checkbox">

        <div class="image-cropper">
          <img alt="test" :src="journalEntry.dataUrl"/>
        </div>

      </label>
      <input class="modal__checkbox" id="modal__checkbox" type="checkbox">
      <div class="modal__window">
        <div class="modal__content">
          <label class="modal__close-icon" for="modal__checkbox">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
          </svg>
          </label>
          <input class="modal__checkbox" id="modal__checkbox" type="checkbox">
          <img :src="journalEntry.dataUrl"/>
        </div>
      </div>
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



<style scoped lang="scss">


.modal {
  position: relative;
  left: 270px;
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 1rem;
  transition: 1s;
  background-color: green;

&__checkbox {
   display: none;

&:checked ~ div {
   visibility: visible;
   opacity: 1;
 }
}

&__label {
   text-decoration: underline;
   cursor: pointer;
 }

&__window {
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   visibility: hidden;
   opacity: 0;
   transition: .2s;
  z-index: 9998;
 }

&__content {
   max-width: 576px;
   background: white;
   position: absolute;
   transform: translate(-50%, -50%);
   top: 50%;
   left: 50%;
   padding: 2rem;
   border-radius: 1rem;
  z-index: 9999;
 }

&__close-icon {
   cursor: pointer;
   width: 1.5rem;
   margin: 0 0.5rem;
   position: absolute;
   right: 0;
   top: 0;
   color: #657ced;
 }
}

/*abovie us asda*/

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
  margin: 10px 25px 25px;
  line-height: 1em;
  position: relative;
  top: -5px;
  color: black;
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
  width: 55%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  position: relative;
  left: 20px;
}

</style>