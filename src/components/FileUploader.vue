<template>
<div class="upload-image">
  <input type="file"
         id="avatar" name="avatar"
         @change="updateFile"
         accept="image/png, image/jpeg"> <br/>
  <button @click="addImageToJournalEntry()" class="add-image-button">Submit Image</button>
</div>
</template>

<script lang="ts">
import {ref} from 'vue';

export default {
  name: "FileUploader",

  setup(){
    const image = ref<File>(new File());

    const updateFile = (event: any) => {
      image.value = event.target.files[0];
    };

    const addImageToJournalEntry = () => {
      // read image
      // send data to backend
    };

    return {updateFile};
  }


}
</script>

<style scoped>
.add-image-button{
  position: relative;
  top: 15px;
}

</style>