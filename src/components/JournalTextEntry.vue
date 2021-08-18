<template>
  <div class="text-component-container">
  <div class="close-image" @click=emitClose>
    <button @click="emitShowTextIcon" class="icon-close-btn">
    <i class="far fa-window-close"></i>
    </button>
  </div>
  <h3>Write Entry</h3>
  <div class="form-group shadow-textarea">
    <textarea name="styled-textarea" id="styled" rows="3"
              placeholder="Write something here...">
    </textarea>
  </div>
  </div>
</template>

<script lang="ts">

import {ref} from "vue";

interface textEntry {
  text: string
}

export default {
  name: "JournalTextEntry",
  emits: ["closeTextComponent", "emitShowTextIcon"],


  setup(props : any, context : any){

    const textEntry = ref<textEntry>({
      text: ""
    })

    const emitClose = async (e : any) =>{
      context.emit("closeTextComponent")
    }

    const emitShowTextIcon = async () => {
      context.emit("showTextComponent")
    }

    return {emitClose, textEntry, emitShowTextIcon }
  }
}
</script>

<style scoped>

.text-component-container{
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.fa-window-close {
  color: #CC2E5D;
  font-size: 27px;
  float: right;
  cursor: pointer;
}

button.icon-close-btn{
  border: none;
  background-size: auto;
  background-color:white ;
  box-shadow: none;
}

textarea#styled {
  width: 500px;
  height: 120px;
  border: 3px solid #cccccc;
  padding: 15px;
  font-family: Tahoma, sans-serif;
  background-position: bottom right;
  background-repeat: no-repeat;

}

</style>