<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {deleteJournalEntry, getBackendUrl, getMediaById} from "@/components/shared/BackendApi";
import {useRoute} from "vue-router";

interface JournalEntry {
  id: number
  plantId: string
  createdAt: string
  type: string
  mediaId: string
  data: string
}

export default defineComponent({  props: {
    journalEntry: {
      type: Object as () => JournalEntry,
      required: true
    }
  },

  setup(props: any) {
    const route = useRoute()
    const id = route.params.id
    const humanDate = ref(new Date(props.journalEntry.createdAt).toLocaleString())

    const journalEntry = ref<JournalEntry>({
      createdAt: props.journalEntry.createdAt,
      data: "",
      type: props.journalEntry.type,
      mediaId: props.journalEntry.mediaId,
      id: props.journalEntry.id,
      plantId: ""
    })

    const enlargeImg = ref(false)

    const enlargeImage = async () => {
      enlargeImg.value = !enlargeImg.value
    }

    const deleteJournal = async () => {
      await deleteJournalEntry(props.journalEntry.id);
    }

    const loadTextMedia = ref<any>("")

    const getTextMedia = async () => {
      const response = await getMediaById(journalEntry.value.mediaId)
      loadTextMedia.value = await response.text();
    };
    if (props.journalEntry.type === 'text/plain') getTextMedia();

    const updateCustomAudio = async (event: any) => {
      let link = document.createElement('audio');
      const blob = new Blob([props.journalEntry.data], {type: 'audio/mpeg'});
      link.src = URL.createObjectURL(blob);
      // document.getElementById('audio-controls')!!.onclick = () => link.play();
      // let blob = new Blob([event]);
      // const audioUrl = webkitURL.createObjectURL(blob)
      // console.log(audioUrl)
      // audioEntry.value.audioURL = audioUrl.substr(5, audioUrl.length )
      // console.log(audioEntry.value.audioURL)
    }

    //onMounted(loadTextMedia as any)
    onMounted(updateCustomAudio as any)

    return {
      deleteJournal,
      loadTextMedia,
      humanDate,
      enlargeImage,
      enlargeImg,
      getBackendUrl
    }
  }
})
</script>

<template>


  <div class="garden-journals-container">
    <div class="timestamp">
      <b>{{ humanDate }}</b> <br/>
    </div>

    <div v-if="journalEntry.type.startsWith('image')">
      <div class="delete-plant-icon" @click=deleteJournal()>
        <i class="far fa-trash-alt fa-lg"></i>
      </div>
      <div class="modal">

        <div class="image-cropper">
          <img :src="getBackendUrl() + '/media/' + journalEntry.mediaId" alt="journal-img"/>
        </div>
      </div>
    </div>

    <div v-else-if="journalEntry.type.startsWith('audio')">
      <div class="audio-container">
        <div class="delete-plant-icon" @click=deleteJournal()>
          <i class="far fa-trash-alt fa-lg"></i>
        </div>
        <h3 class="audio-title">AUDIO#: {{ journalEntry.id }}</h3>
        <audio id="audio-controls" controls>
          <input type="button" value="PLAY">
          <source
              :src="getBackendUrl() + '/media/' + journalEntry.mediaId"
              type="audio/mpeg">
        </audio>
      </div>
    </div>

    <div v-else-if="journalEntry.type.startsWith('text')">
      <div class="text-container">
        <div class="delete-plant-icon" @click=deleteJournal()>
          <i class="far fa-trash-alt fa-lg"></i>
        </div>
        <div class="text-entry"><br/>
          {{ loadTextMedia }}
        </div>
      </div>
    </div>

    <div v-else-if="journalEntry.type.startsWith('water')">
      <div class="delete-plant-icon" @click=deleteJournal()>
        <i class="far fa-trash-alt fa-lg"></i>
      </div>
      <div class="modal">
        <div class="plant-watered-text">
        Plant Watered.
        </div>
        <div class="image-cropper-watering">
          <img src="/watering-can-small.png"  alt=""/>
        </div>
      </div>
    </div>

    <div v-else>No supporto for this typo! {{ journalEntry.type }}</div>
  </div>

</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600&display=swap');

.plant-watered-text{
  top:50px;
  position: relative;
  right: 100px;
  font-size: 20px;
  font-family: 'Josefin Sans', sans-serif;

}

.delete-plant-icon {
  cursor: pointer;
  position: relative;
  top: 10px;
  right: 246px;
}

audio {
  background: linear-gradient(to top left, green, #013220, green);
  margin-top: 20px;
  margin-left: 20px;
}

audio:hover {
  -webkit-box-shadow: 0 0 9px 5px rgba(5, 4, 5, 1);
  -moz-box-shadow: 0 0 9px 5px rgba(5, 4, 5, 1);
  box-shadow: 0 0 4px 1px rgba(5, 4, 5, 1);
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  right: 235px;
  top: 10px;
}

body {
  background-color: #f9f9f9;
  font: normal 1em / 1.5em BlinkMacSystemFont, -apple-system, 'Segoe UI', roboto, helvetica, arial, sans-serif;
}

h1 {
  font-size: 1.5em;
  color: #555;
  text-align: center;
}

h3.audio-title {
  position: relative;
}

audio {
  display: block;
  margin: auto;
}

.text-entry {
  float: left;
  display: inline-block;
  margin: 10px 25px 25px;
  line-height: 1em;
  position: relative;
  top: -5px;
  color: darkblue;
  font-family: 'Josefin Sans', sans-serif;

}

.timestamp {
  float: right;
  position: relative;
  left: -10px;
  top: 10px;
  color: #181A18;
}

.image-cropper {
  width: 150px;
  height: 150px;
  position: relative;
  bottom: 17px;
  overflow: hidden;
  margin: auto;
  border-radius: 20px;
}

.image-cropper-watering{
  width: 120px;
  height: 120px;
  position: relative;
  bottom: 20px;
  overflow: hidden;
  margin: auto;
  border-radius: 20px;
  left: 70px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.garden-journals-container {
  display: inline-block;
  margin: 10px;
  height: 160px;
  width: 55%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  position: relative;
  left: 20px;
  bottom: 20px;
}

</style>