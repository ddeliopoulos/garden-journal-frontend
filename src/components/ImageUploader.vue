<script lang="ts">
import {onMounted, ref} from 'vue';

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
      imageEntry.value = event.target.value;
      context.emit("inputImage", imageEntry.value)



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