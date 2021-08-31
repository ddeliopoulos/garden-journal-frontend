<script lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import AudioRecording from "@/components/AudioRecording.vue";

interface AudioEntry {
  createdAt: string
  audioData: string
  type: string
  audioURL: string
}

interface JournalEntry {
  id: string
}

interface PlantType {
  plantId: string
}

export default {
  name: "AudioRecorder",
  emits: [ "closeAudioComponent", "showAudioComponent"],
  components: {AudioRecording},

  setup(props: any, context: any) {
    const route = useRoute()
    const id = parseInt(route.params.id as string);

    const titleOfAudio = ref("")


    const audioEntry = ref<AudioEntry>({
      createdAt: "",
      audioData: "",
      type: "audio",
      audioURL: ""
    })

    const journalId = ref<JournalEntry>({
      id: "",
    })

    const plantId = ref<PlantType>({
      plantId: "",
    })

    const emitClose = async () => {
      context.emit("closeAudioComponent")
    }

    const emitShowAudioIcon = async () => {
      context.emit("showAudioComponent")
    }

    const updateCustomAudio = async (event: any) => {
      console.log(typeof event)
      audioEntry.value.audioData = event
      console.log(typeof audioEntry.value.audioData)

      let blob = new Blob([event]);
      const audioUrl = webkitURL.createObjectURL(blob)
      console.log(audioUrl)
      audioEntry.value.audioURL = audioUrl.substr(5, audioUrl.length )
      console.log(audioEntry.value.audioURL)

    }

    const updateAudioFile = async (event: any) => {
      if (event.target.files.length === 0) {
         return;
      }
      const audioFile = event.target.files[0]
      audioEntry.value = audioFile

      let reader = new FileReader();
      reader.onload = evt => {
        // this is what you want to upload to server
        audioEntry.value.audioData = <string>evt.target?.result
      }
      reader.readAsText(audioFile, "UTF-8");
    }


    const postAudioJournal = async () => {
      await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: journalId.value.id,
          plantId: id,
          createdAt: Date.now(),
          type: audioEntry.value.type,
          data: audioEntry.value.audioData,
          dataUrl: audioEntry.value.audioURL
        }),
      })
      audioEntry.value.audioData = ""
      console.log("Audio Successfully Posted")

    }

    function updateTitle (value : any)  {
      titleOfAudio.value = value;
    }

    return {
      audioEntry,
      plantId,
      titleOfAudio,
      updateCustomAudio,
      updateAudioFile,
      postAudioJournal,
      emitClose,
      emitShowAudioIcon,
      updateTitle
    }
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
    <AudioRecording @updateTitle="updateTitle" @updateCustomAudio="updateCustomAudio" />

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