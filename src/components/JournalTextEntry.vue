<template>
  <div class="text-component-container">
    <div class="close-image" @click=emitClose>
      <button @click="emitShowTextIcon" class="icon-close-btn">
        <i class="far fa-window-close"></i>
      </button>
    </div>
    <h3>Write Entry</h3>
    <div class="form-group shadow-textarea">
      <textarea v-model='textEntry.text' name="styled-textarea" id="styled" rows="3" placeholder="Write something here..."></textarea>
      <button @click="addToTimeline" class="add-journal-entry">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">

import {ref} from "vue";
import {useRoute} from "vue-router";

interface textEntry {
  createdAt: string
  text: string
  type: string
}

interface JournalEntries {
  id: string
}

interface PlantType {
  plantId: string
}

export default {
  name: "JournalTextEntry",
  emits: ["closeTextComponent", "emitShowTextIcon"],


  setup(props: any, context: any) {
    const route = useRoute()
    const id = parseInt(route.params.id as string);
    const textEntry = ref<textEntry>({
      createdAt: "",
      text: "",
      type: "text"
    })

    const journalId = ref<JournalEntries>({
      id: "",
    })

    const plantId = ref<PlantType>({
      plantId: "",
    })

    const getJournalId = async () => {
      const response = await fetch(`/api/plants/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })

      journalId.value = await response.json()

    }

    const emitClose = async (e: any) => {
      context.emit("closeTextComponent")
      console.log(plantId.value)

    }

    const emitShowTextIcon = async () => {
      context.emit("showTextComponent")
    }

    const addToTimeline = async () => {
      await fetch('/api/journal-entries', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: journalId.value.id,
          plantId: id,
          createdAt: Date.now(),
          type: textEntry.value.type,
          data: textEntry.value.text,
        }),
      })
      textEntry.value.text=""
    }

    return {emitClose, textEntry, emitShowTextIcon, addToTimeline, getJournalId}
  }
}
</script>

<style scoped>

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

.text-component-container {
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

button.icon-close-btn {
  border: none;
  background-size: auto;
  background-color: white;
  box-shadow: none;
  float: left;
  position: relative;
  right: -4px;
  top: 2px;
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