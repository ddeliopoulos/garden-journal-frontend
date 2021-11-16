<!--Cannot switch to TypeScript language because are using burger that is not compatible-->
<script>
import GardenJournalLogo from "@/components/GardenJournalLogo.vue";
import SearchBar from "@/components/SearchBar.vue"
import {logout} from "@/components/wrapped/gapi";

export default {
  name: "Header",
  components: {GardenJournalLogo, SearchBar},

  setup(){
// @ts-ignore
    return{logoutWithGoogle: () => {logout()}}
  }
}
</script>

<template>
  <div class="header">
    <div class="inner-header">
      <div class="garden-journal-logo">
        <GardenJournalLogo></GardenJournalLogo>
      </div>
      <div>
        <button class="logout-btn" @click="logoutWithGoogle" role="button">LOG OUT</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body{
  margin: 0;
}

/* CSS */
.logout-btn {
  opacity: 0.7;
  position: relative;
  top: 20px;
  left: 82em;
  align-items: center;
  background-color: #fff;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  cursor: pointer;
  display: inline-flex;
  fill: #000;
  font-family: Inter,sans-serif;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  justify-content: center;
  letter-spacing: -.8px;
  line-height: 24px;
  min-width: 140px;
  outline: 0;
  padding: 0 17px;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.logout-btn:focus {
  color: #171e29;
}

.logout-btn:hover {
  border-color: #06f;
  color: #06f;
  fill: #06f;
}

.logout-btn:active {
  border-color: #06f;
  color: #06f;
  fill: #06f;
}

@media (min-width: 768px) {
  .logout-btn {
    min-width: 170px;
  }
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