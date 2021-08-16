<script lang="ts">
import {onMounted,  ref, watchEffect} from 'vue';

interface ImageEntry {
  image: string
}

export default {
  name: "ImageUploader",
  emits: ["inputImage"],

   setup(props : any, context : any){

    const imageEntry = ref<ImageEntry>({
      image: ""
    })

    const updateImageFile = async (event : any) => {
      if(event.target.files.length === 0){
        return;
      }
      // this is what you want to emit and hold
      const imageFile = event.target.files[0]; // this holds the File object, which is just a reference to the file
      imageEntry.value = imageFile;

      let reader = new FileReader();
      reader.onload =  evt => {
        // this is what you want to upload to server
        const imageFileBytes = evt.target?.result; // do this when user clicks submit
      }
      reader.readAsText(imageFile, "UTF-8");

    }
    return {updateImageFile, imageEntry};
  }
}

</script>

<template>
  <div class="upload-image">
    <h3>Upload Image</h3>

    <input type="file"
           id="img" name="img"
           @change="updateImageFile"
           accept="image/png, image/jpeg"> <br/><br/>
  </div>

</template>

<style scoped>

</style>