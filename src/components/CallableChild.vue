<script lang="ts">
import {ref} from "vue";

export default {
  name: "CallableChild",
  setup() {
    const text = ref<string>('');

    const beCalled = (newText: string) => {
      text.value = newText
    };

    return {
      text,
      beCalled
    }
  }
}
</script>

<template>
  <div>{{ text }}</div>
</template>

<style scoped>

</style>