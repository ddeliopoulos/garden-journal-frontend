<script lang="ts">
import {ref} from "vue";


interface AudioEntry {
  audio: string
}

export default {
  name: "AudioRecorder",
  emits: ["inputAudio"],


  setup( props : any, context : any) {

    const audioEntry = ref<AudioEntry>({
      audio: "",
    })

    const updateAudioFile = async (event : any) => {

      if(event.target.files.length === 0){
        return;
      }
      audioEntry.value = event.target.value;
      context.emit("inputAudio", audioEntry.value)

    }

      return { updateAudioFile, audioEntry }
    }

}
</script>

<template>
  <div class="audio-recorder">
    <h3><b>Upload Audio</b></h3>
    <input accept="audio/*" capture="recorder" type="file" @change="updateAudioFile"><br/>
    <audio id="player" controls></audio>
  </div>
</template>

<style scoped>

</style>