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
  </div>
</template>

<style scoped>

.audio-recorder {
  width: 100%;
  margin-top: 5%;
  text-align: center;
  background: hsla(213, 24%, 93%,1);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  display: inline-block;
  padding: 1em;
  line-height: 1.5em;
  border: dotted 5px hsla(0, 95%, 35%, 1)
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 22px;
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
  float: right;
  position: relative;
  bottom: 13px;
  left: 6px;
}

</style>