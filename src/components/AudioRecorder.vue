<script lang="ts">
import {ref} from "vue";


interface AudioEntry {
  audio: string
}

export default {
  name: "AudioRecorder",
  emits: ["inputAudio", "closeAudioComponent", "emitShowAudioIcon"],


  setup(props: any, context: any) {

    const audioEntry = ref<AudioEntry>({
      audio: "",
    })

    const emitClose = async (e: any) => {
      context.emit("closeAudioComponent")
    }

    const emitShowAudioIcon = async () => {
      context.emit("showAudioComponent")
    }

    const updateAudioFile = async (event: any) => {

      if (event.target.files.length === 0) {
        return;
      }
      audioEntry.value = event.target.value;
      context.emit("inputAudio", audioEntry.value)
    }
    return {updateAudioFile, audioEntry, emitClose, emitShowAudioIcon}
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
    <h3>Upload Audio</h3> <br/>
    <input id="inputA" accept="audio/*" type="file" @change="updateAudioFile"><br/><br/>
    <button class="add-journal-entry">Submit</button>
  </div>
</template>

<style scoped>

.audio-recorder {
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

#inputA {
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  color: black;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  bottom: 5px;
}

button.icon-close-btn {
  border: none;
  background-size: auto;
  background-color: white;
  box-shadow: none;
  float: left;
  position: relative;
  right: -4px;
  top: 2px;
}

.add-journal-entry {
  appearance: none;
  outline: none;
  border: 3px black;
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  background-image: linear-gradient(to right, #141e30, #243b55);
  border-radius: 8px;
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  bottom: 5px;
}
</style>