
<script lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";

interface Plant {
  id: number
}

interface JournalEntry {
  type: string
}

export default {
  props: {
    journalEntry: {
      type: Object as () => JournalEntry,
      required: true
    },
    plant: {
      type: Object as () => Plant,
      required: true
    }
  },

  setup(props : any){
    const plantId = props.plant.id
    const jEntries = ref<JournalEntry[]>([]);

    const filterTextEntries = async () => {
      const response = await fetch(`/api/journal-entries?plantId=${plantId}&_sort=createdAt&_order=desc&type=text`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      jEntries.value = await response.json();

      context.emit('filterText', jEntries.value)


    }

    return {filterTextEntries}
  }


}
</script>

<template>
  <h3>filter by: </h3>
<button> text</button>
</template>

<style scoped>

</style>