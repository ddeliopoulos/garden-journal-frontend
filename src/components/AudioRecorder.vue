<script lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import AudioRecording from "@/components/AudioRecording.vue";
import {uploadJournalEntry, uploadMedia} from "@/components/shared/BackendApi.ts"

interface AudioEntry {
  createdAt: string
  data: File | null
  type: string
  mediaId: string
}

interface JournalEntry {
  id: string
}

interface PlantType {
  plantId: string
}

export default {
  name: "AudioRecorder",
  emits: ["closeAudioComponent", "showAudioComponent"],
  components: {AudioRecording},

  setup(props: any, context: any) {
    console.log("STARTING AudioRecorder.VUE")
    const route = useRoute()
    const id = parseInt(route.params.id as string);

    const titleOfAudio = ref("")

    const audioEntry = ref<AudioEntry>({
      createdAt: "",
      data: null,
      type: "audio",
      mediaId: ""
    })

    const journalId = ref<JournalEntry>({
      id: "",
    })

    const emitClose = async () => {
      context.emit("closeAudioComponent")
    }

    const emitShowAudioIcon = async () => {
      context.emit("showAudioComponent")
    }

    const updateCustomAudio = async (event: any) => {
      context.emit("updateCustomAudio", event)
    }

    const updateAudioFile = async (event: any) => {
      if (event.target.files.length === 0) {
        return;
      }

      audioEntry.value.data = event.target.files[0]
    }

    const postAudioJournal = async () => {
      console.log("Attempting to post an Audio Journal")
      const dataUploadResponse = await uploadMedia(audioEntry.value.data?.type!!, audioEntry.value.data);
      audioEntry.value.mediaId = await (dataUploadResponse.text());
      await uploadJournalEntry(id, journalId.value.id, audioEntry.value.type, audioEntry.value.mediaId)
      window.location.reload()
      console.log("Audio Successfully Posted")
    }

    function updateTitle(value: any) {
      titleOfAudio.value = value;
    }

    return {
      audioEntry,
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
      <button class="icon-close-btn" @click="emitShowAudioIcon">
        <i class="far fa-window-close"></i>
      </button>
    </div>
    <h3>Upload Audio</h3> <br/>
    <input id="inputA" accept="audio/*" type="file" @change="updateAudioFile"><br/><br/>
    <AudioRecording @updateCustomAudio="updateCustomAudio" @updateTitle="updateTitle"/>

  </div>
</template>

<style scoped>

.audio-recorder {
  width: 100%;
  margin-top: 5%;
  text-align: center;
  background: hsla(213, 24%, 93%, 1);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  display: inline-block;
  padding: 1em;
  line-height: 1.5em;
  border: dotted 5px black;
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