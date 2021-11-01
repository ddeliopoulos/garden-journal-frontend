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
      <div class="close-image" >
        <button @click="closeModal" class="icon-close-btn">
          <i class="far fa-window-close"></i>
        </button>
      </div>
      <div class="logo-container">
        <h3>GARDEN<span>JOURNAL</span></h3>
      </div>
      <button @emitShowAudioIcon="showAudio" class="journal-icon-audio">
        <img v-show="!showAudio" @click="showAudioComponent()" src="../assets/audio.svg" alt="audio-journal-entry"
             class="audio-journal" width="75" height="75">
      </button>

      <button @emitShowImageIcon="showImage" class="journal-icon-img">
        <img v-show="!showImage" @click="showImageComponent()" src="../assets/image.svg" alt="image-journal-entry"
             class="image-journal" width="75" height="75">
      </button>

      <button @emitShowTextIcon="showDocument" class="journal-icon-txt">
        <img v-show="!showDocument" @click="showDocumentComponent()" src="../assets/document.svg"
             alt="text-journal-entry" class="text-journal" width="75" height="75">
      </button>

      <div v-show="showAudio">
        <AudioRecorder ref="audioEntry" @closeAudioComponent="closeAudioComponent()" @updateCustomAudio="updateCustomAudio"/>
      </div>

      <div v-show="showImage">
        <ImageUploader ref="imageEntry" @closeImageComponent="closeImageComponent()"/>
      </div>

      <div v-show="showDocument">
        <JournalTextEntry ref="textEntry" @closeTextComponent="closeTextComponent()"/>
      </div>
      <br/>

      <button @click="onSubmitJournal" class="add-journal-entry-close" >
        Submit
      </button>
    </div>
  </Modal>

</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import AudioRecorder from "@/components/AudioRecorder.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import JournalTextEntry from "@/components/JournalTextEntry.vue"

export default defineComponent({

  components: {ImageUploader, AudioRecorder, JournalTextEntry},

  setup(props: any, context: any) {
    const showAudio = ref(false)
    const showImage = ref(false)
    const showDocument = ref(false)
    const isShow = ref(false)

    const textEntry = ref<any>({
      createdAt: "",
      text: "",
      type: "text"
    })

    const imageEntry = ref<any>({
      createdAt: "",
      image: "",
      type: "image"
    })

    const audioEntry = ref<any>({
      createdAt: "",
      audio: "",
      type: "audio"
    })

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

    function showModal() {
      isShow.value = true
    }

    function closeModal() {
      isShow.value = false
      showAudio.value = false
      showDocument.value = false
      showImage.value = false
    }

    const updateCustomAudio = async (event: any) => {
      context.emit("updateCustomAudio", event)
    }


    const onSubmitJournal = () => {
      if (showDocument.value) textEntry.value.postTextJournal()

      if(showImage.value) imageEntry.value.postImageJournal()

      if(showAudio.value) audioEntry.value.postAudioJournal()

      closeModal();
    }

    return {
      showAudio,
      isShow,
      showImage,
      showDocument,
      textEntry,
      imageEntry,
      audioEntry,
      updateCustomAudio,
      showModal,
      closeModal,
      showAudioComponent,
      closeTextComponent,
      closeImageComponent,
      closeAudioComponent,
      showDocumentComponent,
      showImageComponent,
      onSubmitJournal,
    }
  }
})
</script>

<style scoped>

.fa-window-close {
  color: #CC2E5D;
  font-size: 27px;
  float: right;
  cursor: pointer;
}

button.icon-close-btn {
  border: none;
  background-size: auto;
  background-color: white;
  box-shadow: none;
  float: left;
  position: relative;
  bottom: 1.5rem;
  right: 1.2rem;
}


.logo-container h3 {
  color: black;
  height: 100%;
  display: table-cell;
  vertical-align: middle;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 200;
  position: relative;
  left: 6.7rem;
}

.logo-container h3 span {
  font-weight: 800;
}


.add-journal-entry {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  background-image: linear-gradient(to right, #141e30, #243b55);
  border-radius: 8px;
  color: #FFF;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  top: 18px;
}

.add-journal-entry-close{
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 7px 25px;
  background-image: linear-gradient(to right, #141e30, #243b55);
  border-radius: 8px;
  color: #FFF;
  font-size: 22px;
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

button.journal-icon-audio {
  border: none;
  background-color: white;
  position: relative;
  right: 30px;
  cursor: pointer;

}

button.journal-icon-img {
  border: none;
  background-color: white;
  position: relative;

  cursor: pointer;

}

button.journal-icon-txt {
  border: none;
  background-color: white;
  position: relative;
  left: 30px;
  cursor: pointer;

}
</style>