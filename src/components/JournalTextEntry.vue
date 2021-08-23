<template>
  <div class="text-component-container">
    <div class="close-image" @click=emitClose>
      <button @click="emitShowTextIcon" class="icon-close-btn">
        <i class="far fa-window-close"></i>
      </button>
    </div>
    <h3>Write Entry</h3>
    <div class="form-group shadow-textarea">
      <p id="three">
      <textarea @addToTimeline="addToTimeline" v-model='textEntry.text' name="styled-textarea" id="styled" rows="3" placeholder="Write something here..."></textarea>
      </p>
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
  props: ['textEntry'],

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
      console.log(plantId.value)
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
      console.log("i am in the child, omg this is so wrong")
    }


    return {emitClose, textEntry, emitShowTextIcon, addToTimeline, getJournalId}
  }
}
</script>

<style scoped >
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');

h3{
  text-align: center;
  position: relative;
  top: -1rem;
  margin: 13px;
}

.text-component-container {
  width: 100%;
  margin-top: 5%;
  text-align: center;
  background: hsla(213, 24%, 93%,1);
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

textarea#styled {
  font-size: 19px;
  font-family: 'Gochi Hand', cursive;
  width: 500px;
  height: 215px;
  border: 3px solid #cccccc;
  padding: 15px;
  background-position: bottom right;
  background-repeat: no-repeat;
  resize: vertical;
  max-height: 350px;
  min-height: 215px;
}

</style>