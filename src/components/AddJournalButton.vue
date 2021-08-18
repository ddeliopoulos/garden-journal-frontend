<template>
  <p>
    <button class="add-journal-entry" @click="showModal">
      Add Journal Entry
    </button>
  </p>
  <!-- If the option changed modal component the name
  <MyModal>
  -->
  <Modal v-model="isShow" :close="closeModal">

    <div class="modal">

      <button @emitShowAudioIcon="showAudio" class="journal-icon-audio">
        <img v-show="!showAudio"  @click="showAudioComponent()" src="../assets/audio.svg"  alt="audio-journal-entry" class="audio-journal" width="75" height="75">
      </button>

      <button @emitShowImageIcon="showImage" class="journal-icon-img">
        <img v-show="!showImage" @click="showImageComponent()" src="../assets/image.svg" alt="image-journal-entry" class="image-journal" width="75" height="75">
      </button>

      <button @emitShowTextIcon="showDocument" class="journal-icon-txt">
        <img v-show="!showDocument" @click="showDocumentComponent()" src="../assets/document.svg" alt="text-journal-entry" class="text-journal" width="75" height="75">
      </button>

        <div v-show="showAudio"  >
          <AudioRecorder @closeAudioComponent="closeAudioComponent()"/>
        </div>

        <div v-show="showImage"  >
          <ImageUploader @closeImageComponent="closeImageComponent()"/>
        </div>

        <div v-show="showDocument">
        <JournalTextEntry @closeTextComponent="closeTextComponent()"/>
        </div>

      <br/>

      <button class="add-journal-entry" @click="closeModal">
        close
      </button>

    </div>
  </Modal>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AudioRecorder from "@/components/AudioRecorder.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import JournalTextEntry from "@/components/JournalTextEntry.vue"

export default defineComponent({
  components: {ImageUploader, AudioRecorder, JournalTextEntry},
  setup () {

    const showAudio = ref(false)
    const showImage = ref(false)
    const showDocument = ref(false)
    const isShow = ref(false)

    const showDocumentComponent = async () => {
      showDocument.value = true
    }
    const showImageComponent = async () => {
      showImage.value = true
    }
    const showAudioComponent = async () => {
      showAudio.value = true
    }

    const closeImageComponent = async () => {
      showImage.value = false
    }
    const closeTextComponent = async () => {
      showDocument.value = false

    }
    const closeAudioComponent = async () => {
      showAudio.value = false
    }


    function showModal () {
      isShow.value = true
    }

    function closeModal () {
      isShow.value = false
      showAudio.value = false
      showDocument.value = false
      showImage.value = false
    }

    return {
      showAudio,
      isShow,
      showImage,
      showDocument,
      showModal,
      closeModal,
      showAudioComponent,
      closeTextComponent,
      closeImageComponent,
      closeAudioComponent,
      showDocumentComponent,
      showImageComponent
    }
  }
})
</script>

<style scoped>

.add-journal-entry {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #CC2E5D, #FF5858);
  border-radius: 8px;
  color: #FFF;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
}

.modal {
  width: 600px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 20px;
  text-align: center;
}
button.journal-icon-audio{
  border: none;
  background-color: white;
  position: relative;
  right: 50px;
  cursor: pointer;

}
button.journal-icon-img{
  border: none;
  background-color: white;
  position: relative;

  cursor: pointer;

}
button.journal-icon-txt{
  border: none;
  background-color: white;
  position: relative;
  left: 50px;
  cursor: pointer;

}
</style>