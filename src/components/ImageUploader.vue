<script lang="ts">
import { ref} from 'vue';
import {useRoute} from "vue-router";

interface ImageEntry {
  createdAt: string
  image: string
  type: string
}

interface JournalEntries {
  id: string
}

interface PlantType {
  plantId: string
}

export default {
  name: "ImageUploader",
  emits: ["closeImageComponent", "showImageComponent"],

   setup(props : any, context : any) {
     const route = useRoute()
     const id = parseInt(route.params.id as string);


     const imageEntry = ref<ImageEntry>({
       createdAt: "",
       image: "",
       type: "image"
     })

     const journalId = ref<JournalEntries>({
       id: "",
     })

     const plantId = ref<PlantType>({
       plantId: "",
     })

       const emitClose = async () => {
       context.emit("closeImageComponent")
     }

     const emitShowImageIcon = async () => {
       context.emit("showImageComponent")
     }

     const updateImageFile = async (event: any) => {
           if (event.target.files.length === 0) {
             return;
           }
           // this is what you want to emit and hold
           const imageFile = event.target.files[0]; // this holds the File object, which is just a reference to the file
           imageEntry.value = imageFile;

           let reader = new FileReader();
           reader.onload = evt => {
             // this is what you want to upload to server
             imageEntry.value.image = <string>evt.target?.result
           }
           reader.readAsText(imageFile, "UTF-8");
     }

     const postImageJournal = async () => {
       await fetch('/api/journal-entries', {
         method: 'POST',
         headers: {
           'Content-type': 'application/json',
         },
         body: JSON.stringify({
           id: journalId.value.id,
           plantId: id,
           createdAt: Date.now(),
           // type: imageEntry.value.type, // TODO: enable after backend is implemented
           type: 'image',
           data: imageEntry.value.image,
           dataUrl: 'https://cdn.dribbble.com/users/1810157/screenshots/14012338/image.png' // TODO: remove
         }),
       })
       console.log("Image Successfully Posted")

       imageEntry.value.image = ""

       context.emit( 'setTimeStampOnJournal' ,imageEntry.value.createdAt)
     }

     return {
       plantId,
       imageEntry,
       updateImageFile,
       postImageJournal,
       emitClose,
       emitShowImageIcon,
     }
   }
}

</script>

<template>
  <div class="upload-image">
      <div class="close-image" @click=emitClose>
        <button @click="emitShowImageIcon" class="icon-close-btn">
          <i class="far fa-window-close"></i>
        </button>
      </div>
    <h3>Upload Image</h3> <br/>
    <input type="file" id="img" name="img" @change="updateImageFile" accept="image/png, image/jpeg"> <br/><br/>
  </div>
</template>

<style scoped>

.upload-image {
  width: 100%;
  margin-top: 5%;
  text-align: center;
  background: hsla(213, 24%, 93%, 1);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  display: inline-block;
  padding: 1em;
  line-height: 1.5em;
  border: dotted 5px hsla(0, 95%, 35%, 1);
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 22px;
  float: right;
  cursor: pointer;
}

button.icon-close-btn{
  border: none;
  background-size: auto;
  background-color: white;
  box-shadow: none;
  float: right;
  position: relative;
  bottom: 13px;
  left: 6px;
}

#img{
  cursor: pointer;
  padding: 6px 12px;
  color: black;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
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