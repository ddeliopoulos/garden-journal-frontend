<!--Cannot switch to TypeScript language because are using burger that is not compatible-->
<script lang="ts">
import GardenJournalLogo from "@/components/GardenJournalLogo.vue";
import SearchBar from "@/components/SearchBar.vue"

export default {
  name: "Header",

  components: {
    GardenJournalLogo,
    SearchBar
  },
}
</script>

<template>
  <div class="header">
    <div class="inner-header">
      <div class="garden-journal-logo">
        <GardenJournalLogo></GardenJournalLogo>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  margin: 0;
}

.header{
  width: 100%;
  height: 80px;
  background-repeat: no-repeat;
  background-color: #E2E8F0;
  border-bottom:2px solid #CCC;
  padding-bottom:3px;
  z-index: 99;
  position: fixed;

}

.inner-header{
  width: 1602px;
  height: 100%;
  margin: 0 auto;
  z-index: 99;
}
</style>