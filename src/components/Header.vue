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
      </div><br/>
        <SearchBar></SearchBar>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  margin: 0;
}

.header{
  background-position: center top;
  height: 15%;
  display: block;
  width: 100%;
  background-repeat: no-repeat;
  background-color: black;
  top:0;
  position: fixed;
}

.inner-header{
  width: 1602px;
  height: 100%;
  display: block;
  margin: 0 auto;

}
</style>