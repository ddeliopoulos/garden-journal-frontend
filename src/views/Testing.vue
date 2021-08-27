<template>
  <AudioRecording></AudioRecording>
</template>

<script>
import AudioRecording from "@/components/AudioRecording.vue"

export default {
  name: "Testing",
  components: {AudioRecording}

}
</script>

<style scoped>

* {
  position: relative;
  top: 3em;
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  background-color: #E2E8F0
}

.filter-txt{
  margin: 40px;
}


</style>