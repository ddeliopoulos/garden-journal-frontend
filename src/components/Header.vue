<template>
  <div class="header">
    <div class="inner-header">
      <div class="slide-dashboard">
        <Slide>
          <router-link to="/"><span>Home</span></router-link>
          <router-link to="/privacy"><span>Privacy</span></router-link>
          <router-link to="/about"><span>About</span></router-link>
        </Slide>
      </div>
      <div class="garden-journal-logo">
        <GardenJournalLogo></GardenJournalLogo>
      </div><br/>
      <div class="search-bar">
        <SearchBar></SearchBar>
      </div>
    </div>
  </div>
</template>

<script>
import { Slide } from 'vue3-burger-menu';
import AddPlantButton from "@/components/AddPlantButton.vue";
import GardenJournalLogo from "@/components/GardenJournalLogo.vue";
import SearchBar from "@/components/SearchBar.vue"

export default {
  name: "Header",

  components: {
    GardenJournalLogo,
    Slide,
    AddPlantButton,
    SearchBar,
  },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  margin: 0;
}

.header{
  width: 100%;
  height: 100px;
  display: block;
  background-color: black;
}

.inner-header{
  width: 1602px;
  height: 100%;
  display: block;
  margin: 0 auto;

}
</style>