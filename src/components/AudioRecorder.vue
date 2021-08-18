<script lang="ts">
import {ref} from "vue";


interface AudioEntry {
  audio: string
}

export default {
  name: "AudioRecorder",
  emits: ["inputAudio", "closeAudioComponent", "emitShowAudioIcon"],


  setup( props : any, context : any) {

    const audioEntry = ref<AudioEntry>({
      audio: "",
    })

    const emitClose = async (e : any) => {
      context.emit("closeAudioComponent")
    }

    const emitShowAudioIcon = async () => {
      context.emit("showAudioComponent")
    }

    const updateAudioFile = async (event : any) => {

      if(event.target.files.length === 0){
        return;
      }
      audioEntry.value = event.target.value;
      context.emit("inputAudio", audioEntry.value)
    }
      return { updateAudioFile, audioEntry, emitClose, emitShowAudioIcon }
    }
}

</script>

<template>
  <div class="audio-recorder">
    <div class="close-audio" @click=emitClose>
      <button @click="emitShowAudioIcon" class="icon-close-btn">
        <i class="far fa-window-close"></i>
      </button>
    </div>
    <h3>Upload Audio</h3>
    <input accept="audio/*" capture="recorder" type="file" @change="updateAudioFile"><br/>
  </div>
</template>

<style scoped>

.audio-recorder{
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: center;
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 27px;
  float: right;
  cursor: pointer;
}

button.icon-close-btn{
  border: none;
  background-size: auto;
  background-color:white ;
  box-shadow: none;
}

</style>